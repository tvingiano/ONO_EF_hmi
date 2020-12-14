import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormPageComponent} from '../../../shared/form-page/form-page.component';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {PageState} from '../../../../../model/page-state.enum';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {SolutionsInfo} from '../../../../../model/registries/solutions-info';

@Component({
    selector: 'app-solutions-form',
    templateUrl: './solutions-form.component.html',
    styleUrls: ['./solutions-form.component.scss']
})
export class SolutionsFormComponent extends FormPageComponent implements OnInit, OnChanges {

    @Input()
    set initialState(value) {
        this.componentState = value;
    }

    @Input() title: string;
    @Input() formData: SolutionsInfo;

    constructor(
        private formBuilder: FormBuilder,
        private utilsService: UtilsService,
        private onoApiService: OnoApiService
    ) {
        super();
    }

    ngOnInit() {
    }

    ngOnChanges({formData: {currentValue, firstChange}}: SimpleChanges): void {
        if (this.componentState === PageState.CREATE) {
            this.formGroup ? this.formGroup.reset() : this.createFormGroup(new SolutionsInfo());
        } else {
            if (!this.formGroup && currentValue) {
                this.createFormGroup(currentValue);
            } else if (currentValue) {
                this.formGroup.setValue(currentValue, {emitEvent: false});
            }
        }
    }

    createFormGroup(value: SolutionsInfo) {
        this.formGroup = this.formBuilder.group(
            {
                Name: [value.Name, Validators.required],
                One: [value.One, Validators.required],
                Two: [value.Two, Validators.required],
                Three: [value.Three, Validators.required],
                Four: [value.Four, Validators.required],
                Five: [value.Five, Validators.required],
                Six: [value.Six, Validators.required],
                Seven: [value.Seven, Validators.required],
                Eight: [value.Eight, Validators.required],
                Nine: [value.Nine, Validators.required],
                Ten: [value.Ten, Validators.required],
                Eleven: [value.Eleven, Validators.required],

                Description: [value.Description],
                Owner: [value.Owner],
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
