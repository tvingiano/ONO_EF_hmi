import {Injectable} from '@angular/core';
import {ProfilesService} from './profiles.service';
import {PrivacyMap, PrivacyMapEntity, PrivacyMapEntityType} from '../model/privacy-map';
import {CurrentUserService} from './current-user.service';
import {ProfilesInfo} from '../model/system/ProfilesInfo';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class PrivacyService {

    private _privacyMap = PrivacyMap;
    private _currentUserProfiles: ProfilesInfo[] = [];

    constructor(
        private currentUserService: CurrentUserService,
        private profilesService: ProfilesService,
        private snackBar: MatSnackBar,
    ) {
        this.profilesService.profilesSubject.subscribe(value => {
                if (!value) {
                    return;
                }
                this._currentUserProfiles = value
                    .filter(profileInfo => this.currentUserService.currentUser.Profiles.includes(profileInfo.Name));
            }
        );
    }

    checkAccess(path: string) {
        for (const [key, value] of this._privacyMap) {
            if (path === key) {
                for (const accessParam of value) {
                    const paramData: PrivacyMapEntity = accessParam;
                    if (paramData.type === PrivacyMapEntityType.PROFILE_PARAM) {
                        // tslint:disable-next-line:prefer-for-of
                        for (let i = 0; i < this._currentUserProfiles.length; i++) {
                            const currentUserProfile = this._currentUserProfiles[i];
                            if (currentUserProfile[paramData.value] !== undefined && currentUserProfile[paramData.value]) {
                                return true;
                            }
                        }
                    }
                    if (paramData.type === PrivacyMapEntityType.PROFILE_NAME) {
                        // tslint:disable-next-line:prefer-for-of
                        for (let i = 0; i < this._currentUserProfiles.length; i++) {
                            if (this._currentUserProfiles[i].Name === paramData.value) {
                                return true;
                            }
                        }
                    }
                }
            }
        }

        this.snackBar.open('Access Denied', undefined, {
            panelClass: ['danger-color']
        });
        return false;
    }

    isAdmin() {
        if (!this.currentUserService.currentUser) {
            return false;
        }

        return this.currentUserService.currentUser.Profiles.includes('Admin');
    }
}
