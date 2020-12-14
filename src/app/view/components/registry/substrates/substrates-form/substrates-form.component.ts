import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {PageState} from '../../../../../model/page-state.enum';
import {FormPageComponent} from '../../../shared/form-page/form-page.component';
import {SubstrateInfo} from '../../../../../model/substrate-info';

@Component({
    selector: 'app-substrates-form',
    template: `
        <div class="container-fluid">
            <mat-card class="mb-3" *ngIf="formGroup">
                <mat-card-header>
                    <mat-card-title>{{title}}</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                    <!-- MODULE INFO FORM -->
                    <form [formGroup]="formGroup">
                        <h6>{{'label.baseInfo' | translate}}</h6>

                        <mat-form-field appearance="outline" >
                            <mat-label>{{'label.Serial' | translate}}</mat-label>
                            <input matInput type="text"
                                   placeholder="{{'label.Serial' | translate}}"
                                   formControlName="Serial"
                                   autocomplete="off"
                                   [disableControl]="isDisabled('Serial')">
                        </mat-form-field>

                        <mat-form-field appearance="outline">
                            <mat-label>{{'label.Material' | translate}}</mat-label>
                            <input matInput type="text"
                                   placeholder="{{'label.Material' | translate}}"
                                   formControlName="Material"
                                   autocomplete="off"
                                   [disableControl]="isDisabled('Material')">
                        </mat-form-field>

                        <mat-form-field appearance="outline">
                            <mat-label>{{'label.Producer' | translate}}</mat-label>
                            <input matInput type="text"
                                   placeholder="{{'label.Producer' | translate}}"
                                   formControlName="Producer"
                                   autocomplete="off"
                                   [disableControl]="isDisabled('Producer')">
                        </mat-form-field>

                        <mat-form-field appearance="outline">
                            <mat-label>{{'label.Cost' | translate}}</mat-label>
                            <input matInput type="number"
                                   placeholder="{{'label.Cost' | translate}}"
                                   formControlName="Cost"
                                   autocomplete="off"
                                   [disableControl]="isDisabled('Cost')">
                        </mat-form-field>

                        <h6>{{'label.additionInformation' | translate}}</h6>
                        <!-- Description -->
                        <mat-form-field appearance="outline">
                            <mat-label>{{'label.description' | translate}}</mat-label>
                            <textarea matInput placeholder="{{'label.description' | translate}}"
                                      formControlName="Description" [disableControl]="isDisabled('Description')"></textarea>
                        </mat-form-field>
                        <!-- Note -->
                        <mat-form-field appearance="outline">
                            <mat-label>{{'label.note' | translate}}</mat-label>
                            <textarea matInput placeholder="{{'label.note' | translate}}"
                                      formControlName="Note" [disableControl]="isDisabled('Note')"></textarea>
                        </mat-form-field>
                        <!-- Description -->
                        <mat-form-field appearance="outline">
                            <mat-label>{{'label.tag' | translate}}</mat-label>
                            <textarea matInput placeholder="{{'label.tag' | translate}}"
                                      formControlName="Tag" [disableControl]="isDisabled('Tag')"></textarea>
                        </mat-form-field>
                    </form>
                </mat-card-content>
                <mat-card-actions align="end">
                    <!-- EDIT BUTTON -->
                    <button mat-button (click)="onEditHandler()"
                            *ngIf="componentState === pageStates.VIEW && formData">{{"label.edit" | translate}}</button>
                    <!-- SAVE BUTTON -->
                    <button mat-button color="warn" *ngIf="componentState === pageStates.EDIT" [disabled]="!dirty"
                            (click)="onSaveHandler()">{{"label.save" | translate}}</button>
                    <!-- CREATE BUTTON -->
                    <button mat-button color="warn" *ngIf="componentState === pageStates.CREATE" [disabled]="formGroup.invalid"
                            (click)="formSubmit.emit(formGroup)">{{"label.create" | translate}}</button>
                    <!-- CANCEL BUTTON -->
                    <button mat-button color="primary" *ngIf="componentState === pageStates.EDIT"
                            (click)="onCancelHandler()">{{"label.cancel" | translate}}</button>
                </mat-card-actions>
            </mat-card>
        </div>
    `,
    styleUrls: ['./substrates-form.component.scss']
})
export class SubstratesFormComponent extends FormPageComponent implements OnInit, OnChanges {

    @Input()
    set initialState(value) {
        this.componentState = value;
    }

    @Input() title: string;
    @Input() formData: SubstrateInfo;

    constructor(
        private formBuilder: FormBuilder,
        private utilsService: UtilsService
    ) {
        super();
    }

    ngOnInit() {
    }

    ngOnChanges({formData: {currentValue, firstChange}}: SimpleChanges): void {
        if (this.componentState === PageState.CREATE) {
            this.formGroup ? this.formGroup.reset() : this.createFormGroup(new SubstrateInfo());
        } else {
            if (!this.formGroup && currentValue) {
                this.createFormGroup(currentValue);
            } else {
                this.formGroup.setValue(currentValue, {emitEvent: false});
                this.componentState = PageState.VIEW;
            }
        }
    }

    createFormGroup(value: SubstrateInfo) {
        this.formGroup = this.formBuilder.group(
            {
                Serial: [value.Serial, Validators.required],
                Material: [value.Material, Validators.required],
                Producer: [value.Producer, Validators.required],
                Cost: [value.Cost, Validators.required],
                Owner: [value.Owner],
                Description: [value.Description],
                Note: [value.Note],
                Tag: [value.Tag],
                Timestamp: [value.Timestamp],
            }
        );

        this.formGroup.valueChanges.subscribe(_ => {
            this.dirty = !this.utilsService.isEqual(this.formData, this.formGroup.getRawValue());
        });
    }

    onSaveHandler() {
        this.componentState = PageState.VIEW;
        this.formSubmit.emit(this.formGroup);
    }

}
