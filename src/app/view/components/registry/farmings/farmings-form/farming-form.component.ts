import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormPageComponent} from '../../../shared/form-page/form-page.component';
import {FarmingsInfo} from '../../../../../model/registries/farmings-info';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {PageState} from '../../../../../model/page-state.enum';

@Component({
    selector: 'app-farming-create-form',
    templateUrl: './farming-form.component.html',
    styleUrls: ['./farming-form.component.scss']
})
export class FarmingFormComponent extends FormPageComponent implements OnInit, OnChanges {
    @Input()
    set initialState(value) {
        this.componentState = value;
    }

    @Input() title: string;
    @Input() formData: FarmingsInfo;

    constructor(
        private formBuilder: FormBuilder,
        private utilsService: UtilsService
    ) {
        super();
    }

    ngOnInit() {
    }

    ngOnChanges({formData: {currentValue, firstChange}}: SimpleChanges): void {

        if (this.componentState === PageState.CREATE) {
            this.formGroup ? this.formGroup.reset() : this.createFormGroup(new FarmingsInfo());
        } else {
            if (!this.formGroup && currentValue) {
                this.createFormGroup(currentValue);
            } else {
                this.formGroup.setValue(currentValue, {emitEvent: false});
            }
        }
    }

    createFormGroup(value: FarmingsInfo) {
        this.formGroup = this.formBuilder.group(
            {
                Farming: [value.Farming, Validators.required],
                Owner: [value.Owner],
                Description: [value.Description],
                Note: [value.Note],
                Tag: [value.Tag],
                Timestamp: [value.Timestamp],
            }
        );

        this.formGroup.valueChanges.subscribe(_ => {
            this.dirty = !this.utilsService.isEqual(this.formData, this.formGroup.getRawValue());
        });
    }

}
