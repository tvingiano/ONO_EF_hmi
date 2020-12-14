import {Component, OnInit} from '@angular/core';
import {OnoApiService} from '../../../../service/ono-api.service';
import { MatDialog } from '@angular/material/dialog';
import {UtilsService} from '../../../../service/helper/utils.service';
import {SystemEditDialogComponent} from './system-edit-dialog/system-edit-dialog.component';
import {ISystemRegistry} from '../../../../model/interface/ISystemRegistry';
import {FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ModuleInfo} from '../../../../model/system/ModuleInfo';

class SystemRegistryInfo implements ISystemRegistry {
    AccountHolder = '';
    CommunicationProtocols: any;
    HardwareVersion: any = '';
    InstallationDate = '';
    Place = '';
    PlcVersion: any = '';
    ProductionDate = '';
    SoftwareVersion: any = '';
    SystemName = '';
}

@Component({
    selector: 'app-system-registry',
    templateUrl: './system-registry.component.html',
    styleUrls: ['./system-registry.component.scss']
})
export class SystemRegistryComponent implements OnInit {

    private systemsList: ISystemRegistry[];

    constructor(
        private ono: OnoApiService,
        private dialog: MatDialog,
        private utils: UtilsService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.utils.showLoader();

        this.ono.systemRegistryListGet().subscribe((list: ISystemRegistry[]) => {
            this.systemsList = list;
            this.utils.hideLoader();
        }, error => {
            this.utils.hideLoader();
        });
    }

    onCreateClick() {
        this.openCreateDialog();
    }

    onEditClick(value: ISystemRegistry) {
        this.openEditDialog(value);
    }

    onDeleteClick(value: ISystemRegistry) {
        this.utils.showLoader();
        this.ono.systemRegistryDelete(value.SystemName).pipe(
            switchMap(() => this.ono.systemRegistryListGet())
        ).subscribe((response: ISystemRegistry[]) => {
            this.systemsList = response;
            this.utils.hideLoader();
        });
    }

    openEditDialog(value: ISystemRegistry) {
        this.dialog.open(
            SystemEditDialogComponent,
            {
                data: {
                    value: {
                        ...value
                    },
                    title: 'Edit system',
                    isEditState: true
                }
            }
        ).afterClosed().subscribe(
            (result: FormGroup) => {
                if (result && result.valid) {
                    this.utils.showLoader();

                    const dirtyValues = this.utils.getDirtyValues(result);
                    const {SystemName} = value;

                    this.ono
                        .systemRegistryPut(SystemName, dirtyValues)
                        .pipe(
                            switchMap(() => {
                                return this.ono.systemRegistryListGet();
                            })
                        )
                        .subscribe((response: ISystemRegistry[]) => {
                            this.systemsList = response;
                            this.utils.hideLoader();
                        });
                }
            }
        );
    }

    openCreateDialog() {
        this.dialog
            .open(SystemEditDialogComponent,
                {
                    data: {
                        value: new SystemRegistryInfo(),
                        title: 'Create system'
                    }
                }
            ).afterClosed().subscribe(
            (result: FormGroup) => {
                if (result) {
                    this.utils.showLoader();

                    this.ono.systemRegistryPost(result.value)
                        .pipe(
                            switchMap(() => this.ono.systemRegistryListGet())
                        )
                        .subscribe((response: ISystemRegistry[]) => {
                            this.systemsList = response;
                            this.utils.hideLoader();
                        });
                }
            });
    }

    onModuleClick(moduleInfo: ModuleInfo) {
        this.router.navigate(['settings', 'system', 'module', moduleInfo.Modulename]);
    }
}
