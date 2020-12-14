import {Component, OnInit} from '@angular/core';
import {ProfilesInfo} from '../../../../../model/system/ProfilesInfo';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-profile-create',
    templateUrl: './profile-create.component.html',
    styleUrls: ['./profile-create.component.scss']
})
export class ProfileCreateComponent implements OnInit {

    private profileInfo: ProfilesInfo;

    constructor(
        private onoApiService: OnoApiService,
        private router: Router,
        private utilsService: UtilsService
    ) {
    }

    ngOnInit() {
        this.profileInfo = new ProfilesInfo();
    }

    onFormSubmit(profileForm: FormGroup) {
        this.utilsService.showLoader();
        this.onoApiService.profilesPost(profileForm.getRawValue()).subscribe(
            ({Code}) => {
                if (Code === 200) {
                    this.utilsService.hideLoader();
                    this.router.navigate(['settings', 'users']);
                }
            }
        );
    }

    onProfileSelect(value: ProfilesInfo) {
        this.profileInfo = value;
    }

}
