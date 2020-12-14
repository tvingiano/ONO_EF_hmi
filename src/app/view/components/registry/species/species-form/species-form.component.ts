import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormPageComponent} from '../../../shared/form-page/form-page.component';
import {PlantsInfo} from '../../../../../model/registries/plants-info';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {PageState} from '../../../../../model/page-state.enum';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {FarmingsInfo} from '../../../../../model/registries/farmings-info';
import {SpeciesInfo} from '../../../../../model/registries/species-info';
import {of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-species-from',
    templateUrl: './species-form.component.html',
    styleUrls: ['./species-form.component.scss']
})
export class SpeciesFormComponent extends FormPageComponent implements OnInit, OnChanges {

    @Input()
    set initialState(value) {
        this.componentState = value;
    }

    @Input() title: string;
    @Input() formData: PlantsInfo;

    private farmsList: FarmingsInfo[];
    private plantsList: PlantsInfo[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private utilsService: UtilsService,
        private onoApiService: OnoApiService
    ) {
        super();
    }

    ngOnInit() {

        of(null).pipe(
            switchMap(value => {
                return this.onoApiService.getFarmings();
            }),
            map(value => {
                this.farmsList = value || [];
                return null;
            }),
            switchMap(value => {
                return this.onoApiService.getPlants();
            }),
            map(value => {
                this.plantsList = value || [];
                return null;
            })
        ).subscribe();

        this.onoApiService.getFarmings()
            .subscribe(value => this.farmsList = value);
    }

    ngOnChanges({formData: {currentValue, firstChange}}: SimpleChanges): void {
        if (this.componentState === PageState.CREATE) {
            this.formGroup ? this.formGroup.reset() : this.createFormGroup(new SpeciesInfo());
        } else {
            if (!this.formGroup && currentValue) {
                this.createFormGroup(currentValue);
            } else if (currentValue) {
                this.componentState = PageState.VIEW;
                this.formGroup.reset();
                this.formGroup.setValue(currentValue, {emitEvent: false});
                this.updatePlantsList({value: currentValue.Farming});
            }
        }
    }

    createFormGroup(value: SpeciesInfo) {
        this.formGroup = this.formBuilder.group(
            {
                Specie: [value.Specie, Validators.required],
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

    updatePlantsList({value}) {
        this.utilsService.showLoader();

        this.plantsList = [];
        this.onoApiService.getPlants().pipe(
            map(plants => plants.filter(plant => plant.Farming === value))
        ).subscribe(
            plants => {
                this.utilsService.hideLoader();
                this.plantsList = plants;
            }
        );
    }
}
