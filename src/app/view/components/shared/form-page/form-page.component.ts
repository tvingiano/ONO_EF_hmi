import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageState} from '../../../../model/page-state.enum';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-form-page',
    templateUrl: './form-page.component.html',
    styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {
    /*input params  */
    @Input() formData: any;
    @Input() disabledFields: Array<string> = [];

    /* page events */
    @Output() formSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
    @Output() formCancel: EventEmitter<null> = new EventEmitter<null>();

    /* page params */
    protected pageStates = PageState;
    protected componentState = PageState.VIEW;
    protected dirty = false;
    protected formGroup: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

    onDataReady() {
        this.initFormGroup();
    }

    initFormGroup() {

    }

    onEditHandler() {
        this.componentState = PageState.EDIT;
    }

    onDeleteHandler() {

    }

    onSaveHandler() {

    }

    onCancelHandler() {
        this.iniViewState();
        if (this.formData && this.formGroup) {
            this.formGroup.setValue(this.formData);
        }
        this.formCancel.emit();
    }

    iniViewState() {
        this.componentState = PageState.VIEW;
    }

    isDisabled(name: string) {
        if (this.componentState === PageState.CREATE) {
            return false;
        }
        return this.componentState !== PageState.EDIT || this.disabledFields.includes(name);
    }
}
