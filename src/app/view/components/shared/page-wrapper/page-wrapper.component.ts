import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-wrapper',
    templateUrl: './page-wrapper.component.html',
    styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent implements OnInit {

    @Input() title: string;
    @Input() titleColor = '#FFFFFF';
    @Input() backgroundColor = '#101024';

    dropShadow = true;
    @Input()
    set shadow(value: string) {
        this.dropShadow = value !== 'false';
    }

    constructor() {
    }

    ngOnInit() {

    }

    containerStyle() {
        const dropShadow = this.dropShadow ? 'mat-elevation-z8' : '';

        return `${dropShadow}`;
    }

    backButtonHandler() {

    }
}
