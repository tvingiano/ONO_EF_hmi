import {Component, OnChanges, OnInit} from '@angular/core';
import {User} from '../../../../model/user';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {CurrentUserService} from 'src/app/service/current-user.service';
import {AuthenticationService} from '../../../../service/authentication.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { OnoApiService } from 'src/app/service/ono-api.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
    animations: [
        trigger(
          'CollapseAnimation',
          [
            transition(
              ':enter',
              [
                style({ opacity: 0 }),
                animate('1s ease-out',
                        style({ opacity: 1}))
              ]
            ),
            transition(
              ':leave',
              [
                style({ opacity: 1 }),
                animate('400ms ease-in',
                        style({ opacity: 0 }))
              ]
            )
          ]
        )
      ]
})
export class SideBarComponent implements OnInit {

    private user: User;

    currentTab = undefined;
    currentSub = undefined;

    BUTTONS: any = [
        {
            link: '/',
            icon: 'dashboard',
            title: 'Dashboards',
            role: ['Admin', 'Agronomist'],
            color: '#a434eb',
            sub: [
                {
                    link:  '/',
                    icon:  'home',
                    title: 'Main',
                    role: ['Admin', 'Agronomist'],
                },
                {
                    link:  '/consumptiondashboard',
                    icon:  'track_changes',
                    title: 'Consumption',
                    role: ['Admin'],
                }, {
                    link: '/alarms',
                    icon:  'build',
                    title: 'Maintainance',
                    role: ['Admin'],
                }, {
                    link: '/runningprocesses',
                    icon:  'flare',
                    title: 'Processes',
                    role: ['Admin'],
                }, {
                    link: '/completeddashboard',
                    icon:  'business',
                    title: 'History',
                    role: ['Admin', 'Agronomist'],
                }, {
                    link: '/serverstatus',
                    icon:  'extension',
                    title: 'Server',
                    role: ['Admin'],
                }
            ]
        }, {
            link: '/processes/manage',
            icon:  'spa',
            title: 'Processes',
            color: '#eb3446',
            role: ['Admin', 'Agronomist'],
            sub: [
                {   link: '/processes/manage',
                    icon:  'track_changes',
                    title: 'Running',
                    role: ['Admin', 'Agronomist'],
                }, {
                    link: '/processes/new',
                    icon:  'add_circle_outline',
                    title: 'New',
                    role: ['Admin'],
                },
            ]
        }, {
            link: '',
            icon:  'eco',
            title: 'Experiments',
            color: '#eba234',
            role: ['Admin', 'Agronomist'],
            sub: [
                {   link: '/processes/survey',
                    icon:  'business',
                    title: 'New',
                    role: ['Admin', 'Agronomist'],
                }, {
                    link: '/processes/details',
                    icon:  'extension',
                    title: 'History',
                    role: ['Admin', 'Agronomist'],
                }, {
                    link: '/processes/todo',
                    icon:  'calendar_today',
                    title: 'Calendar',
                    role: ['Admin', 'Agronomist'],
                }
            ]

        }, {
            link: '',
            icon:  'book',
            title: 'Recipes',
            color: '#ebe834',
            role: ['Admin', 'Agronomist'],
            sub: [
                {
                    link: '/recipes/selector',
                    icon:  'book',
                    title: 'List',
                    role: ['Admin', 'Agronomist'],
                },
                {
                    link: '/recipes/editor',
                    icon:  'editor',
                    title: 'Editor',
                    role: ['Admin', 'Agronomist'],
                }
            ]
        }, {
            link: '/orders',
            icon:  'filter_frames',
            title: 'Orders',
            color: '#7aeb34',
            role: ['Admin'],
            sub: [
                {
                    link: '/new-orders',
                    icon:  'fingerprint',
                    title: 'test new',
                    role: ['Admin'],
                }, {
                    link: '/',              // <--- needs to be done: easy interface for agronomists
                    icon: 'fingerprint',
                    title: 'orders ez',
                    role: ['Admin', 'Agronomist'],
                }
            ],
        }, {
            link: '',
            icon:  'settings_applications',
            title: 'Configuration',
            color: '#34ebd0',
            role: ['Admin'],
            sub: [
                {
                    link: '/configuration/led',
                    icon:  'highlight',
                    title: 'LEDs',
                    role: ['Admin'],
                }, {
                    link: '/configuration/air',
                    icon:  'ac_unit',
                    title: 'Ac',
                    role: ['Admin'],
                }, {
                    link: '/configuration/drawers',
                    icon:  'move_to_inbox',
                    title: 'Drawers',
                    role: ['Admin'],
                }, {
                    link: '/configuration/shutter',
                    icon:  'line_weight',
                    title: 'Shutters',
                    role: ['Admin'],
                }
            ]
        }, {
            link: '',
            icon:  'flare',
            title: 'Test',
            color: '#34b1eb',
            role: ['Admin'],
            sub: [
                {
                    link: '/test/stress',
                    icon:  'gavel',
                    title: 'Stress',
                    role: ['Admin'],
                }, {
                    link: '/test/refill',
                    icon:  'local_gas_station',
                    title: 'Refill',
                    role: ['Admin'],
                }, {
                    link: '/test/simple',
                    icon:  'open_with',
                    title: 'Movements',
                    role: ['Admin'],
                }
            ]
        }, {
            link: '',
            icon:  'apps',
            title: 'Settings',
            color: '#3446eb',
            role: ['Admin', 'Agronomist'],
            sub: [
                {
                    link: '/settings/system',
                    icon:  'grid_on',
                    title: 'System',
                    role: ['Admin'],
                }, {
                    link: '/settings/registries',
                    icon:  'account_tree',
                    title: 'Registries',
                    role: ['Admin', 'Agronomist'],
                }, {
                    link: '/settings/users',
                    icon:  'people_alt',
                    title: 'Profiles',
                    role: ['Admin'],
                }
            ]
        },
        // {
        //     link: '/demo',
        //     icon:  'casino',
        //     title: 'Demo',
        //     color: '#3C0D0D',
        //     sub: []
        // },
    ];


    constructor(
        private currentUserService: CurrentUserService,
        private authService: AuthenticationService,
        private ngxService: NgxUiLoaderService,
        private ono: OnoApiService,
    ) {
        this.user = this.currentUserService.currentUser;
    }

    ngOnInit() {

        

        let i = 0;

        this.BUTTONS.map(but => {
            // New properties to be added
            const newPropsObj = {
              id: i++,
              open: false
            };
            // Assign new properties and return
            return Object.assign(but, newPropsObj);
          });


        i = 0;

        this.BUTTONS.forEach(ele => {
            ele.sub.map(x => {
                // New properties to be added
                const newPropsObj = {
                    id: i++,
                    open: false
                };
                // Assign new properties and return
                return Object.assign(x, newPropsObj);
            });
        });


    }

    getFullName() {
        return `${this.user.FirstName} ${this.user.LastName}`;
    }

    logOut() {
        this.ngxService.start();
        this.authService.logout();
    }

    toggleTab(id) {
        this.BUTTONS.find(x => x.id === id).open = !this.BUTTONS.find(x => x.id === id).open;
    }
    isActiveTab(id) {
        return this.BUTTONS.find( x => x.id === id).open;
        // return this.currentTab === id;
    }

    setActiveSub(id) {
        this.currentSub = id;
    }
    isActiveSub(id) {
        return this.currentSub === id;
    }

    getBorderLeft(x) {
        return 'border-left: solid 10px ' + x.color;
    }

    test() {
        console.log(this.BUTTONS);
    }

    getProcess() {
        this.ono.infoprocess().subscribe(x => {
        });
        this.ono.images().subscribe(x => {
        });
    }

    canAccessRoute(userProfiles, authorizedProfiles) {


        let access = false;

        userProfiles.forEach(p => {
            if (authorizedProfiles.includes(p)) {
                access = true;
            }
        });
        return access;
    }

}
