import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISystemRegistry} from '../../../../../model/interface/ISystemRegistry';

interface IDialogData {
    value: ISystemRegistry;
    title: string;
    isEditState: boolean;
}

@Component({
    selector: 'app-system-edit-dialog',
    templateUrl: './system-edit-dialog.component.html',
    styleUrls: ['./system-edit-dialog.component.scss']
})
export class SystemEditDialogComponent implements OnInit {

    formGroup: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IDialogData,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group(
            {
                SystemName: [{value: this.data.value.SystemName, disabled: this.data.isEditState}, Validators.required],
                AccountHolder: [{value: this.data.value.AccountHolder, disabled: false}, Validators.required],
                // HardwareVersion: [{value: this.data.value.HardwareVersion, disabled: this.data.isEditState}, Validators.required],
                ProductionDate: [{value: this.data.value.ProductionDate, disabled: this.data.isEditState}, Validators.required],
                InstallationDate: [{value: this.data.value.InstallationDate, disabled: this.data.isEditState}, Validators.required],
                Place: [{value: this.data.value.Place, disabled: false}, Validators.required],
                // PlcVersion: [{value: this.data.value.PlcVersion, disabled: this.data.isEditState}, Validators.required],
                // SoftwareVersion: [{value: this.data.value.SoftwareVersion, disabled: this.data.isEditState}, Validators.required],

            }
        );
    }

}
