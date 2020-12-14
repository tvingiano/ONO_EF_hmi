import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationService} from '../service/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UtilsService} from '../service/helper/utils.service';
import { BusyService } from '../service/busy.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private snackBar: MatSnackBar,
        private utilsService: UtilsService,
        private busyService: BusyService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // console.log('intercepted request => ', request);

        const API_HOST_URL = 'http://192.168.60.3:8000';

        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
            }

            const error = err.statusText || err.message || err.error && err.error.message || 'Unexpected error occurred!';

            this.snackBar.open(error, undefined, {
                panelClass: ['errorSnackbar']
            });

            this.utilsService.hideLoader();

            if (request.url === `${API_HOST_URL}/login`) {
                request.clone();
            }

            if (
                   request.url === `${API_HOST_URL}/sendtest`
                || request.url === `${API_HOST_URL}/sendexternal`
                || request.url === `${API_HOST_URL}/refillMeasure`
                || request.url === `${API_HOST_URL}/totalRefill`
                || request.url === `${API_HOST_URL}/sprayroutine`
                || request.url === `${API_HOST_URL}/ebbAndFlow`
                ) { // chechk if this request has been made from drawer api

                // console.log('@@ => ', err,  error);

                this.busyService.inactiveDrawerState({Code: err.status, Response: err.statusText});
            }

            if (
                request.url === `${API_HOST_URL}/tankquantity`
                || request.url === `${API_HOST_URL}/suction`
                || request.url === `${API_HOST_URL}/transfer`
                || request.url === `${API_HOST_URL}/addwater`
                || request.url === `${API_HOST_URL}/measure`
                || request.url === `${API_HOST_URL}/purge`
                || request.url === `${API_HOST_URL}/measuringtankclean`
                || request.url === `${API_HOST_URL}/cleanfilter`
                || request.url === `${API_HOST_URL}/totalclean`
                || request.url === `${API_HOST_URL}/deleterefill`
                || request.url === `${API_HOST_URL}/spray`
                || request.url === `${API_HOST_URL}/addozonatedwater`
                || request.url === `${API_HOST_URL}/refillboot`
                || request.url === `${API_HOST_URL}/refillsettings`
                || request.url === `${API_HOST_URL}/cartadd`
                || request.url === `${API_HOST_URL}/cartquantity`
                || request.url === `${API_HOST_URL}/cartpurge`
                || request.url === `${API_HOST_URL}/cartserve`
            ) {
                this.busyService.inactiveRefillStateTest({Code: err.status, Response: err.statusText});
            }

            return throwError(`Error: ${error}`);
        }));
    }
}
