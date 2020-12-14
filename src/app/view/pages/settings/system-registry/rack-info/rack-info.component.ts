import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RackInfo} from '../../../../../model/system/RackInfo';
import {SlotInfo} from '../../../../../model/system/SlotInfo';
import {SystemComponent} from '../../../../../model/system/system-component.enum';
import {FormPageComponent} from '../../../../components/shared/form-page/form-page.component';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {PageState} from '../../../../../model/page-state.enum';
import { MatDialog } from '@angular/material/dialog';
import {SlotEditDialogComponent} from '../../../../components/system/slots/slot-edit-dialog/slot-edit-dialog.component';

@Component({
    selector: 'app-rack-info',
    templateUrl: './rack-info.component.html',
    styles: []
})
export class RackInfoComponent extends FormPageComponent implements OnInit {

    rackInfo: RackInfo;
    slotInfos: SlotInfo[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private utilsService: UtilsService,
        private onoApiService: OnoApiService,
        private formBuilder: FormBuilder,
        private router: Router,
        private dialog: MatDialog
    ) {
        super();
    }

    ngOnInit() {
        this.utilsService.showLoader();
        const {snapshot: {queryParams: {system, module, rackName}}} = this.activatedRoute;

        this.onoApiService.getSystemComponentInfo<RackInfo>([system, module, SystemComponent.RACKS, rackName])
            .subscribe(value => {
                    this.utilsService.hideLoader();
                    this.rackInfo = value;
                    this.onDataReady();
                }
            );
    }

    onDataReady() {
        this.initFormGroup();
        this.updateSlotsList();
    }

    updateSlotsList() {
        if (!this.rackInfo) {
            return;
        }

        this.slotInfos = null;
        this.onoApiService
            .getSystemComponentList<SlotInfo>([this.rackInfo.System, this.rackInfo.Module, this.rackInfo.Rackname, SystemComponent.SLOTS])
            .subscribe(value => {
                    this.slotInfos = value || [];
                },
                error => {
                    this.slotInfos = [];
                }
            );
    }

    initFormGroup() {
        this.formGroup = this.formBuilder.group(
            {
                System: [this.rackInfo.System, Validators.required],
                Rackname: [this.rackInfo.Rackname, Validators.required],
                Module: new FormControl({value: this.rackInfo.Module, disabled: true}, Validators.required),
                LightSlotsNumber: [this.rackInfo.LightSlotsNumber, Validators.required],
                GrowthSlotsNumber: [this.rackInfo.GrowthSlotsNumber, Validators.required],
                Humidity: [this.rackInfo.Humidity, Validators.required],
                Temperature: [this.rackInfo.Temperature, Validators.required],
                PlcAddress: [this.rackInfo.PlcAddress, Validators.required],
                Owner: [this.rackInfo.Owner, Validators.required],
                Description: [this.rackInfo.Description, Validators.required],
                Note: [this.rackInfo.Note],
                Tag: [this.rackInfo.Tag],
                Timestamp: [this.rackInfo.Timestamp],
            }
        );

        this.formGroup.disable({emitEvent: false});
        this.formGroup.valueChanges.subscribe(value => {
            this.dirty = !this.utilsService.isEqual(this.rackInfo, this.formGroup.getRawValue());
        });
    }

    onSaveHandler() {
        if (this.dirty) {
            this.utilsService.showLoader();

            this.onoApiService.putSystemComponentInfo(
                [this.rackInfo.System, this.rackInfo.Module, SystemComponent.RACKS, this.rackInfo.Rackname],
                this.utilsService.getDirtyValues(this.formGroup)
            )
                .subscribe(value => {
                    this.utilsService.hideLoader();
                    this.componentState = PageState.VIEW;
                }, error => {
                    this.utilsService.hideLoader();
                    this.componentState = PageState.VIEW;
                });
        }
    }

    slotViewHandler(value: SlotInfo) {
        this.router.navigate(['settings', 'system', 'slot'], {
            queryParams: {
                system: value.System,
                module: value.Module,
                rack: value.Rack,
                slotName: value.Slotname
            }
        });
    }

    slotCreateHandler() {
        const dialogParams = {
            title: 'Slot create',
            slotInfo: Object.assign(new SlotInfo(), {
                System: this.rackInfo.System,
                Module: this.rackInfo.Module,
                Rack: this.rackInfo.Rackname,
            })
        };

        this.dialog.open(
            SlotEditDialogComponent,
            {
                data: dialogParams
            }
        ).afterClosed().subscribe(
            (formGroup: FormGroup) => {
                if (formGroup && formGroup.valid) {
                    this.onoApiService.slotPost(formGroup.getRawValue()).subscribe(_ => this.updateSlotsList());
                }
            }
        );
    }

    slotEditHandler(slotInfo: SlotInfo) {
        const dialogParams = {
            title: 'Slot create',
            slotInfo
        };

        this.dialog.open(
            SlotEditDialogComponent,
            {
                data: dialogParams
            }
        ).afterClosed().subscribe(
            (formGroup: FormGroup) => {
                if (formGroup && formGroup.valid) {
                    this.onoApiService
                        .putSystemComponentInfo<SlotInfo>(
                            [slotInfo.System, slotInfo.Module, slotInfo.Rack, SystemComponent.SLOTS, slotInfo.Slotname],
                            this.utilsService.getDirtyValues(formGroup)
                        )
                        .subscribe(_ => this.updateSlotsList());
                }
            }
        );
    }

    slotDeleteHandler(value: SlotInfo) {
        if (value) {
            this.onoApiService.deleteSystemComponentInfo<SlotInfo>(
                [value.System, value.Module, value.Rack, SystemComponent.SLOTS, value.Slotname]
            ).subscribe(_ => this.updateSlotsList());
        }
    }
}
