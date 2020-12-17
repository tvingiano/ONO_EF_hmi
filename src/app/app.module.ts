import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy  } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './view/pages/login/login.component';
import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HeaderComponent } from './view/components/layout/header/header.component';
import { FooterComponent } from './view/components/layout/footer/footer.component';
import { CookieService } from 'ngx-cookie-service';
import { OnoApiService } from './service/ono-api.service';
import { AuthenticationService } from './service/authentication.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { UserPageComponent } from './view/pages/user-page/user-page.component';
import { AvatarModule } from 'ngx-avatar';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SvgIconsService } from './service/helper/svg-icons.service';
import { UtilsService } from './service/helper/utils.service';
import { SideBarComponent } from './view/components/layout/side-bar/side-bar.component';
import { PageWrapperComponent } from './view/components/shared/page-wrapper/page-wrapper.component';
import { SystemRegistryComponent } from './view/pages/settings/system-registry/system-registry.component';
import { ModulesListComponent } from './view/components/system/modules/modules-list/modules-list.component';
import { SlotsListComponent } from './view/components/system/slots/slots-list/slots-list.component';
import { LampsComponent } from './view/pages/tmp/lamps/lamps.component';
import { SettingsComponent } from './view/pages/settings/settings.component';
import { ModuleEditDialogComponent } from './view/components/system/modules/module-edit-dialog/module-edit-dialog.component';
import { RackEditDialogComponent } from './view/components/system/racks/rack-edit-dialog/rack-edit-dialog.component';
import { SeedsComponent } from './view/pages/tmp/seeds/seeds.component';
import { SeedEditDialogComponent } from './view/pages/tmp/seeds/seed-edit-dialog/seed-edit-dialog.component';
import { SlotEditDialogComponent } from './view/components/system/slots/slot-edit-dialog/slot-edit-dialog.component';
import { SystemEditDialogComponent } from './view/pages/settings/system-registry/system-edit-dialog/system-edit-dialog.component';
import { DashboardComponent } from './view/pages/dashboard/dashboard.component';
import { DashboardCompleted } from './view/pages/dashboard/completed/dashboard.component';
import { DashboardServer } from './view/pages/dashboard/server/dashboard.component';
import { DashboardConsumption } from './view/pages/dashboard/consumption/dashboard.component';
import { DashboardRunning } from './view/pages/dashboard/running/dashboard.component';
import { DashboardAlarms } from './view/pages/dashboard/alarms/dashboard.component';
import { PageActionsButtonsDirective } from './view/directive/page-actions-buttons.directive';
import { ModuleInfoComponent } from './view/pages/settings/system-registry/module-info/module-info.component';
import { RacksListComponent } from './view/components/system/racks/racks-list/racks-list.component';
import { RackInfoComponent } from './view/pages/settings/system-registry/rack-info/rack-info.component';
import { UsersComponent } from './view/pages/settings/users/users.component';
import { ProfilesListComponent } from './view/components/profiles/profiles-list/profiles-list.component';
import { UsersListComponent } from './view/components/users-list/users-list.component';
import { UserProfileButtonComponent } from './view/components/shared/buttons/user-profile-button/user-profile-button.component';
import { fakeBackendProvider } from './helpers/fake-backend';
import { SlotInfoComponent } from './view/pages/settings/system-registry/slot-info/slot-info.component';
import { FormPageComponent } from './view/components/shared/form-page/form-page.component';
import { DisableControlDirective } from './view/directive/disable-control.directive';
import { SystemInfoComponent } from './view/pages/settings/system-registry/system-info/system-info.component';
import { ProfileCreateComponent } from './view/pages/settings/profiles/profile-create/profile-create.component';
import { ProfileFormComponent } from './view/components/profiles/profile-form/profile-form.component';
import { ProfileEditComponent } from './view/pages/settings/profiles/profile-edit/profile-edit.component';
import { RegistriesComponent } from './view/pages/settings/registries/registries.component';
import { FarmingsInfoComponent } from './view/pages/settings/registries/farmings-info/farmings-info.component';
import { FarmingsListComponent } from './view/components/registry/farmings/farmings-list/farmings-list.component';
import { FarmingFormComponent } from './view/components/registry/farmings/farmings-form/farming-form.component';
import { PlantsInfoComponent } from './view/pages/settings/registries/plants-info/plants-info.component';
import { ItemsTableComponent } from './view/components/shared/items-table/items-table.component';
import { PlantsFormComponent } from './view/components/registry/plants/plants-form/plants-form.component';
import { SpeciesFormComponent } from './view/components/registry/species/species-form/species-form.component';
import { SpeciesInfoComponent } from './view/pages/settings/registries/species-info/species-info.component';
import { CurrentUserService } from './service/current-user.service';
import { ProfilesService } from './service/profiles.service';
import { SolutionsInfoComponent } from './view/pages/settings/registries/solutions-info/solutions-info.component';
import { SolutionsFormComponent } from './view/components/registry/solutions/solutions-form/solutions-form.component';
import { ConfirmDialogComponent } from './view/components/shared/confirm-dialog/confirm-dialog.component';
import { SubstratesComponent } from './view/pages/settings/substrates/substrates.component';
import { SubstratesFormComponent } from './view/components/registry/substrates/substrates-form/substrates-form.component';
import { ConfigurationComponent } from './view/pages/configuration/configuration.component';
import { LedsComponent } from './view/pages/configuration/led/lamps.component';
import { RefillComponent } from './view/pages/configuration/refill/refill.component';
import { MatRadioModule } from '@angular/material/radio';
import { DemoComponent } from './view/pages/demo/demo.component';

import { LedListComponent } from './view/components/configuration/led/led-list.component';
import { TestComponent } from './view/pages/test/test.component';
import { Note2 } from './view/pages/process/manage/processes.component';
import { Edit } from './view/pages/process/manage/processes.component';
import { Add } from './view/pages/process/manage/processes.component';
import { Refill } from './view/pages/process/manage/processes.component';

import { Swap2 } from './view/pages/process/manage/processes.component';
import { Notess } from './view/pages/process/running/processes3.component';
import { Images } from './view/pages/process/running/processes3.component';
import { Curves } from './view/pages/process/running/processes3.component';
import { Riepilogo } from './view/pages/process/running/processes3.component';
import { FormsModule } from '@angular/forms';
import { LampPlc } from './view/pages/configuration/led/lamps.component';
import { LampSchedule } from './view/pages/configuration/led/lamps.component';
import { Climate } from './view/pages/configuration/air/climate.component';
import { Temp } from './view/pages/configuration/air/climate.component';
import { Hum } from './view/pages/configuration/air/climate.component';
import { Fan } from './view/pages/configuration/air/climate.component';
import { Drawer } from './view/pages/configuration/drawers/drawer.component';
import { TestPlc } from './view/pages/configuration/drawers/drawer.component';
import { ChartPro } from './view/pages/dashboard/chart-pro.component';
import { Chartone } from './view/pages/dashboard/chart.component';
import { Charttwo } from './view/pages/dashboard/chart2.component';
import { Chartthree } from './view/pages/dashboard/chart3.component';
import { ChartFour } from './view/pages/dashboard/chart4.component';
import { LampConsump } from './view/pages/dashboard/lamp-consump';
import { OrdersListComponent } from './view/pages/orders/ordersList.component';
import { OrderOrder } from './view/pages/orders/ordersList.component';
import {
    SetPole,
    SetBelt,
    PutPlc,
    GetPlc,
    HeightPlc,
    StandardComponent
} from './view/pages/test/simple/standard.component';


import { StressComponent } from './view/pages/test/stress/stress.component';
import { PortersStress } from './view/pages/test/stress/stress.component';
import { DrawerStress } from './view/pages/test/stress/stress.component';
import { ShuttleStress } from './view/pages/test/stress/stress.component';
// import { ProcessesComponent2 } from './view/pages/processes/processes.component';
import {
    CartServe,
    CartPurge,
    CartAdd,
    Transfer,
    Addozonated,
    Addwater,
    Settings,
    Measure,
    RefillTestComponent,
    Spray,
    Suction,
    CorrectSolution,
} from './view/pages/test/refill/refilltest.component';

import { Notesst } from './view/pages/process/seesurvey/surveyread.component';
import { Notesst2 } from './view/pages/process/seesurvey/surveyread.component';
import { Notesst3 } from './view/pages/process/seesurvey/surveyread.component';
import { Notesst4 } from './view/pages/process/seesurvey/surveyread.component';
import { Todo } from './view/pages/process/todo/todo.component';

import { SurveyRead } from './view/pages/process/seesurvey/surveyread.component';
import { ProcessesComponent } from './view/pages/process/manage/processes.component';
import { SurveyjsComponent } from './view/pages/process/survey/surveyjs.component';
import { ProcessesComponent3 } from './view/pages/process/running/processes3.component';
import { ProcessesComponent4 } from './view/pages/process/all/processes4.component';
// import { ChartArea } from './view/pages/process/running/chart3.component';
// import { ChartHeight } from './view/pages/process/running/chart4.component';
import { Notess2 } from './view/pages/process/all/processes4.component';
import { Images2 } from './view/pages/process/all/processes4.component';
import { Curves2 } from './view/pages/process/all/processes4.component';
import { Riepilogo2 } from './view/pages/process/all/processes4.component';
import { ChartArea2 } from './view/pages/process/all/chart3.component';
import { ChartHeight2 } from './view/pages/process/all/chart4.component';
import { Efficiency } from './view/pages/dashboard/efficiency.component';
import { ChartCurrent } from './view/pages/dashboard/chartCurrent.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import {CdkScrollableModule} from '@angular/cdk/scrolling';
import { CustomFormsModule } from 'ng2-validation';
import { NotifierModule } from 'angular-notifier';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LightDialogModalComponent } from './view/pages/recipes/editor/modals/light-dialog-modal/light-dialog-modal.component';
import { ClimateDialogModalComponent } from './view/pages/recipes/editor/modals/climate-dialog-modal/climate-dialog-modal.component';
import { GenericDialogModalComponent } from './view/pages/recipes/editor/modals/generic-dialog-modal/generic-dialog-modal.component';
import { SolutionDialogModalComponent } from './view/pages/recipes/editor/modals/solution-dialog-modal/solution-dialog-modal.component';
// tslint:disable-next-line:max-line-length
import { ConfirmSendDialogModalComponent } from './view/pages/recipes/editor/modals/confirm-send-dialog-modal/confirm-send-dialog-modal.component';

import { DataService } from './view/pages/recipes/editor/services/data.service';
import { MatSliderModule } from '@angular/material/slider';
import { PeriodNavComponent } from './view/pages/recipes/editor/layout/period-nav/period-nav.component';
import { IndicatorNavComponent } from './view/pages/recipes/editor/layout/indicator-nav/indicator-nav.component';
import { CommonModule } from '@angular/common';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { ConnectorComponent } from './view/pages/recipes/editor/components/connector/connector.component';
import { SettingsModalComponent } from './view/pages/recipes/editor/modals/settings-modal/settings-modal.component';
import { DelModalComponent } from './view/pages/recipes/editor/modals/del-modal/del-modal.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MathComponent } from './view/pages/recipes/editor/components/math/math.component';
import { Ng5SliderModule } from 'ng5-slider';
import { FormulaComponent } from './view/pages/recipes/editor/components/formula/formula.component';
import { DragToSelectModule } from 'ngx-drag-to-select';
import { PresFormulaComponent } from './view/pages/recipes/editor/components/pres-formula/pres-formula.component';
import { GroupSettingsModalComponent } from './view/pages/recipes/editor/modals/group-settings-modal/group-settings-modal.component';
import { ClockComponent } from './view/pages/recipes/editor/components/clock/clock.component';
import { ImportModalComponent } from './view/pages/recipes/editor/modals/import-modal/import-modal.component';
import { RecipeSettingsModalComponent } from './view/pages/recipes/editor/modals/recipe-settings-modal/recipe-settings-modal.component';
import { HttpService } from './view/pages/recipes/editor/services/http.service';

import { ViewerComponentComponent } from './view/pages/recipes/selector/viewer-component/viewer-component.component';
import { BodyComponent } from './view/pages/recipes/selector/components/layouts/body/body.component';
import { CardComponent } from './view/pages/recipes/selector/components/card/card.component';
import { ShutterComponent } from './view/pages/configuration/shutters/shutter.component';
import { GrowthChartComponent } from './view/pages/recipes/selector/components/growth-chart/growth-chart.component';
import { RecipeComponent } from './view/pages/recipes/viewer/components/recipe/recipe.component';
import { GaugeChartComponent } from './view/pages/recipes/viewer/components/gauge-chart/gauge-chart.component';
import { StepChartComponent } from './view/pages/recipes/viewer/components/step-chart/step-chart.component';
import { ProductionChartComponent } from './view/pages/recipes/viewer/components/production-chart/production-chart.component';
import { RecipeBookComponent } from './view/pages/recipes/selector/components/layouts/recipe-book/recipe-book.component';

import { GaugeProgressComponent } from './view/pages/process/manage/gauge-progress/gauge-progress.component';
import { NewProcessComponent } from './view/pages/process/new-process/new-process.component';
import { NewOrderComponent } from './view/pages/orders/new-order/new-order.component';
import { OrderGanttComponent } from './view/pages/orders/components/order-gantt/order-gantt.component';
import { OrderDetailModalComponent } from './view/pages/orders/components/order-detail-modal/order-detail-modal';
import { OrderProductionChartComponent } from './view/pages/orders/components/order-production-chart/order-production-chart.component';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        ViewerComponentComponent,
        ShutterComponent,
        CardComponent,
        BodyComponent,
        LightDialogModalComponent,
        ClimateDialogModalComponent,
        GenericDialogModalComponent,
        SolutionDialogModalComponent,
        PeriodNavComponent,
        IndicatorNavComponent,
        ConnectorComponent,
        SettingsModalComponent,
        DelModalComponent,
        MathComponent,
        FormulaComponent,
        PresFormulaComponent,
        GroupSettingsModalComponent,
        ClockComponent,
        ImportModalComponent,
        RecipeSettingsModalComponent,
        AppComponent,
        SurveyjsComponent,
        Todo,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        UserPageComponent,
        SideBarComponent,
        PageWrapperComponent,
        SettingsComponent,
        SystemRegistryComponent,
        ModulesListComponent,
        RacksListComponent,
        SlotsListComponent,
        LampsComponent,
        SeedsComponent,
        ModuleEditDialogComponent,
        RackEditDialogComponent,
        SeedEditDialogComponent,
        SlotEditDialogComponent,
        SystemEditDialogComponent,
        DashboardComponent,
        DashboardCompleted,
        DashboardServer,
        DashboardConsumption,
        DashboardRunning,
        DashboardAlarms,
        PageActionsButtonsDirective,
        ModuleInfoComponent,
        RackInfoComponent,
        UsersComponent,
        ProfilesListComponent,
        UsersListComponent,
        UserProfileButtonComponent,
        SlotInfoComponent,
        FormPageComponent,
        DisableControlDirective,
        SystemInfoComponent,
        ProfileCreateComponent,
        ProfileFormComponent,
        ProfileEditComponent,
        RegistriesComponent,
        FarmingsInfoComponent,
        FarmingsListComponent,
        FarmingFormComponent,
        PlantsInfoComponent,
        ItemsTableComponent,
        PlantsFormComponent,
        SpeciesFormComponent,
        SpeciesInfoComponent,
        SolutionsInfoComponent,
        SolutionsFormComponent,
        ConfirmDialogComponent,
        SubstratesComponent,
        SubstratesFormComponent,
        ConfigurationComponent,
        LedsComponent,
        RefillComponent,
        LedListComponent,
        TestComponent,
        // ProcessesComponent2,
        Note2,
        Edit,
        Add,
        Refill,
        Swap2,
        Notess,
        Notesst,
        Notesst2,
        Notesst3,
        Notesst4,
        LampPlc,
        LampSchedule,
        Climate,
        Temp,
        Hum,
        Fan,
        Drawer,
        TestPlc,
        Chartone,
        Charttwo,
        Chartthree,
        ChartFour,
        DemoComponent,
        LampConsump,
        OrdersListComponent,
        OrderOrder,
        StandardComponent,
        PutPlc,
        GetPlc,
        SetPole,
        SetBelt,
        RefillTestComponent,
        HeightPlc,
        SurveyRead,
        ProcessesComponent,
        ProcessesComponent3,
        ProcessesComponent4,
        Notess2,
        Images,
        Curves,
        Riepilogo,
        // ChartArea,
        // ChartHeight,
        Images2,
        Curves2,
        Riepilogo2,
        ChartArea2,
        ChartHeight2,
        StressComponent,
        PortersStress,
        DrawerStress,
        ShuttleStress,
        ChartPro,
        Efficiency,
        ChartCurrent,
        ConfirmSendDialogModalComponent,
        CardComponent,
        GrowthChartComponent,
        RecipeComponent,
        GaugeChartComponent,
        StepChartComponent,
        ProductionChartComponent,
        RecipeBookComponent,
        CartServe,
        CartPurge,
        CartAdd,
        Transfer,
        Addozonated,
        Addwater,
        Settings,
        Measure,
        RefillTestComponent,
        Spray,
        Suction,
        GaugeProgressComponent,
        CorrectSolution,
        NewProcessComponent,
        NewOrderComponent,
        OrderGanttComponent,
        OrderDetailModalComponent,
        OrderProductionChartComponent,
    ],
    imports: [
        MatRadioModule,
        BrowserModule,
        AppRoutingModule,
        DragDropModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        CustomFormsModule,
        MatSliderModule,
        MatSnackBarModule,
        CommonModule,
        DiagramModule,
        // CdkScrollableModule,
        ScrollingModule,
        Ng5SliderModule,
        DragToSelectModule.forRoot(),
        NotifierModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatSidenavModule,
        FlexModule,
        HttpClientModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        FormsModule,
        MatGridListModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatIconModule,
        MatListModule,
        MatTableModule,
        AvatarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxUiLoaderModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
    ],
    providers: [
        RefillComponent,
        DataService,
        HttpService,
        AuthenticationService,
        CookieService,
        OnoApiService,
        CurrentUserService,
        ProfilesService,
        UtilsService,
        SvgIconsService,
        Images,
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        // provider used to create fake backend
        // fakeBackendProvider,
        /* snack bar provider */
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center'
            }
        },
        /* svg service */
        SvgIconsService,
        UtilsService,
        /* fake server */
        fakeBackendProvider
    ],
    entryComponents: [
        SystemEditDialogComponent,
        RecipeSettingsModalComponent,
        DelModalComponent,
        GroupSettingsModalComponent,
        ImportModalComponent,
        LightDialogModalComponent,
        SettingsModalComponent,
        ClimateDialogModalComponent,
        GenericDialogModalComponent,
        SolutionDialogModalComponent,
        ConfirmSendDialogModalComponent,
        ModuleEditDialogComponent,
        RackEditDialogComponent,
        SeedEditDialogComponent,
        SlotEditDialogComponent,
        ConfirmDialogComponent,
        OrderDetailModalComponent,
        Note2,
        Edit,
        Add,
        Refill,
        Swap2,
        Notess,
        Notesst,
        Notesst2,
        Notesst3,
        Notesst4,
        LampPlc,
        LampSchedule,
        ShutterComponent,
        Temp,
        Hum,
        Fan,
        TestPlc,
        OrderOrder,
        PutPlc,
        GetPlc,
        SetPole,
        SetBelt,
        HeightPlc,
        Curves,
        Images,
        Riepilogo,
        Curves2,
        Images2,
        Riepilogo2,
        Notess2,
        PortersStress,
        DrawerStress,
        ShuttleStress,
        CartServe,
        CartPurge,
        CartAdd,
        Transfer,
        Addozonated,
        Addwater,
        Settings,
        Measure,
        RefillTestComponent,
        Spray,
        Suction,
        CorrectSolution,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
