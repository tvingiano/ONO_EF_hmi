import {Component, OnInit} from '@angular/core';
import {PlantsInfo} from '../../../../../model/registries/plants-info';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {TableItem} from '../../../../../model/table-item';
import {PageState} from '../../../../../model/page-state.enum';
import {FormGroup} from '@angular/forms';
import {UtilsService} from '../../../../../service/helper/utils.service';

@Component({
    selector: 'app-plants-info',
    templateUrl: './plants-info.component.html',
    styleUrls: ['./plants-info.component.scss']
})
export class PlantsInfoComponent implements OnInit {
    private pageStates = PageState;

    plantsInfo: PlantsInfo;
    plantsList: PlantsInfo[];
    displayedColumns: TableItem[] = [
        {title: 'Plant', key: 'Plant'},
        {title: 'Farming', key: 'Farming'},
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
        this.getPlantsInfoList();
    }

    updatePlantsInfoList() {
        this.plantsList = null;
        this.getPlantsInfoList();
    }

    getPlantsInfoList() {
        this.utilsService.showLoader();
        this.onoApiService.getPlants()
            .subscribe(
                value => {
                    this.utilsService.hideLoader();
                    this.plantsList = value || [];
                }
            );
    }

    createClick() {
        this.plantsInfo = null;
    }

    deleteClick(info: PlantsInfo) {
        this.utilsService.showLoader();
        this.onoApiService
            .deletePlants(info.Plant)
            .subscribe(
                value => {
                    this.utilsService.hideLoader();
                    this.updatePlantsInfoList();
                }
            );
    }

    plantsFormSubmit(formGroup: FormGroup) {
        this.plantsInfo ? this.onEditFromSubmit(formGroup) : this.onCreateFromSubmit(formGroup);
    }

    onCreateFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            this.onoApiService
                .postPlants(formGroup.value)
                .subscribe(
                    _ => {
                        formGroup.reset();
                        this.utilsService.hideLoader();
                        this.updatePlantsInfoList();
                    }
                );
        }
    }

    onEditFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            const {Plant} = formGroup.value;
            this.onoApiService
                .putPlants(Plant, this.utilsService.getDirtyValues(formGroup))
                .subscribe(
                    _ => {
                        this.utilsService.hideLoader();
                        this.updatePlantsInfoList();
                    }
                );
        }
    }


}
