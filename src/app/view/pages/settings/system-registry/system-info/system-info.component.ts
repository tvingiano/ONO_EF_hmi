import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OnoApiService} from 'src/app/service/ono-api.service';
import {SystemComponent} from '../../../../../model/system/system-component.enum';
import {ModuleInfo} from '../../../../../model/system/ModuleInfo';
import {ISystemRegistry} from '../../../../../model/interface/ISystemRegistry';
import {UtilsService} from '../../../../../service/helper/utils.service';
import { MatDialog } from '@angular/material/dialog';
import {ModuleEditDialogComponent} from '../../../../components/system/modules/module-edit-dialog/module-edit-dialog.component';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-system-info',
    templateUrl: './system-info.component.html',
    styleUrls: ['./system-info.component.scss']
})
export class SystemInfoComponent implements OnInit {
    /* component params */
    @Input() systemInfo: ISystemRegistry;

    /* component events  */
    @Output() editClick: EventEmitter<ISystemRegistry> = new EventEmitter<ISystemRegistry>();
    @Output() deleteClick: EventEmitter<ISystemRegistry> = new EventEmitter<ISystemRegistry>();

    modulesList: ModuleInfo[];

    constructor(
        private onoApiService: OnoApiService,
        private utilsService: UtilsService,
        private matDialog: MatDialog,
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.getSystemModulesList();
    }

    getSystemModulesList() {
        this.onoApiService
            .getSystemComponentList([this.systemInfo.SystemName, SystemComponent.MODULES])
            .subscribe((value: ModuleInfo[]) => {
                this.modulesList = value || [];
            });
    }

    onEditClick(value: ISystemRegistry) {
        this.editClick.emit(value);
    }

    onDeleteClick(value: ISystemRegistry) {
        this.deleteClick.emit(value);
    }

    moduleViewHandler(value: ModuleInfo) {
        this.router.navigate(
            ['settings', 'system', 'module'],
            {
                queryParams: {
                    system: this.systemInfo.SystemName,
                    module: value.Modulename
                }
            }
        );
    }

    /* on module create click */
    moduleCreateHandler() {
        const matDialogData = {
            moduleInfo: new ModuleInfo(),
            systems: [this.systemInfo.SystemName],
            title: 'Create module'
        };

        this.matDialog
            .open(ModuleEditDialogComponent, {data: matDialogData})
            .afterClosed().subscribe(
            (formGroup: FormGroup) => {
                if (formGroup && formGroup.valid) {
                    this.modulesList = null;
                    this.onoApiService.modulePost(formGroup.getRawValue())
                        .subscribe(
                            _ => {
                                this.getSystemModulesList();
                            },
                            error => {
                                console.error(error);
                            }
                        );
                }
            }
        );
    }

    /* on module edit click */
    moduleEditHandler(value: ModuleInfo) {
        const matDialogData = {
            moduleInfo: value,
            systems: [value.System],
            title: 'Edit module'
        };

        this.matDialog
            .open(ModuleEditDialogComponent, {data: matDialogData})
            .afterClosed().subscribe(
            (formGroup: FormGroup) => {
                if (formGroup && formGroup.valid) {
                    this.modulesList = null;
                    this.onoApiService.putSystemComponentInfo(
                        [this.systemInfo.SystemName, SystemComponent.MODULES, value.Modulename],
                        this.utilsService.getDirtyValues(formGroup)
                    ).subscribe(
                        _ => {
                            this.getSystemModulesList();
                        },
                        error => {
                            console.error(error);
                        }
                    );
                }
            }
        );
    }

    /* on module delete click */
    moduleDeleteHandler(value: ModuleInfo) {
        this.modulesList = null;
        this.onoApiService
            .moduleDelete(value.Modulename)
            .subscribe(
                _ => {
                    this.getSystemModulesList();
                },
                error => {
                    console.error(error);
                }
            );
    }

}
