import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AngularMaterialComponentsModule} from './angular-material-components/angular-material-components.module';
import {AppComponent} from "./app.component";
import {firebaseConfig} from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {AuthService} from "app/shared/auth.service";
import {PropertyService} from "./properties/shared/property.service";

import {LoginUserComponent} from "app/login-user/login-user.component";
import {DisplayUserComponent} from "app/display-user/display-user.component";
import {RegisterUserComponent} from "app/register-user/register-user.component";
import {AlertModule} from "ngx-bootstrap";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {Routes, RouterModule} from "@angular/router";
import {HomePageComponent} from "./pages/home-page.component";
import {RegisterPageComponent} from "./pages/register-page.component";
import {AllInOnePageComponent} from "./pages/all-in-one-page.component";
import {LoginPageComponent} from "./pages/login-page.component";
import { LoggedInGuard } from "app/shared/logged-in-guard";
import { DashboardPageComponent } from './pages/dashboard-page.component';
import {PropertiesListComponent} from "./properties/properties-list/properties-list.component";
import {PropertyDetailComponent} from "./properties/property-detail/property-detail.component";
import {PropertyFormComponent} from "./properties/property-form/property-form.component";

const routes: Routes = [
    { path: 'register', component: RegisterPageComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardPageComponent, canActivate: [LoggedInGuard] },
    { path: 'properties', component: PropertiesListComponent, canActivate: [LoggedInGuard]},
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
        DashboardPageComponent,
        PropertiesListComponent,
        PropertyDetailComponent,
        PropertyFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, "property-namibia"),
        AngularFireAuthModule,
        RouterModule.forRoot(routes),
        NoopAnimationsModule,
        AngularMaterialComponentsModule,
    ],
    providers: [AuthService, LoggedInGuard, PropertyService, AngularFireDatabase],
    bootstrap: [AppComponent]
})
export class AppModule {
}
