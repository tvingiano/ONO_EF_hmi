import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

import {User} from '../model/user';

const mockUsers = localStorage.getItem('users.mock');

const users: User[] = mockUsers ? JSON.parse(mockUsers) : [
    {
        Username: 'admin',
        Password: 'admin2019',
        Profiles: ['Admin'],
        Systems: [],
        StandardCost: 0,
        StandardSchedule: '',
        DateOfBirth: '',
        Description: '',
        OvertimeCost: 0,
        OvertimeSchedule: '',
        Skill: '',
        FirstName: 'Marioz',
        LastName: 'Rossiz',
        Email: 'm.r@onoef.com',
        Telephone: '',
        Organization: 'Ono',
        Group: '',
        Note: '',
        Tag: '',
        Timestamp: '',
        Street: 'Via Garibaldis',
        City: 'Verona',
        State: 'Italy',
        Cap: '00000',
        Language: 'IT',
    },
    {
        Username: 'farmer',
        Password: 'farmer2019',
        Profiles: ['Farmer'],
        Systems: [],
        StandardCost: 0,
        StandardSchedule: '',
        DateOfBirth: '',
        Description: '',
        OvertimeCost: 0,
        OvertimeSchedule: '',
        Skill: '',
        FirstName: 'Marioz',
        LastName: 'Rossiz',
        Email: 'm.r@onoef.com',
        Telephone: '',
        Organization: 'Ono Farm',
        Group: '',
        Note: '',
        Tag: '',
        Timestamp: '',
        Street: 'Via Garibaldis',
        City: 'Verona',
        State: 'Italy',
        Cap: '00000',
        Language: 'IT',
    },
];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const {url, method, headers, body} = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                /* USERS */
                /* return all users */
                case url.endsWith('/users') && method === 'GET': {
                    // return ok(users);
                    return next.handle(request);
                }
                /* return user */
                case url.includes('/users/') && method === 'GET': {
                    // return userGET();
                    return next.handle(request);
                }
                /* update user profile */
                case url.includes('/users/') && method === 'PUT': {
                    return next.handle(request);
                }
                /* create new user */
                case url.endsWith('/users') && method === 'POST': {
                    // return userPOST();
                    return next.handle(request);
                }

                /* WHOAMI*/
                /* return user self information */
                case url.endsWith('/whoami') && method === 'GET': {
                    //return ok(users[0]);
                    return next.handle(request);
                }
                // pass through any requests not handled above
                default: {
                    return next.handle(request);
                }
            }
        }

        // tslint:disable-next-line:no-shadowed-variable
        function ok(body?) {
            return of(new HttpResponse({status: 200, body}));
        }

        function error(message) {
            return throwError({error: {message}});
        }

        function unauthorized() {
            return throwError({status: 401, error: {message: 'Unauthorised'}});
        }

        /* fake methods */
        function userGET() {
            const userID = url.split('/').pop();
            const user = users.find(value => value.Username === userID);
            return ok(user);
        }

        function userPUT() {
            const userID = url.split('/').pop();
            const user = users.find(value => value.Username === userID);

            user && Object.assign(user, body);

            localStorage.setItem('users.mock', JSON.stringify(users));
            return ok();
        }

        function userPOST() {
            /* create new empty user */
            const newUser = new User();
            /* update user information from request body */
            Object.assign(newUser, body);
            /* add new user to map */
            users.push(newUser);

            localStorage.setItem('users.mock', JSON.stringify(users));
            return ok();
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
