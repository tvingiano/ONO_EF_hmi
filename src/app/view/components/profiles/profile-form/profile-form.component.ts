import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormPageComponent} from '../../shared/form-page/form-page.component';
import {ProfilesInfo} from '../../../../model/system/ProfilesInfo';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../../service/helper/utils.service';
import {PageState} from '../../../../model/page-state.enum';

export enum ProfileFormFields {
    Name = 'Name',
    StandardCost = 'StandardCost',
    StandardSchedule = 'StandardSchedule',
    OvertimeCost = 'OvertimeCost',
    OvertimeSchedule = 'OvertimeSchedule',
    AnomaliesManaging = 'AnomaliesManaging',
    SystemManaging = 'SystemManaging',
    SetupManaging = 'SetupManaging',
    ProductionManaging = 'ProductionManaging',
    MaintainanceManaging = 'MaintainanceManaging',
    OperativityManaging = 'OperativityManaging',
    OrderManaging = 'OrderManaging',
    Description = 'Description',
    Note = 'Note',
    Tag = 'Tag',
}

@Component({
    selector: 'app-profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent extends FormPageComponent implements OnInit, OnChanges {

    @Input() formData: ProfilesInfo;

    constructor(
        private formBuilder: FormBuilder,
        private utilsService: UtilsService
    ) {
        super();
    }

    ngOnInit() {

    }

    ngOnChanges({formData: {currentValue, firstChange}}: SimpleChanges): void {
        if (this.formGroup && !firstChange) {
            this.formGroup.patchValue(currentValue, {emitEvent: false});
            this.componentState = PageState.VIEW;
        } else if (!this.formGroup && currentValue) {
            this.formGroup = this.formBuilder.group(
                {
                    Name: [this.formData.Name, [Validators.required]],
                    AnomaliesManaging: [this.formData.AnomaliesManaging, []],
                    SystemManaging: [this.formData.SystemManaging, []],
                    SetupManaging: [this.formData.SetupManaging, []],
                    ProductionManaging: [this.formData.ProductionManaging, []],
                    MaintainanceManaging: [this.formData.MaintainanceManaging, []],
                    OperativityManaging: [this.formData.OperativityManaging, []],
                    OrderManaging: [this.formData.OrderManaging, []],
                    StandardCost: [this.formData.StandardCost, [Validators.required]],
                    StandardSchedule: [this.formData.StandardSchedule, [Validators.required]],
                    OvertimeCost: [this.formData.OvertimeCost, [Validators.required]],
                    OvertimeSchedule: [this.formData.OvertimeSchedule, [Validators.required]],
                    Description: [this.formData.Description, [Validators.required]],
                    Note: [this.formData.Note, [Validators.required]],
                    Tag: [this.formData.Tag, [Validators.required]],
                }
            );

            this.formGroup.valueChanges.subscribe(value => {
                this.dirty = !this.utilsService.isEqual(this.formData, this.formGroup.getRawValue());
            });
        }


    }
}
