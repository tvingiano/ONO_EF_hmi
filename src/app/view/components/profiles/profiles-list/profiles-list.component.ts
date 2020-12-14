import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfilesInfo} from '../../../../model/system/ProfilesInfo';
import {OnoApiService} from '../../../../service/ono-api.service';
import {UtilsService} from '../../../../service/helper/utils.service';
import {ProfilesService} from '../../../../service/profiles.service';

@Component({
    selector: 'app-profiles-list',
    templateUrl: './profiles-list.component.html',
    styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements OnInit {
    private _showTitle = true;
    @Input()
    set showTitle(value) {
        this._showTitle = value === 'true';
    }

    @Output() profileSelect: EventEmitter<ProfilesInfo> = new EventEmitter<ProfilesInfo>();
    profilesList: ProfilesInfo[];
    selectedProfile: ProfilesInfo;

    constructor(
        private ono: OnoApiService,
        private utils: UtilsService,
        private profilesService: ProfilesService
    ) {
    }

    ngOnInit() {
        this.utils.showLoader();

        this.profilesService.retrieveProfiles().subscribe(value => {
            this.profilesList = value;
            this.utils.hideLoader();
        });
    }

    profileButtonHandler(value: ProfilesInfo) {
        this.selectedProfile = value;
        this.profileSelect.emit(value);
    }
}
