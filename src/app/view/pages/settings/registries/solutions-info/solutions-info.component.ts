import {Component, OnInit} from '@angular/core';
import {OnoApiService} from 'src/app/service/ono-api.service';
import {PageState} from '../../../../../model/page-state.enum';
import {TableItem} from '../../../../../model/table-item';
import {SolutionsInfo} from '../../../../../model/registries/solutions-info';
import {FormGroup} from '@angular/forms';
import {UtilsService} from '../../../../../service/helper/utils.service';

@Component({
    selector: 'app-solutions-info',
    template: `
        <app-page-wrapper title="Solutions Info" shadow="false">
            <mat-card>
                <mat-card-content>
                    <div class="row">
                        <div class="col-md">
                            <!-- show spinner -->
                            <div class="d-flex justify-content-center mt-5" *ngIf="!solutionsList">
                                <mat-spinner diameter="50"></mat-spinner>
                            </div>
                            <app-items-table *ngIf="solutionsList"
                                             [title]="'label.SolutionsList' | translate"
                                             [initialData]="solutionsList"
                                             [displayedColumns]="displayedColumns"
                                             [actionButtons]="actionButtons"
                                             (createClick)="createClick()"
                                             (editClick)="solutionInfo=$event"
                                             (deleteClick)="deleteClick($event)"
                            ></app-items-table>
                        </div>
                        <div class="col-md">
                            <app-solutions-form [formData]="solutionInfo"
                                                     [initialState]="!solutionInfo ? pageStates.CREATE : pageStates.VIEW"
                                                     (formSubmit)="formSubmit($event)"
                            ></app-solutions-form>
                        </div>
                    </div>
                </mat-card-content>
            </mat-card>
        </app-page-wrapper>

    `,
    styles: []
})
export class SolutionsInfoComponent implements OnInit {

    private pageStates = PageState;

    solutionInfo: SolutionsInfo;
    solutionsList: SolutionsInfo[];
    displayedColumns: TableItem[] = [
        {title: 'Name', key: 'Name'},
        {title: 'One', key: 'One'},
        {title: 'Two', key: 'Two'},
        {title: 'Three', key: 'Three'},
        {title: 'Four', key: 'Four'},
    ];
    actionButtons: string[] = [
        'Edit',
        'Delete'
    ];

    constructor(
        private onoApiService: OnoApiService,
        private utilsService: UtilsService,
    ) {
    }

    ngOnInit() {
        this.onoApiService.getsSolutions()
            .subscribe(
                value => {
                    this.solutionsList = value || [];
                }
            );
    }

    updateInfosList() {
        this.solutionInfo = null;
        this.getInfoList();
    }

    getInfoList() {
        this.utilsService.showLoader();
        this.onoApiService.getsSolutions()
            .subscribe(
                value => {
                    this.utilsService.hideLoader();
                    this.solutionsList = value || [];
                }
            );
    }

    createClick() {
        this.solutionInfo = null;
    }

    deleteClick(info: SolutionsInfo) {
        this.utilsService.showLoader();
        this.onoApiService
            .deleteSolutions(info.Name)
            .subscribe(
                value => {
                    this.utilsService.hideLoader();
                    this.updateInfosList();
                }
            );
    }

    formSubmit(formGroup: FormGroup) {
        this.solutionInfo ? this.onEditFromSubmit(formGroup) : this.onCreateFromSubmit(formGroup);
    }

    onCreateFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            this.onoApiService
                .postSolutions(formGroup.value)
                .subscribe(
                    _ => {
                        formGroup.reset();
                        this.utilsService.hideLoader();
                        this.updateInfosList();
                    }
                );
        }
    }

    onEditFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            const {Name} = formGroup.value;
            this.onoApiService
                .putSolutions(Name, this.utilsService.getDirtyValues(formGroup))
                .subscribe(
                    _ => {
                        this.utilsService.hideLoader();
                        this.updateInfosList();
                    }
                );
        }
    }
}
