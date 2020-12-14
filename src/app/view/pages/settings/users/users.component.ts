import {Component, OnInit} from '@angular/core';
import {ProfilesInfo} from '../../../../model/system/ProfilesInfo';
import {User} from 'src/app/model/user';
import {Router} from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    profileInfo: ProfilesInfo;
    user: User;

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    onProfileSelected(value: ProfilesInfo) {
        this.profileInfo = value;
    }

    onUserSelected(value: User) {
        this.user = value;
    }
}
