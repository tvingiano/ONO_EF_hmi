import {Component, OnInit} from '@angular/core';
import {OnoApiService} from '../../../../../service/ono-api.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../../../../service/helper/utils.service';
import {ProfilesInfo} from '../../../../../model/system/ProfilesInfo';
import {FormGroup} from '@angular/forms';
import {ProfileFormFields} from '../../../../components/profiles/profile-form/profile-form.component';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../components/shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

    private profileInfo: ProfilesInfo;
    private disabledFields: Array<ProfileFormFields> = [
        ProfileFormFields.SystemManaging,
        ProfileFormFields.AnomaliesManaging,
        ProfileFormFields.SetupManaging,
        ProfileFormFields.ProductionManaging,
        ProfileFormFields.MaintainanceManaging,
        ProfileFormFields.OperativityManaging,
        ProfileFormFields.OrderManaging,
        ProfileFormFields.Description,
        ProfileFormFields.Note,
    ];

    constructor(
        private onoApiService: OnoApiService,
        private router: Router,
        private utilsService: UtilsService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        // this.profileInfo = new ProfilesInfo();
    }

    onFormSubmit(profileForm: FormGroup) {
        this.utilsService.showLoader();
        this.onoApiService
            .profilesPut(this.profileInfo.Name, this.utilsService.getDirtyValues(profileForm))
            .subscribe(
                value => {
                    this.utilsService.hideLoader();
                    this.router.navigate(['settings', 'users']);
                }
            );
    }

    deleteSelectedProfile() {
        if (this.profileInfo) {

            this.dialog.open(
                ConfirmDialogComponent,
                {
                    data: {
                        title: `Delete profile ${this.profileInfo.Name}?`
                    }
                }
            ).afterClosed().subscribe(
                value => {
                    if (value) {
                        this.onoApiService
                            .profilesDelete(this.profileInfo.Name)
                            .subscribe(
                                _ => {
                                    this.router.navigate(['settings', 'users']);
                                }
                            );
                    }
                }
            );

        }
    }

    onProfileSelect(value: ProfilesInfo) {
        this.profileInfo = value;
    }

}
