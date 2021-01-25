import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ISeed } from 'src/app/model/registries/seeds-info';

interface ISeedEditData {
    seedInfo: ISeed;
    title: string;
}

@Component({
    selector: 'app-seed-edit-dialog',
    templateUrl: './seed-edit-dialog.component.html',
    styles: []
})
export class SeedEditDialogComponent implements OnInit {

    formGroup: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ISeedEditData,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group(
            {
                SeedType: [this.data.seedInfo.SeedType, Validators.required],
                Specie: [this.data.seedInfo.Specie, Validators.required],
                GerminatedPercentage: [this.data.seedInfo.Cost.GerminatedPercentage, Validators.required],
                WeightForDrawer: [this.data.seedInfo.Cost.WeightForDrawer, Validators.required],
                Contingency: [this.data.seedInfo.Contingency, Validators.required],
                Owner: [this.data.seedInfo.Owner, Validators.required],
                Description: [this.data.seedInfo.Description, Validators.required],
                Note: [this.data.seedInfo.Note],
                Tag: [this.data.seedInfo.Tag],
            }
        );
    }

}
