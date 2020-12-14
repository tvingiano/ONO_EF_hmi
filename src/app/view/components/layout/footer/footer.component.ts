import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    currentDate: Date = new Date();

    constructor(
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
    }

    switchLocalization(lang: string) {
        this.translate.use(lang);
        localStorage.setItem('userLocale', lang);
    }
}
