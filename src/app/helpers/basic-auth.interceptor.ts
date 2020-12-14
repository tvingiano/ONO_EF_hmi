import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../service/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const token = this.authenticationService.currentTokenValue;
        if (token && !request.url.endsWith('/login')) {
            request = request.clone({
                headers: request.headers.set('Authorization', token)
            });
        }

        return next.handle(request);
    }
}
