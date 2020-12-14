import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../model/user';
import { OnoApiService } from './ono-api.service';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { CurrentUserService } from './current-user.service';
import { ProfilesService } from './profiles.service';
import { PrivacyService } from './privacy.service';
import { UtilsService } from 'src/app/service/helper/utils.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements Resolve<User> {

    private currentTokenSubject: BehaviorSubject<string>;

    private tokenExpireTime(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return expiry;
      }

    constructor(
        private ono: OnoApiService,
        private currentUserService: CurrentUserService,
        private profilesService: ProfilesService,
        private privacyService: PrivacyService,
        private router: Router,
        private utilsService: UtilsService
    ) {

        this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token'));

    }

    public get currentUserValue(): User {
        return this.currentUserService.currentUser;
    }

    public get currentTokenValue(): string {
        return this.currentTokenSubject.value;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.ono.login({ username, password }).pipe(
            map(({ body: { Code, Token } }) => {
                if (Code === 200) {
                    localStorage.setItem('token', JSON.stringify(Token));
                    this.currentTokenSubject.next(Token);
                    this.router.navigateByUrl('completeddashboard');
                    this.startRefreshCountdown();
                }
                return Token;
            }),
            /* retrieve current user */
            switchMap(() => this.currentUserService.retrieveUser()),
            /* retrieve profiles */
            switchMap(() => this.profilesService.retrieveProfiles()),
            switchMap(() => of(true))
        );
    }

    logout() {
        this.currentUserService.removeCurrentUser();
        this.currentTokenSubject.next(null);
        this.profilesService.removeProfiles();
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        this.utilsService.hideLoader();
    }

    refresh() {
        this.ono.refresh().subscribe(v => {
            if (v['Code'] === 200) {
                // console.log('ok, new token: ', v);
                localStorage.setItem('token', v['Token']);
                this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token'));
            } else {
                this.logout();
            }
        });
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User {
        return this.currentUserValue;
    }

    startRefreshCountdown() {

        const N = 240;
        // seconds in which it checks if user is still logged in
        // checks if the user is still connected and than refresh the token OR send user to login again EVERY N seconds
        setTimeout(_ => {
            this.ono.whoami().subscribe(x => {
                // console.log(x);
                if (x) {
                    // console.log('refresh?');
                    this.refresh();
                    this.startRefreshCountdown();
                } else {
                    // this.logout();
                }
            });
        }, N * 1000);
    }

}
