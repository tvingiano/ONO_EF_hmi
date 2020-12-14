import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AREA_TYPES, ArrayType, SlotInfo} from '../../../../../model/system/SlotInfo';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {LampInfo} from '../../../../../model/system/LampInfo';
import {RACK_SIDES, RackSide} from '../../../../../model/system/RackInfo';

interface ISlotEditData {
    slotInfo: SlotInfo;
    title: string;
}

@Component({
    selector: 'app-slot-edit-dialog',
    templateUrl: './slot-edit-dialog.component.html',
    styles: []
})
export class SlotEditDialogComponent implements OnInit {

    formGroup: FormGroup;

    rackSides: RackSide[] = RACK_SIDES;
    areaTypes: ArrayType[] = AREA_TYPES;
    lightConfigurations: LampInfo[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ISlotEditData,
        private formBuilder: FormBuilder,
        private onoApiService: OnoApiService,
    ) {
    }

    ngOnInit() {
        /* getting lamps config */
        this.onoApiService
            .lampsGet()
            .subscribe(value => {
                this.lightConfigurations = value;
                this.createFormGroup();
            });
    }

    createFormGroup() {
        const {slotInfo} = this.data;

        this.formGroup = this.formBuilder.group(
            {
                System: [slotInfo.System, Validators.required],
                Module: [slotInfo.Module, Validators.required],
                Rack: [slotInfo.Rack, Validators.required],
                Area: [this.data.slotInfo.Area, Validators.required],
                LightConfiguration: [this.data.slotInfo.LightConfiguration, Validators.required],
                LampsNumber: [this.data.slotInfo.LampsNumber, Validators.required],
                Height: [this.data.slotInfo.Height, Validators.required],
                RackSide: [this.data.slotInfo.RackSide, Validators.required],
                Description: [this.data.slotInfo.Description],
                Note: [this.data.slotInfo.Note],
                Tag: [this.data.slotInfo.Tag],
            }
        );
    }

}
