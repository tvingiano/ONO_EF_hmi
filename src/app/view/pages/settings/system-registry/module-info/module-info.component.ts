import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModuleInfo} from '../../../../../model/system/ModuleInfo';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map, switchMap} from 'rxjs/operators';
import {RackInfo} from '../../../../../model/system/RackInfo';
import {SystemComponent} from '../../../../../model/system/system-component.enum';
import { MatDialog } from '@angular/material/dialog';
import {RackEditDialogComponent} from 'src/app/view/components/system/racks/rack-edit-dialog/rack-edit-dialog.component';

enum PAGE_STATES {
    EDIT = 0,
    VIEW = 1,
    PUBLISH = 2
}

@Component({
    selector: 'app-module-info',
    templateUrl: './module-info.component.html',
    styles: [`

    `]
})
export class ModuleInfoComponent implements OnInit {
    states = PAGE_STATES;
    state = PAGE_STATES.VIEW;
    dirty = false;

    moduleInfo: ModuleInfo;
    racksInfoList: RackInfo[];
    moduleFormGroup: FormGroup;

    constructor(
        private activatedRoute: ActivatedRoute,
        private ono: OnoApiService,
        private utils: UtilsService,
        private formBuilder: FormBuilder,
        private router: Router,
        private dialog: MatDialog
    ) {

    }

    ngOnInit() {
        this.utils.showLoader();
        const {snapshot: {queryParams: {system, module}}} = this.activatedRoute;

        this.ono.getSystemComponentInfo([system, SystemComponent.MODULES, module]).pipe(
            switchMap((value: ModuleInfo) => {
                this.moduleInfo = value;
                return this.ono.getSystemComponentList([system, module, SystemComponent.RACKS]);
            }),
            map((value: RackInfo[]) => {
                return value ? value : [];
            })
        ).subscribe(
            value => {
                this.racksInfoList = value;
                this.onDataReady();
                this.utils.hideLoader();
            },
            error => {
                this.utils.hideLoader();
            }
        );
    }

    updateModuleRacks() {
        this.racksInfoList = null;
        this.ono
            .getSystemComponentList(
                [this.moduleInfo.System, this.moduleInfo.Modulename, SystemComponent.RACKS]
            )
            .subscribe((value: RackInfo[]) => {
                this.racksInfoList = value || [];
            });
    }

    onDataReady() {
        this.initFormGroup();
    }

    initFormGroup() {
        if (!this.moduleInfo) {
            return;
        }

        this.moduleFormGroup = this.formBuilder.group(
            {
                System: [this.moduleInfo.System, Validators.required],
                Modulename: [this.moduleInfo.Modulename, Validators.required],
                RackNumber: [this.moduleInfo.RackNumber, Validators.required],
                LightSlotsNumber: [this.moduleInfo.LightSlotsNumber, Validators.required],
                GrowthSlotsNumber: [this.moduleInfo.GrowthSlotsNumber, Validators.required],
                SolutionCapacity: [this.moduleInfo.SolutionCapacity, Validators.required],
                Owner: [this.moduleInfo.Owner, Validators.required],
                Description: [this.moduleInfo.Description, Validators.required],
                Note: [this.moduleInfo.Note],
                Tag: [this.moduleInfo.Tag],
                Timestamp: [this.moduleInfo.Timestamp],
            }
        );

        this.moduleFormGroup.valueChanges.subscribe(value => {
            this.dirty = !this.utils.isEqual(this.moduleInfo, this.moduleFormGroup.getRawValue());
        });
    }

    onEditHandler() {
        this.state = PAGE_STATES.EDIT;
    }

    onCancelHandler() {
        this.state = PAGE_STATES.VIEW;
    }

    onSaveHandler() {
        if (this.dirty) {
            this.utils.showLoader();

            this.ono.putSystemComponentInfo(
                [this.moduleInfo.System, SystemComponent.MODULES, this.moduleInfo.Modulename],
                this.utils.getDirtyValues(this.moduleFormGroup)
            )
                .subscribe(value => {
                    this.state = PAGE_STATES.VIEW;
                    this.utils.hideLoader();
                }, error => {
                    this.utils.hideLoader();
                    this.state = PAGE_STATES.VIEW;
                });
        }
    }

    rackViewHandler(rackInfo: RackInfo) {
        this.router.navigate(['settings', 'system', 'rack', rackInfo.Rackname]);
        this.router.navigate(
            ['settings', 'system', 'rack'],
            {
                queryParams: {
                    system: this.moduleInfo.System,
                    module: this.moduleInfo.Modulename,
                    rackName: rackInfo.Rackname
                }
            }
        );
    }

    rackCreateHandler() {
        const dialogParams = {
            rackInfo: Object.assign(
                new RackInfo(), {Module: this.moduleInfo.Modulename, System: this.moduleInfo.System}
            ),
            title: 'Create Rack'
        };

        this.dialog
            .open(
                RackEditDialogComponent,
                {
                    data: dialogParams
                }
            ).afterClosed().subscribe(
            (formGroup: FormGroup) => {
                if (formGroup && formGroup.valid) {
                    this.utils.showLoader();
                    this.ono.rackPost(formGroup.getRawValue()).subscribe((response) => {
                        this.utils.hideLoader();
                        this.updateModuleRacks();
                    });
                }
            }
        );
    }

    rackEditHandler(rackInfo: RackInfo) {
        const dialogParams = {
            rackInfo,
            title: 'Create Rack'
        };

        this.dialog
            .open(
                RackEditDialogComponent,
                {
                    data: dialogParams
                }
            ).afterClosed().subscribe(
            (formGroup: FormGroup) => {
                this.ono.putSystemComponentInfo<RackInfo>(
                    [rackInfo.System, rackInfo.Module, SystemComponent.RACKS, rackInfo.Rackname],
                    this.utils.getDirtyValues(formGroup)
                ).subscribe(_ => this.updateModuleRacks());
            });
    }

    rackDeleteHandler(rackInfo: RackInfo) {
        this.ono.rackDelete(rackInfo.Rackname).subscribe(() => {
            this.updateModuleRacks();
        });
    }
}
