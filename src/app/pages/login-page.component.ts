import {Component, ViewContainerRef} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";
import {NgProgress} from "ngx-progressbar";
import {Toasts} from "../shared/toasts";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends Toasts{
    isLoggedIn = new BehaviorSubject<boolean>(false);

    constructor(private authService: AuthService, private router: Router,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        super(toastr, vcr);
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
    }

    navigateToResetPassword($event) {
        this.router.navigate(['reset-password']);
    }

    navigateToHome() {
        this.router.navigate(['/']);
    }
}
