import {Component, OnInit} from '@angular/core';
import {PlantsInfo} from '../../../../../model/registries/plants-info';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {TableItem} from '../../../../../model/table-item';
import {PageState} from '../../../../../model/page-state.enum';
import {FormGroup} from '@angular/forms';
import {UtilsService} from '../../../../../service/helper/utils.service';
import { ISeed } from 'src/app/model/registries/seeds-info';
import { MatDialog } from '@angular/material';
import { SeedForm2Component } from 'src/app/view/components/registry/seeds/seed-form2/seed-form2.component';

@Component({
    selector: 'app-plants-info',
    templateUrl: './plants-info.component.html',
    styleUrls: ['./plants-info.component.scss']
})
export class PlantsInfoComponent implements OnInit {
    private pageStates = PageState;

    seedInfo: ISeed;
    seedsList: ISeed[];
    displayedColumns: TableItem[] = [
        {title: 'Specie', key: 'Specie'},
        {title: 'SeedType', key: 'SeedType'},
    ];
    actionButtons: string[] = [
        'Edit',
        'Delete'
    ];

    constructor(
        private onoApiService: OnoApiService,
        private utilsService: UtilsService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.getSeedsInfoList();
    }

    // updatePlantsInfoList() {
    //     this.plantsList = null;
    //     this.getPlantsInfoList();
    // }

    // getPlantsInfoList() {
    //     this.utilsService.showLoader();
    //     this.onoApiService.getPlants()
    //         .subscribe(
    //             value => {
    //                 this.utilsService.hideLoader();
    //                 this.plantsList = value || [];
    //             }
    //         );
    // }

    updateSeedsInfoList() {
        this.seedsList = null;
        this.getSeedsInfoList();
    }

    getSeedsInfoList() {
        this.utilsService.showLoader();
        this.onoApiService.getSeeds()
            .subscribe(
                value => {
                    this.utilsService.hideLoader();
                    this.seedsList = value || [];
                }
            );
    }

    createClick() {
        this.seedInfo = null;
        const dialogRef = this.dialog.open(
            SeedForm2Component,
            {
                data: {seed: this.seedInfo, type: 'post'},
                panelClass: 'custom-dialog-component-400'
            }
        );
    }

    deleteClick(info: ISeed) {
        this.utilsService.showLoader();
        this.onoApiService
            .deleteSeed(info.SeedType)
            .subscribe(
                value => {
                    this.updateSeedsInfoList();
                }
            );
    }

    editClick(event) {

        const dialogRef = this.dialog.open(
            SeedForm2Component,
            {
                data: {seed: event, type: 'put'},
                panelClass: 'custom-dialog-component-400'}
            );
    }

    seedsFormSubmit(formGroup: FormGroup) {
        this.seedInfo ? this.onEditFromSubmit(formGroup) : this.onCreateFromSubmit(formGroup);
    }

    onCreateFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            this.onoApiService
                .postSeed(formGroup.value)
                .subscribe(
                    _ => {
                        formGroup.reset();
                        this.utilsService.hideLoader();
                        this.updateSeedsInfoList();
                    }
                );
        }
    }

    onEditFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            const {Plant} = formGroup.value;
            this.onoApiService
                .putSeed(Plant, this.utilsService.getDirtyValues(formGroup))
                .subscribe(
                    _ => {
                        this.utilsService.hideLoader();
                        this.updateSeedsInfoList();
                    }
                );
        }
    }


}
