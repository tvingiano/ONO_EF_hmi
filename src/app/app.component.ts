import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SPINNER} from 'ngx-ui-loader';
import {SvgIconsService} from './service/helper/svg-icons.service';
import {AuthenticationService} from './service/authentication.service';
import { OnoApiService } from './service/ono-api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    spinner = SPINNER;

    constructor(
        private translate: TranslateService,
        private svgIconsService: SvgIconsService,
        private auth: AuthenticationService,
        private ono: OnoApiService,
    ) {
        /* init i18n module */
        translate.setDefaultLang(localStorage.getItem('userLocale') || 'en');
        if (this.isAuth() === true) {
            this.ono.whoami().subscribe(x => {
            });
        }

    }

    isAuth() {
        return !!this.auth.currentUserValue;
    }
}
