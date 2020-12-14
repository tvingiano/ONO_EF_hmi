import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ModuleInfo} from '../../../../../model/system/ModuleInfo';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {User} from '../../../../../model/user';
import {CurrentUserService} from '../../../../../service/current-user.service';

interface IModuleEditData {
    moduleInfo: ModuleInfo;
    systems: string[];
    title: string;
}

@Component({
    selector: 'app-module-edit-dialog',
    templateUrl: './module-edit-dialog.component.html',
    styleUrls: ['./module-edit-dialog.component.scss']
})

export class ModuleEditDialogComponent implements OnInit {
    systemsList: string[];
    moduleFormGroup: FormGroup;
    system: string;
    user: User;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IModuleEditData,
        private formBuilder: FormBuilder,
        private ono: OnoApiService,
        private currentUserService: CurrentUserService
    ) {
    }

    ngOnInit() {
        this.user = this.currentUserService.currentUser;

        this.initForm();
    }

    initForm() {
        this.systemsList = this.data.systems || this.user.Systems;
        this.system = this.data.moduleInfo.System || this.systemsList[0];

        this.moduleFormGroup = this.formBuilder.group(
            {
                System: [{value: this.system, disabled: this.systemsList.length <= 1}, Validators.required],
                RackNumber: [this.data.moduleInfo.RackNumber, Validators.required],
                LightSlotsNumber: [this.data.moduleInfo.LightSlotsNumber, Validators.required],
                GrowthSlotsNumber: [this.data.moduleInfo.GrowthSlotsNumber, Validators.required],
                SolutionCapacity: [this.data.moduleInfo.SolutionCapacity, Validators.required],
                Description: [this.data.moduleInfo.Description, Validators.required],
                Note: [this.data.moduleInfo.Note],
                Tag: [this.data.moduleInfo.Tag],
            }
        );
    }
}
