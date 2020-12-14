import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../model/user';
import {ProfilesInfo} from '../../../model/system/ProfilesInfo';
import {OnoApiService} from '../../../service/ono-api.service';
import {UtilsService} from '../../../service/helper/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserPageMode} from '../../../model/user-page-mode.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AuthenticationService} from '../../../service/authentication.service';

enum PAGE_STATES {
    EDIT = 0,
    VIEW = 1,
    PUBLISH = 2,
    CREATE = 3,
}

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    states = PAGE_STATES;
    state = PAGE_STATES.VIEW;
    dirty = false;

    usersFormGroup: FormGroup;
    users: User[];
    usersCache: User[];
    _profileInfo: ProfilesInfo;
    title = 'Users list:';


    @Output() userSelect: EventEmitter<User> = new EventEmitter<User>();
    selectedUser: User;

    @Input()
    set profileInfo(value: ProfilesInfo) {
        if (value) {
            this._profileInfo = value;
            this.applyFilter(value.Name);
        }

    }

    get profileInfo(): ProfilesInfo {
        return this._profileInfo;
    }

    constructor(
        private auth: AuthenticationService,
        private ono: OnoApiService,
        private uiLoaderService: NgxUiLoaderService,
        private utils: UtilsService,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.utils.showLoader();
        this.uiLoaderService.start();
        this.ono.usersGet()
            .subscribe(
                value => {
                    this.usersCache = value;
                    this.users = value;

                    this.selectedUser = value[0];
                    this.initUserForm(this.usersCache[0]);

                    this.uiLoaderService.stop();
                }
            );
    }

    initUserForm(usersData) {
        if (!usersData) {
            return;
        }

        this.usersFormGroup = this.formBuilder.group(
            {
                Username: [{value: `${usersData.Username}`, disabled: !this.isEditState}, [Validators.required]],
                Email: [{value: `${usersData.Email}`, disabled: !this.isEditState}, [Validators.required, Validators.email]],
                // tslint:disable-next-line:max-line-length
                Password: [{
                    value: `${usersData.Password}`,
                    disabled: !this.isEditState
                }, [Validators.required, Validators.minLength(8)]],
                FirstName: [{value: `${usersData.FirstName}`, disabled: !this.isEditState}, [Validators.required]],
                LastName: [{value: `${usersData.LastName}`, disabled: !this.isEditState}, [Validators.required]],
                Profiles: [{value: `${usersData.Profiles}`, disabled: !this.isEditState}, []],
            }
        );

        this.usersFormGroup.valueChanges.subscribe(value => {
            this.dirty = !this.utils.isEqual(usersData, value);
        });
    }

    updateUserForm(key) {
        this.usersFormGroup.reset(key || new User());
    }

    selectUserHandler(value: User) {
        this.selectedUser = value;
        this.updateUserForm(value);

        this.userSelect.emit(value);
    }

    onSubmit() {

    }

    getFullName(key) {
        return `${key.FirstName} ${key.LastName}`;
    }

    getProfile(key) {
        return `${key.Profiles}`;
    }

    get isEditState() {
        return this.state === PAGE_STATES.EDIT;
    }

    onEditHandler(value: User) {
        this.router.navigate(['user', 'edit'], {queryParams: {mode: UserPageMode.EDIT, userID: value.Username}});
    }

    onCreateHandler() {
        this.router.navigate(['user', 'edit'], {queryParams: {mode: UserPageMode.CREATE}});
    }

    applyFilter(filterValue: string) {
        this.users = this.usersCache.filter(value => value.Profiles.includes(filterValue));
        this.selectUserHandler(this.users[0]);
    }
}
