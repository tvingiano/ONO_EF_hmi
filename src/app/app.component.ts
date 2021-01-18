import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SPINNER} from 'ngx-ui-loader';
import {SvgIconsService} from './service/helper/svg-icons.service';
import {AuthenticationService} from './service/authentication.service';
import { OnoApiService } from './service/ono-api.service';
import { UrlService } from './service/url.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    spinner = SPINNER;

    constructor(
        private translate: TranslateService,
        private svgIconsService: SvgIconsService,
        private auth: AuthenticationService,
        private ono: OnoApiService,
        private router: Router,
        private urlService: UrlService,
    ) {
        /* init i18n module */
        translate.setDefaultLang(localStorage.getItem('userLocale') || 'en');
        if (this.isAuth() === true) {
            this.ono.whoami().subscribe(x => {
            });
        }

    }

    ngOnInit() {
        this.trackUrl();
    }

    isAuth() {
        return !!this.auth.currentUserValue;
    }

    trackUrl() {
        this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
            this.urlService.history.push(event.url);
        });
    }
}
