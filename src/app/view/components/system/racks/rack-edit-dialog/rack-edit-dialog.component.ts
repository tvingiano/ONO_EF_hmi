import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RackInfo} from '../../../../../model/system/RackInfo';

interface IRackEditData {
    rackInfo: RackInfo;
    title: string;
    parentModuleID: number;
}

@Component({
    selector: 'app-rack-edit-dialog',
    templateUrl: './rack-edit-dialog.component.html',
    styles: []
})
export class RackEditDialogComponent implements OnInit {

    formGroup: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IRackEditData,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group(
            {
                Module: [{
                    value: this.data.rackInfo.Module,
                    disabled: true
                }, Validators.required],
                System: [{
                    value: this.data.rackInfo.System,
                    disabled: true
                }, Validators.required],
                LightSlotsNumber: [this.data.rackInfo.LightSlotsNumber, Validators.required],
                GrowthSlotsNumber: [this.data.rackInfo.GrowthSlotsNumber, Validators.required],
                Humidity: [this.data.rackInfo.Humidity, Validators.required],
                Temperature: [this.data.rackInfo.Temperature, Validators.required],
                PlcAddress: [this.data.rackInfo.PlcAddress, Validators.required],
                Description: [this.data.rackInfo.Description, Validators.required],
                Note: [this.data.rackInfo.Note],
            }
        );
    }

}
