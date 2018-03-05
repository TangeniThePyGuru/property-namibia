import {Component, EventEmitter, Output, ViewContainerRef} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import {FormBuilder, Validators, AbstractControl, FormGroup} from "@angular/forms";
import {Toasts} from "../shared/toasts";
import {ToastsManager} from "ng2-toastr";
import {NgProgress} from "ngx-progressbar";

@Component({
    selector: 'app-login-user',
    templateUrl: './login-user.component.html',
    styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent extends Toasts {
    form: FormGroup;
    email: AbstractControl;
    password: AbstractControl;
    @Output() onSuccess = new EventEmitter();
    @Output() onError = new EventEmitter();

    constructor(private authService: AuthService, private fb: FormBuilder,
                public toastr: ToastsManager, vcr: ViewContainerRef, public ngProgress: NgProgress) {
        super(toastr, vcr);
        this.form = fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    login() {
        this.ngProgress.start();
        if (this.form.valid) {
            this.authService.login(this.email.value, this.password.value)
                .subscribe(
                    () => {
                        this.onSuccess.emit();
                        this.form.reset();
                        this.ngProgress.done();
                        this.showSuccess('Successfully Logged In!');
                    },
                    (err) => {
                        this.onError.emit(err)
                        this.ngProgress.done();
                        this.showError('Login Error: Please Double Check Your Login Credentials');
                    }
                );
        }
    }

    loginVia($event, provider: string) {
        $event.preventDefault();
        this.authService.loginViaProvider(provider).subscribe(
            () => this.onSuccess.emit(),
            err => this.onError.emit(err)
        );
    }
}
