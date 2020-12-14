import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnoApiService} from '../../../service/ono-api.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {map, switchMap} from 'rxjs/operators';
import {UtilsService} from '../../../service/helper/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserPageMode} from '../../../model/user-page-mode.enum';
import {ProfilesInfo} from '../../../model/system/ProfilesInfo';
import {ISystemRegistry} from '../../../model/interface/ISystemRegistry';
import {of} from 'rxjs';
import {CurrentUserService} from '../../../service/current-user.service';
import {PrivacyService} from '../../../service/privacy.service';

enum PAGE_STATES {
    EDIT = 0,
    VIEW = 1,
    PUBLISH = 2,
    CREATE = 3,
}

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss'],
    providers: []
})

export class UserPageComponent implements OnInit {
    states = PAGE_STATES;
    state = PAGE_STATES.VIEW;

    userFormGroup: FormGroup;
    user: User;
    cacheUser: User;
    userProfiles: ProfilesInfo[];
    systems: ISystemRegistry[];

    dirty = false;
    loadedData;

    constructor(
        private ono: OnoApiService,
        private formBuilder: FormBuilder,
        private uiLoaderService: NgxUiLoaderService,
        private utils: UtilsService,
        private route: ActivatedRoute,
        private router: Router,
        private currentUserService: CurrentUserService,
        private privacyService: PrivacyService
    ) {

    }

    ngOnInit() {
        this.loadedData = false;
        this.utils.showLoader();
        of(null)
            .pipe(
                /* get profiles list*/
                switchMap(_ => {
                    return this.ono.profilesGet();
                }),
                map(value => {
                    this.userProfiles = value;
                    return true;
                }),
                /* get systems list*/
                switchMap(_ => {
                    return this.ono.systemRegistryListGet();
                }),
                map(value => {
                    this.systems = value;
                    return true;
                })
            )
            .subscribe(value => {
                value && this.getUserInfo();
                this.utils.hideLoader();
                this.loadedData = true;
            });
    }

    getUserInfo() {
        const {mode, userID} = this.route.snapshot.queryParams;

        if (mode) {
            if (mode === UserPageMode.EDIT) {
                this.state = PAGE_STATES.VIEW;
                this.uiLoaderService.start();
                /* getting profiles list and user info */
                this.ono.userGet(userID)
                    .subscribe(value => {
                        this.cacheUser = value;
                        this.user = Object.assign({}, this.cacheUser);
                        this.initUserForm();
                        this.uiLoaderService.stop();
                        this.setEditState();
                    });
            } else if (mode === UserPageMode.CREATE) {
                this.cacheUser = new User();
                this.user = Object.assign({}, this.cacheUser);
                this.initUserForm();
                this.setCreateState();
            }
        } else {
            this.cacheUser = this.currentUserService.currentUser;
            this.user = Object.assign({}, this.cacheUser);
            this.initUserForm();
        }
    }

    initUserForm() {
        this.userFormGroup = this.formBuilder.group(
            {
                Username: [this.user.Username, [Validators.required]],
                Email: [this.user.Email, [Validators.required, Validators.email]],
                Password: [this.user.Password, [Validators.required, Validators.minLength(8)]],
                FirstName: [this.user.FirstName, [Validators.required]],
                LastName: [this.user.LastName, [Validators.required]],
                Telephone: [this.user.Telephone, [Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
                Group: [this.user.Group, []],
                Organization: [this.user.Organization, []],
                DateOfBirth: [this.user.DateOfBirth, []],
                Profiles: [this.userProfiles, [Validators.required]],
                Systems: [this.systems, [Validators.required]],
                Description: [this.user.Description, []],
                Note: [this.user.Note, []],
                StandardCost: [this.user.StandardCost, []],
                StandardSchedule: [this.user.StandardSchedule, []],
                OvertimeCost: [this.user.OvertimeCost, []],
                OvertimeSchedule: [this.user.OvertimeSchedule, []],
                Skill: [this.user.Skill, []],
                Tag: [this.user.Tag, []],
                Cap: [this.user.Cap, []],
                City: [this.user.City, []],
                State: [this.user.State, []],
                Street: [this.user.Street, []],
                Timestamp: [this.user.Timestamp, []],
                Language: [this.user.Language, []],
                Location: [this.user.Location, []],
            }
        );

        this.userFormGroup.valueChanges.subscribe(value => {
            this.dirty = !this.utils.isEqual(this.user, this.userFormGroup.getRawValue());
        });
    }

    onSubmit() {

    }

    getFullName() {
        return `${this.user.FirstName || 'User'} ${this.user.LastName || 'Name'}`;
    }

    getAddress() {
        return `${this.user.City || ''}, ${this.user.State || ''}`;
    }

    setEditState() {
        this.state = PAGE_STATES.EDIT;
    }

    setViewState() {
        this.state = PAGE_STATES.VIEW;
    }

    setCreateState() {
        this.state = PAGE_STATES.CREATE;
    }

    onCancelHandler() {
        this.state = PAGE_STATES.VIEW;

        this.user = Object.assign({}, this.cacheUser);
    }

    /* update user*/
    saveUserData() {
        this.state = PAGE_STATES.VIEW;
        this.uiLoaderService.start();

        this.ono.userPut(this.user.Username, this.utils.getDirtyValues(this.userFormGroup)).pipe(
            switchMap(() => {
                if (this.user.Username === this.currentUserService.currentUser.Username) {
                    return this.currentUserService.retrieveUser();
                } else {
                    return this.ono.userGet(this.user.Username);
                }
            })
        ).subscribe(value => {
            this.state = PAGE_STATES.VIEW;
            this.userFormGroup.disable();
            this.uiLoaderService.stop();
            this.currentUserService.currentUser = value;
            this.userFormGroup.patchValue(value);
        }, error => {
            this.state = PAGE_STATES.VIEW;
            this.userFormGroup.disable();
            this.uiLoaderService.stop();
        });
    }

    /* redirect to users list page */
    createButtonHandler() {
        if (this.userFormGroup.valid) {
            const value = this.userFormGroup.value;

            this.ono.userPost(value).subscribe(_ => {
                this.router.navigate(['settings', 'users']);
            });
        }
    }

    isEditState() {
        return this.state !== this.states.EDIT && this.state !== this.states.CREATE;
    }
}
