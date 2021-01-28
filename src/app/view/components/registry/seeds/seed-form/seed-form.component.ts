import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormPageComponent} from '../../../shared/form-page/form-page.component';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {PageState} from '../../../../../model/page-state.enum';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {FarmingsInfo} from '../../../../../model/registries/farmings-info';
import { ISeed } from 'src/app/model/registries/seeds-info';
import { SpeciesInfo } from 'src/app/model/registries/species-info';
import { isSelected } from '@syncfusion/ej2-angular-diagrams';

@Component({
    selector: 'app-seed-form',
    templateUrl: './seed-form.component.html',
    styleUrls: ['./seed-form.component.scss']
})
export class SeedFormComponent extends FormPageComponent implements OnInit, OnChanges {

    @Input()
    set initialState(value) {
        this.componentState = value;
    }

    @Input() title: string;
    @Input() formData: ISeed;

    private specieList: SpeciesInfo[];

    constructor(
        private formBuilder: FormBuilder,
        private utilsService: UtilsService,
        private onoApiService: OnoApiService
    ) {
        super();
    }

    ngOnInit() {
        this.onoApiService.getSpecies().subscribe(value => this.specieList = value);
    }

    ngOnChanges({formData: {currentValue, firstChange}}: SimpleChanges): void {
        if (this.componentState === PageState.CREATE) {
            // this.formGroup ? this.formGroup.reset() : this.createFormGroup(new ISeed());
        } else {
            if (!this.formGroup && currentValue) {
                this.createFormGroup(currentValue);
            } else if (currentValue) {
                this.formGroup.setValue(currentValue, {emitEvent: false});
            }
        }
    }

    createFormGroup(value: ISeed) {
        this.formGroup = this.formBuilder.group(
            {
                SeedType: [value.SeedType, Validators.required],
                Specie: [value.Specie, Validators.required],
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
