import {Component, OnInit} from '@angular/core';
import {PageState} from '../../../../model/page-state.enum';
import {TableItem} from '../../../../model/table-item';
import {OnoApiService} from 'src/app/service/ono-api.service';
import {UtilsService} from '../../../../service/helper/utils.service';
import {SubstrateInfo} from '../../../../model/substrate-info';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-substrates',
    template: `
        <app-page-wrapper title="{{'label.Substrates' | translate}}" shadow="false">
            <mat-card>
                <mat-card-content>
                    <div class="row">
                        <div class="col-md">
                            <!-- show spinner -->
                            <div class="d-flex justify-content-center mt-5" *ngIf="!entityList">
                                <mat-spinner diameter="50"></mat-spinner>
                            </div>
                            <app-items-table *ngIf="entityList"
                                             [title]="'label.Substrates' | translate"
                                             [initialData]="entityList"
                                             [displayedColumns]="displayedColumns"
                                             [actionButtons]="actionButtons"
                                             (createClick)="createClick()"
                                             (editClick)="entityInfo=$event"
                                             (deleteClick)="deleteClick($event)"
                            ></app-items-table>
                        </div>
                        <div class="col-md">
                            <app-substrates-form [formData]="entityInfo"
                                                 [initialState]="!entityInfo ? pageStates.CREATE : pageStates.VIEW"
                                                 (formSubmit)="!entityInfo ? onCreateFromSubmit($event):onEditFromSubmit($event)"
                                                 [disabledFields]="editDisabledField"
                            ></app-substrates-form>
                        </div>
                    </div>
                </mat-card-content>
            </mat-card>
        </app-page-wrapper>
    `,
    styleUrls: ['./substrates.component.scss']
})

export class SubstratesComponent implements OnInit {

    private pageStates = PageState;

    entityInfo: SubstrateInfo;
    entityList: SubstrateInfo[];
    displayedColumns: TableItem[] = [
        {title: 'Serial', key: 'Serial'},
        {title: 'Material', key: 'Material'},
        {title: 'Producer', key: 'Producer'},
    ];
    actionButtons: string[] = [
        'Edit',
        'Delete'
    ];

    editDisabledField = [
        'Serial',
        'Material',
        'Cost',
        'Description',
        'Tag',
    ];

    constructor(
        private onoApiService: OnoApiService,
        private utilsService: UtilsService
    ) {
    }

    ngOnInit() {
        this.updateEntityList();
    }

    updateEntityList() {
        this.entityList = null;
        this.onoApiService.getsSubstrates()
            .subscribe(
                value => {
                    this.entityList = value || [];
                }
            );
    }

    createClick() {
        this.entityInfo = null;
    }

    deleteClick(info: SubstrateInfo) {
        this.utilsService.showLoader();
        this.onoApiService
            .deleteSubstrates(info.Serial)
            .subscribe(
                value => {
                    this.utilsService.hideLoader();
                    this.updateEntityList();
                }
            );
    }

    formSubmit(formGroup: FormGroup) {
        this.entityInfo ? this.onEditFromSubmit(formGroup) : this.onCreateFromSubmit(formGroup);
    }

    onCreateFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            this.onoApiService
                .postSubstrates(formGroup.value)
                .subscribe(
                    _ => {
                        formGroup.reset();
                        this.utilsService.hideLoader();
                        this.updateEntityList();
                    }
                );
        }
    }

    onEditFromSubmit(formGroup: FormGroup) {
        if (formGroup && formGroup.valid) {
            this.utilsService.showLoader();
            const {Serial} = formGroup.getRawValue();
            this.onoApiService
                .putSubstrates(Serial, this.utilsService.getDirtyValues(formGroup))
                .subscribe(
                    _ => {
                        this.entityInfo = null;
                        this.utilsService.hideLoader();
                        this.updateEntityList();
                    }
                );
        }
    }
}
