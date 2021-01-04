import {Component, OnInit} from '@angular/core';
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
            color: '#a434eb',
            sub: [
                {
                    link:  '/',
                    icon:  'home',
                    title: 'Main',
                },
                {
                    link:  '/consumptiondashboard',
                    icon:  'track_changes',
                    title: 'Consumption',
                }, {
                    link: '/alarms',
                    icon:  'build',
                    title: 'Maintainance',
                }, {
                    link: '/runningprocesses',
                    icon:  'flare',
                    title: 'Processes',
                }, {
                    link: '/completeddashboard',
                    icon:  'business',
                    title: 'History',
                }, {
                    link: '/serverstatus',
                    icon:  'extension',
                    title: 'Server',
                }
            ]
        }, {
            link: '/processes/manage',
            icon:  'spa',
            title: 'Processes',
            color: '#eb3446',
            sub: [
                {   link: '/processes/manage',
                    icon:  'track_changes',
                    title: 'Running',
                }, {
                    link: '/processes/new',
                    icon:  'add_circle_outline',
                    title: 'New',
                },
            ]
        }, {
            link: '',
            icon:  'eco',
            title: 'Experiments',
            color: '#eba234',
            sub: [
                {   link: '/processes/survey',
                    icon:  'business',
                    title: 'New',
                }, {
                    link: '/processes/details',
                    icon:  'extension',
                    title: 'History',
                }, {
                    link: '/processes/todo',
                    icon:  'calendar_today',
                    title: 'Calendar',
                }
            ]

        }, {
            link: '',
            icon:  'book',
            title: 'Recipes',
            color: '#ebe834',
            sub: [
                {
                    link: '/recipes/selector',
                    icon:  'book',
                    title: 'List',
                },
                {
                    link: '/recipes/editor',
                    icon:  'editor',
                    title: 'Editor',
                }
            ]
        }, {
            link: '/orders',
            icon:  'filter_frames',
            title: 'Orders',
            color: '#7aeb34',
            sub: [
                {
                    link: '/new-orders',
                    icon:  'fingerprint',
                    title: 'test new',
                },
            ],
        }, {
            link: '',
            icon:  'settings_applications',
            title: 'Configuration',
            color: '#34ebd0',
            sub: [
                {
                    link: '/configuration/led',
                    icon:  'highlight',
                    title: 'LEDs',
                }, {
                    link: '/configuration/air',
                    icon:  'ac_unit',
                    title: 'Ac',
                }, {
                    link: '/configuration/drawers',
                    icon:  'move_to_inbox',
                    title: 'Drawers',
                }, {
                    link: '/configuration/shutter',
                    icon:  'line_weight',
                    title: 'Shutters',
                }
            ]
        }, {
            link: '',
            icon:  'flare',
            title: 'Test',
            color: '#34b1eb',
            sub: [
                {
                    link: '/test/stress',
                    icon:  'gavel',
                    title: 'Stress',
                }, {
                    link: '/test/refill',
                    icon:  'local_gas_station',
                    title: 'Refill',
                }, {
                    link: '/test/simple',
                    icon:  'open_with',
                    title: 'Movements',
                }
            ]
        }, {
            link: '',
            icon:  'apps',
            title: 'Settings',
            color: '#3446eb',
            sub: [
                {
                    link: '/settings/system',
                    icon:  'grid_on',
                    title: 'System',
                }, {
                    link: '/settings/registries',
                    icon:  'account_tree',
                    title: 'Registries',
                }, {
                    link: '/settings/users',
                    icon:  'people_alt',
                    title: 'Profiles',
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
    }

    ngOnInit() {

        this.user = this.currentUserService.currentUser;

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
}
