import {Component, OnInit} from '@angular/core';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {UtilsService} from 'src/app/service/helper/utils.service';
import {FarmingsInfo} from '../../../../../model/registries/farmings-info';
import {PageState} from '../../../../../model/page-state.enum';
import {FormGroup} from '@angular/forms';
import {TableItem} from '../../../../../model/table-item';

@Component({
    selector: 'app-farmings-info',
    templateUrl: './farmings-info.component.html',
    styleUrls: ['./farmings-info.component.scss']
})
export class FarmingsInfoComponent implements OnInit {
    private pageStates = PageState;

    private farmingsInfo: FarmingsInfo;
    private farmingsInfoList: FarmingsInfo[];

    displayedColumns: TableItem[] = [
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
        this.getFarmingsInfoList();
    }

    updateFarmingsInfoList() {
        this.farmingsInfoList = null;
        this.getFarmingsInfoList();
    }

    getFarmingsInfoList() {
        this.utilsService.showLoader();
        this.onoApiService
            .getFarmings()
            .subscribe(
                value => {
                    this.utilsService.hideLoader();

                    this.farmingsInfoList = value || [];
                }
            );
    }

    createClick() {
        this.farmingsInfo = null;
    }

    deleteClick(info: FarmingsInfo) {
        this.utilsService.showLoader();
        this.onoApiService
            .deleteFarmings(info.Farming)
            .subscribe(
                value => {
                    this.utilsService.hideLoader();
                    this.updateFarmingsInfoList();
                }
            );
    }

    onCreateFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            this.onoApiService
                .postFarmings(formGroup.value)
                .subscribe(
                    value => {
                        formGroup.reset();
                        this.utilsService.hideLoader();
                        this.updateFarmingsInfoList();
                    }
                );
        }
    }

    onEditFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            const {Farming} = formGroup.value;
            this.onoApiService
                .putFarmings(Farming, this.utilsService.getDirtyValues(formGroup))
                .subscribe(
                    value => {
                        this.utilsService.hideLoader();
                        this.updateFarmingsInfoList();
                    }
                );
        }
    }

}
