import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {firebaseConfig} from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ToastModule} from "ng2-toastr"

import {AuthService} from "app/shared/auth.service";
import {PropertyService} from "./properties/shared/property.service";
import {UploadService} from "./properties/shared/upload.service";

import {LoginUserComponent} from "app/login-user/login-user.component";
import {DisplayUserComponent} from "app/display-user/display-user.component";
import {RegisterUserComponent} from "app/register-user/register-user.component";
import {AlertModule, ModalModule} from "ngx-bootstrap";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {Routes, RouterModule} from "@angular/router";
import {HomePageComponent} from "./pages/home-page.component";
import {RegisterPageComponent} from "./pages/register-page.component";
import {AllInOnePageComponent} from "./pages/all-in-one-page.component";
import {LoginPageComponent} from "./pages/login-page.component";
import { LoggedInGuard } from "app/shared/logged-in-guard";
import {PropertiesListComponent} from "./properties/properties-list/properties-list.component";
import {PropertyDetailComponent} from "./properties/property-detail/property-detail.component";
import {PropertyFormComponent} from "./properties/property-form/property-form.component";
import { TermsListComponent } from './terms/terms-list/terms-list.component';
import { TermFormComponent } from './terms/term-form/term-form.component';
import {TermService} from "./terms/shared/term.service";
import { TermDetailComponent } from './terms/term-detail/term-detail.component';
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {GalleryConfig, GalleryModule} from "ng-gallery";
import { NgSelectModule } from '@ng-select/ng-select';
import { BrokerComponent } from './broker/broker.component';
import { BrokerformComponent } from './broker/brokerform/brokerform.component';
import { BrokerDetailComponent } from './broker/broker-detail/broker-detail.component';
import { BrokerService} from "./broker/shared/broker.service"

export const config: GalleryConfig = {
    // ...
}


const routes: Routes = [
    { path: 'register', component: RegisterPageComponent},
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'properties', component: PropertiesListComponent, canActivate: [LoggedInGuard]},
    { path: 'properties/create', component: PropertyFormComponent, canActivate: [LoggedInGuard]},
    { path: 'terms', component: TermsListComponent, canActivate: [LoggedInGuard]},
    { path: 'terms/create', component: TermFormComponent, canActivate: [LoggedInGuard]},
    { path: 'brokers', component: BrokerComponent, canActivate: [LoggedInGuard] },
    { path: 'brokers/create', component: BrokerformComponent, canActivate: [LoggedInGuard] },
    { path: '', component: HomePageComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        DisplayUserComponent,
        LoginUserComponent,
        RegisterUserComponent,
        ResetPasswordComponent,
        HomePageComponent,
        RegisterPageComponent,
        AllInOnePageComponent,
        LoginPageComponent,
        PropertiesListComponent,
        PropertyDetailComponent,
        PropertyFormComponent,
        TermsListComponent,
        TermFormComponent,
        TermDetailComponent,
        BrokerComponent,
        BrokerformComponent,
        BrokerDetailComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
        AngularFontAwesomeModule,
        GalleryModule.forRoot(config),
        NgSelectModule,
        ModalModule
    ],
    providers: [
        AuthService,
        LoggedInGuard,
        PropertyService,
        UploadService,
        TermService,
        AngularFireDatabase,
        BrokerService
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
