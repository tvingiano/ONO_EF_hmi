import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {OnoApiService} from './ono-api.service';
import {ProfilesInfo} from '../model/system/ProfilesInfo';

@Injectable({
    providedIn: 'root'
})
export class ProfilesService {
    private _profilesSubject: BehaviorSubject<ProfilesInfo[]>;

    constructor(
        private ono: OnoApiService,
    ) {
        this._profilesSubject = new BehaviorSubject<ProfilesInfo[]>(JSON.parse(localStorage.getItem('profilesList')));
    }

    public get profilesSubject(): BehaviorSubject<ProfilesInfo[]> {
        return this._profilesSubject;
    }

    public get profiles(): ProfilesInfo[] {
        return this._profilesSubject.value;
    }

    public set profiles(profilesInfos: ProfilesInfo[]) {
        localStorage.setItem('profilesList', JSON.stringify(profilesInfos));
        this._profilesSubject.next(profilesInfos);
    }

    public retrieveProfiles() {
        return this.ono.profilesGet().pipe(
            map((profilesInfos: ProfilesInfo[]) => {
                this.profiles = profilesInfos;
                return profilesInfos;
            })
        );
    }

    public removeProfiles() {
        this._profilesSubject.next(null);
        localStorage.removeItem('profilesList');
    }
}
