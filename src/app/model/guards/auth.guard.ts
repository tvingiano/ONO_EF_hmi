import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {OnoApiService} from '../../service/ono-api.service';
import { User } from '../../model/user';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    errors: User;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private ono: OnoApiService

    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        var me = this;
        this.ono.whoami().subscribe(
            error => me.errors = error
          );
        if (currentUser && me.errors) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
