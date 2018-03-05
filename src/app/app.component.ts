import {Component, ViewContainerRef, AfterViewInit} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";
import {UserInfo} from "app/shared/user-info";
import {Toasts} from "./shared/toasts"
import {ToastsManager} from "ng2-toastr";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {element} from "protractor";
import {document} from "ngx-bootstrap/utils/facade/browser";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent extends Toasts implements AfterViewInit {
    private alertType = null;
    private alertMessage = "";
    isLoggedIn = new BehaviorSubject<boolean>(false);
    template: string = `<img src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif" />`

    constructor(private authService: AuthService, private router: Router,
                public toastr: ToastsManager, vcr: ViewContainerRef,
                private spinnerService: Ng4LoadingSpinnerService) {
        super(toastr, vcr);
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
        // this.spinnerService.show();
        // setTimeout(() => {
            // this.spinnerService.hide();
        // }, 3000);


    }


    ngAfterViewInit() {
        // Copy in all the js code from the script.js. Typescript will complain but it works just fine
        // this.spinnerService.show();
        // this.spinnerService.hide();
        // element(document).then(function () {
        //     this.spinnerService.hide();
        // });
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
