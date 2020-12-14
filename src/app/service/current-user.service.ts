import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../model/user';
import {map} from 'rxjs/operators';
import {OnoApiService} from './ono-api.service';

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {
    private _currentUserSubject: BehaviorSubject<User>;

    constructor(
        private ono: OnoApiService
    ) {
        this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    }

    public get currentUser(): User {
        return this._currentUserSubject.value;
    }

    public set currentUser(user: User) {
        if (!this.currentUser || user && user.Username === this.currentUser.Username) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this._currentUserSubject.next(user);
        }
    }

    public retrieveUser() {
        return this.ono.whoami().pipe(
            map((user: User) => {
                this.currentUser = user;
                return user;
            })
        );
    }

    public removeCurrentUser() {
        this._currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
    }
}
