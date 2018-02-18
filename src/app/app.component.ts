import {Component, ViewContainerRef} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";
import {UserInfo} from "app/shared/user-info";
import {Toasts} from "./shared/toasts"
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent extends Toasts {
    private alertType = null;
    private alertMessage = "";
    isLoggedIn = new BehaviorSubject<boolean>(false);
    // ts = new Toasts();

    constructor(private authService: AuthService, private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
        super(toastr, vcr);
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
    }

    currentUser(): Observable<UserInfo> {
        return this.authService.currentUser();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
        this.showInfo('Your session has ended!')

    }

    onResetPasswordSuccess() {
        this.alertType = "success";
        this.alertMessage = "Reset Password Sent!";
    }

    onLoginSuccess() {
        this.alertType = "success";
        this.alertMessage = "Login Success!";
    }

    onRegisterSuccess() {
        this.alertType = "success";
        this.alertMessage = "User registered!";
    }

    onError(err) {
        this.alertType = "danger";
        this.alertMessage = err;
    }

    onLoggedOut() {
        // Just reset any displayed messsage.
        this.alertType = null;
        this.alertMessage = "";
    }

    alertClosed() {
        this.alertType = null;
        this.alertMessage = "";
    }
}
