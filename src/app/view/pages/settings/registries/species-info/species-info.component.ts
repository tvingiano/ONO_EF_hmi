import {Component, OnInit} from '@angular/core';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {TableItem} from '../../../../../model/table-item';
import {PageState} from '../../../../../model/page-state.enum';
import {FormGroup} from '@angular/forms';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {SpeciesInfo} from '../../../../../model/registries/species-info';

@Component({
    selector: 'app-species-info',
    templateUrl: './species-info.component.html',
    styleUrls: ['./species-info.component.scss']
})
export class SpeciesInfoComponent implements OnInit {
    private pageStates = PageState;

    speciesInfo: SpeciesInfo;
    speciesInfos: SpeciesInfo[];
    displayedColumns: TableItem[] = [
        {title: 'Specie', key: 'Specie'},
        {title: 'Farming', key: 'Farming'},
        {title: 'Plant', key: 'Plant'},
    ];
    actionButtons: string[] = [
        'Edit',
        'Delete'
    ];

    constructor(
        private onoApiService: OnoApiService,
        private utilsService: UtilsService
    ) {
    }

    ngOnInit() {
        this.getSpeciesInfoList();
    }

    updateSpeciesInfoList() {
        this.speciesInfos = null;
        this.getSpeciesInfoList();
    }

    getSpeciesInfoList() {
        this.utilsService.showLoader();
        this.onoApiService.getSpecies()
            .subscribe(
                value => {
                    this.utilsService.hideLoader();
                    this.speciesInfos = value || [];
                }
            );
    }

    createClick() {
        this.speciesInfo = null;
    }

    deleteClick(info: SpeciesInfo) {
        this.utilsService.showLoader();
        this.onoApiService
            .deleteSpecies(info.Plant)
            .subscribe(
                value => {
                    this.utilsService.hideLoader();
                    this.updateSpeciesInfoList();
                }
            );
    }

    speciesFormSubmit(formGroup: FormGroup) {
        this.speciesInfo ? this.onEditFromSubmit(formGroup) : this.onCreateFromSubmit(formGroup);
    }

    onCreateFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            this.onoApiService
                .postSpecies(formGroup.value)
                .subscribe(
                    _ => {
                        formGroup.reset();
                        this.utilsService.hideLoader();
                        this.updateSpeciesInfoList();
                    }
                );
        }
    }

    onEditFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            const {Specie} = formGroup.value;
            this.onoApiService
                .putSpecies(Specie, this.utilsService.getDirtyValues(formGroup))
                .subscribe(
                    _ => {
                        this.utilsService.hideLoader();
                        this.updateSpeciesInfoList();
                    }
                );
        }
    }


}
