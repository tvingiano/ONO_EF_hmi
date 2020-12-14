import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../service/authentication.service';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input() title: string;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private ngxService: NgxUiLoaderService,
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
    }

    isUserAuth() {
        return this.authService.currentUserValue;
    }

    logOut() {
        this.ngxService.start();
        this.authService.logout();
    }

    goToProfile() {
        this.router.navigate(['profile']);
    }

    switchLocalization(lang: string) {
        this.ngxService.start();
        this.translate.use(lang).subscribe(v => {
            this.ngxService.stop();
        });
        localStorage.setItem('userLocale', lang);
    }
}
