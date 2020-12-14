import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PrivacyService} from 'src/app/service/privacy.service';

@Injectable({
    providedIn: 'root'
})
export class PrivacyGuard implements CanActivate {
    constructor(
        private privacyService: PrivacyService
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.privacyService.checkAccess(next.routeConfig.path);
    }
}
