import {Component, OnInit} from '@angular/core';
import {FormPageComponent} from '../../../../components/shared/form-page/form-page.component';
import {AREA_TYPES, ArrayType, SlotInfo} from '../../../../../model/system/SlotInfo';
import {ActivatedRoute} from '@angular/router';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {FormBuilder, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {PageState} from '../../../../../model/page-state.enum';
import {SystemComponent} from '../../../../../model/system/system-component.enum';
import {RACK_SIDES, RackSide} from '../../../../../model/system/RackInfo';
import {LampInfo} from '../../../../../model/system/LampInfo';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-slot-info',
    templateUrl: './slot-info.component.html',
    styleUrls: ['./slot-info.component.scss']
})
export class SlotInfoComponent extends FormPageComponent implements OnInit {

    rackSides: RackSide[] = RACK_SIDES;
    areaTypes: ArrayType[] = AREA_TYPES;
    lightConfigurations: LampInfo[];
    formData: SlotInfo;

    constructor(
        private activatedRoute: ActivatedRoute,
        private ono: OnoApiService,
        private formBuilder: FormBuilder,
        private utils: UtilsService,
    ) {
        super();
    }

    ngOnInit() {
        const {system, module, rack, slotName} = this.activatedRoute.snapshot.queryParams;
        this.utils.showLoader();
        this.ono.getSystemComponentInfo<SlotInfo>(
            [system, module, rack, SystemComponent.SLOTS, slotName]
        ).pipe(
            switchMap(
                value => {
                    this.formData = value;
                    return this.ono.lampsGet();
                }
            )
        ).subscribe(
            value => {
                this.utils.hideLoader();
                this.lightConfigurations = value;
                this.onDataReady();
            }
        );
    }

    initFormGroup() {
        this.formGroup = this.formBuilder.group(
            {
                System: [this.formData.System, Validators.required],
                Module: [this.formData.Module, Validators.required],
                Rack: [this.formData.Rack, Validators.required],
                Slotname: [this.formData.Slotname, Validators.required],
                Slotstatus: [this.formData.Slotstatus, Validators.required],
                Area: [this.formData.Area, Validators.required],
                LightConfiguration: [this.formData.LightConfiguration, Validators.required],
                LampsNumber: [this.formData.LampsNumber, Validators.required],
                Height: [this.formData.Height, Validators.required],
                RackSide: [this.formData.RackSide, Validators.required],

                Owner: [this.formData.Owner, Validators.required],
                Description: [this.formData.Description, Validators.required],
                Note: [this.formData.Note],
                Tag: [this.formData.Tag],
                Timestamp: [this.formData.Timestamp],
            }
        );

        this.iniViewState();
        this.formGroup.valueChanges.subscribe(value => {
            this.dirty = !this.utils.isEqual(this.formData, this.formGroup.getRawValue());
        });
    }

    onSaveHandler() {
        this.utils.showLoader();

        this.ono.putSystemComponentInfo<SlotInfo>(
            [this.formData.System, this.formData.Module, this.formData.Rack, SystemComponent.SLOTS, this.formData.Slotname],
            this.utils.getDirtyValues(this.formGroup)
        ).subscribe(
            value => {
                this.componentState = PageState.VIEW;
                this.utils.hideLoader();
            }
        );
    }

}
