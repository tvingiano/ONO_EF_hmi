import {Injectable} from '@angular/core';
import _ from 'lodash';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(
        private uiLoaderService: NgxUiLoaderService,
    ) {
    }

    isEqual(value, other) {
        return _.isEqual(value, other);
    }

    getDirtyValues(form: any): object {
        const dirtyValues = {};

        Object.keys(form.controls).forEach(key => {
                const currentControl = form.controls[key];
                if (currentControl.dirty) {
                    dirtyValues[key] = currentControl.controls ? this.getDirtyValues(currentControl) : currentControl.value;
                }
            }
        );

        return dirtyValues;
    }

    showLoader(id?: string) {
        this.uiLoaderService.start(id);
    }

    hideLoader(id?: string) {
        this.uiLoaderService.stop(id);
    }
}
