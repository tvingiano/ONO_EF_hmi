import { Routes } from '@angular/router';
import { LoginComponent } from '../view/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserPageComponent } from '../view/pages/user-page/user-page.component';
import { SystemRegistryComponent } from '../view/pages/settings/system-registry/system-registry.component';
import { SettingsComponent } from '../view/pages/settings/settings.component';
import { DashboardComponent } from '../view/pages/dashboard/dashboard.component';
import { DashboardCompleted } from '../view/pages/dashboard/completed/dashboard.component';
import { DashboardServer } from '../view/pages/dashboard/server/dashboard.component';
import { DashboardConsumption } from '../view/pages/dashboard/consumption/dashboard.component';
import { DashboardRunning } from '../view/pages/dashboard/running/dashboard.component';
import { DashboardAlarms } from '../view/pages/dashboard/alarms/dashboard.component';
import { ModuleInfoComponent } from '../view/pages/settings/system-registry/module-info/module-info.component';
import { RackInfoComponent } from '../view/pages/settings/system-registry/rack-info/rack-info.component';
import { UsersComponent } from '../view/pages/settings/users/users.component';
import { SlotInfoComponent } from '../view/pages/settings/system-registry/slot-info/slot-info.component';
import { ProfileCreateComponent } from '../view/pages/settings/profiles/profile-create/profile-create.component';
import { ProfileEditComponent } from '../view/pages/settings/profiles/profile-edit/profile-edit.component';
import { RegistriesComponent } from '../view/pages/settings/registries/registries.component';
import { FarmingsInfoComponent } from '../view/pages/settings/registries/farmings-info/farmings-info.component';
import { PlantsInfoComponent } from '../view/pages/settings/registries/plants-info/plants-info.component';
import { SpeciesInfoComponent } from '../view/pages/settings/registries/species-info/species-info.component';
import { PrivacyGuard } from './guards/privacy.guard';
import { SolutionsInfoComponent } from '../view/pages/settings/registries/solutions-info/solutions-info.component';
import { SubstratesComponent } from '../view/pages/settings/substrates/substrates.component';
import { ConfigurationComponent } from '../view/pages/configuration/configuration.component';
import { ShutterComponent } from '../view/pages/configuration/shutters/shutter.component';
import { RefillComponent } from '../view/pages/configuration/refill/refill.component';
import { DemoComponent } from '../view/pages/demo/demo.component';

import { LedsComponent } from '../view/pages/configuration/led/lamps.component';
import { TestComponent } from '../view/pages/test/test.component';
// import { ProcessesComponent2 } from '../view/pages/processes/processes.component';
import { Climate } from '../view/pages/configuration/air/climate.component';
import { Drawer } from '../view/pages/configuration/drawers/drawer.component';
import { OrdersListComponent } from '../view/pages/orders/ordersList.component';
import { StandardComponent } from '../view/pages/test/simple/standard.component';
import { ProcessesComponent } from '../view/pages/process/manage/processes.component';
import { ProcessesComponent3 } from '../view/pages/process/running/processes3.component';
import { ProcessesComponent4 } from '../view/pages/process/all/processes4.component';
import { StressComponent } from '../view/pages/test/stress/stress.component';
import { SurveyjsComponent } from '../view/pages/process/survey/surveyjs.component';
import { SurveyRead } from '../view/pages/process/seesurvey/surveyread.component';
import { Todo } from '../view/pages/process/todo/todo.component';
import { IndicatorNavComponent } from '../view/pages/recipes/editor/layout/indicator-nav/indicator-nav.component';
import { ViewerComponentComponent } from '../view/pages/recipes/selector/viewer-component/viewer-component.component';
import { RecipeComponent } from '../view/pages/recipes/viewer/components/recipe/recipe.component';
import { RefillTestComponent } from '../view/pages/test/refill/refilltest.component';
import { NewProcessComponent } from '../view/pages/process/new-process/new-process.component';
import { NewOrderComponent } from '../view/pages/orders/new-order/new-order.component';
import { StartProcessComponent } from '../view/pages/process/start-process/start-process.component';
export const ROUTES: Routes = [
    /* LOGIN PAGE */
    { path: 'login', component: LoginComponent },

    /* DASHBOARD */
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'completeddashboard', component: DashboardCompleted, canActivate: [AuthGuard] },
    { path: 'serverstatus', component: DashboardServer, canActivate: [AuthGuard] },
    { path: 'consumptiondashboard', component: DashboardConsumption, canActivate: [AuthGuard] },
    { path: 'runningprocesses', component: DashboardRunning, canActivate: [AuthGuard] },
    { path: 'alarms', component: DashboardAlarms, canActivate: [AuthGuard] },

    /* CURRENT USER PROFILE PAGE */
    { path: 'user/edit', component: UserPageComponent, canActivate: [AuthGuard] },

    /* SYSTEM SETTINGS */
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },

    /* PROFILES AND USERS */
    { path: 'settings/users', component: UsersComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/users/edit', component: UserPageComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/users/create', component: UserPageComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/profiles/create', component: ProfileCreateComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/profiles/edit', component: ProfileEditComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/registries', component: RegistriesComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/registries/farmings', component: FarmingsInfoComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/registries/plants', component: PlantsInfoComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/registries/species', component: SpeciesInfoComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/registries/solutions', component: SolutionsInfoComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/registries/substrates', component: SubstratesComponent, canActivate: [AuthGuard, PrivacyGuard] },

    /* SYSTEM SETTING */
    { path: 'settings/system', component: SystemRegistryComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/system/module', component: ModuleInfoComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/system/rack', component: RackInfoComponent, canActivate: [AuthGuard, PrivacyGuard] },
    { path: 'settings/system/slot', component: SlotInfoComponent, canActivate: [AuthGuard, PrivacyGuard] },

    /* SYSTEM CONFIGURATION */
    { path: 'configuration', component: ConfigurationComponent },
    { path: 'configuration/led', component: LedsComponent },
    { path: 'configuration/air', component: Climate },
    { path: 'configuration/drawers', component: Drawer },
    { path: 'configuration/shutter', component: ShutterComponent },
    { path: 'configuration/refill', component: RefillComponent },

    /* TEST */
    { path: 'test', component: TestComponent },
    { path: 'test/stress', component: StressComponent },
    // { path: 'test/standard', component: DashboardComponent },
    { path: 'test/simple', component: StandardComponent },
    { path: 'test/refill', component: RefillTestComponent },


    /* RECIPES */

    { path: 'recipes/selector', component: ViewerComponentComponent },
    { path: 'recipes/editor', component: IndicatorNavComponent },
    { path: 'recipes/viewer', component: RecipeComponent },

    /* ORDERS */
    { path: 'orders', component: OrdersListComponent },
    { path: 'new-orders', component: NewOrderComponent },

    /* PROCESSES */
    { path: 'processes/manage', component: ProcessesComponent },
    { path: 'processes/running', component: ProcessesComponent3 },
    { path: 'processes/all', component: ProcessesComponent4 },
    { path: 'processes/survey', component: SurveyjsComponent },
    { path: 'processes/details', component: SurveyRead },
    { path: 'processes/todo', component: Todo },
    { path: 'processes/new', component: NewProcessComponent},
    { path: 'processes/start', component: StartProcessComponent},

    { path: 'demo', component: DemoComponent },

    /* OTHERWISE REDIRECT TO HOME */
    { path: '**', redirectTo: '' },
];
