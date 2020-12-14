import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormPageComponent} from '../../../shared/form-page/form-page.component';
import {PlantsInfo} from '../../../../../model/registries/plants-info';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {PageState} from '../../../../../model/page-state.enum';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {FarmingsInfo} from '../../../../../model/registries/farmings-info';

@Component({
    selector: 'app-plants-form',
    templateUrl: './plants-form.component.html',
    styleUrls: ['./plants-form.component.scss']
})
export class PlantsFormComponent extends FormPageComponent implements OnInit, OnChanges {

    @Input()
    set initialState(value) {
        this.componentState = value;
    }

    @Input() title: string;
    @Input() formData: PlantsInfo;

    private farmsList: FarmingsInfo[];

    constructor(
        private formBuilder: FormBuilder,
        private utilsService: UtilsService,
        private onoApiService: OnoApiService
    ) {
        super();
    }

    ngOnInit() {
        this.onoApiService.getFarmings().subscribe(value => this.farmsList = value);
    }

    ngOnChanges({formData: {currentValue, firstChange}}: SimpleChanges): void {
        if (this.componentState === PageState.CREATE) {
            this.formGroup ? this.formGroup.reset() : this.createFormGroup(new PlantsInfo());
        } else {
            if (!this.formGroup && currentValue) {
                this.createFormGroup(currentValue);
            } else if (currentValue) {
                this.formGroup.setValue(currentValue, {emitEvent: false});
            }
        }
    }

    createFormGroup(value: PlantsInfo) {
        this.formGroup = this.formBuilder.group(
            {
                Plant: [value.Plant, Validators.required],
                Farming: [value.Farming, Validators.required],
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
