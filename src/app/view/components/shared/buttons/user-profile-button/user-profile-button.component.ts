import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../../model/user';

@Component({
    selector: 'app-user-profile-button',
    templateUrl: './user-profile-button.component.html',
    styleUrls: ['./user-profile-button.component.scss']
})
export class UserProfileButtonComponent implements OnInit {

    @Input() userInfo: User;

    constructor() {
    }

    ngOnInit() {
    }

}
