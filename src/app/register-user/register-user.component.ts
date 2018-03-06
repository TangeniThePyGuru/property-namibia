import {Component, OnInit, EventEmitter, Output, ViewContainerRef} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {NgProgress} from "ngx-progressbar";
import {Toasts} from "../shared/toasts";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent extends Toasts{
    form: FormGroup;
    email: AbstractControl;
    name: AbstractControl;
    password: AbstractControl;
    password2: AbstractControl;

    @Output() onSuccess = new EventEmitter();
    @Output() onError = new EventEmitter();

    constructor(private authService: AuthService, private fb: FormBuilder, public router: Router,
                public ngProgress: NgProgress, public toastr: ToastsManager, vcr: ViewContainerRef) {
        super(toastr, vcr);
        this.form = fb.group({
            'name': ['', Validators.required],
            'email': ['', Validators.compose([
                Validators.required,
                Validators.email]
            )],
            'password': ['', Validators.required],
            'password2': ['', Validators.required]
        }, {validator: this.matchingPasswords('password', 'password2')});
        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.password2 = this.form.controls['password2'];
    }

    onSubmit() {
        this.ngProgress.start();
        if (this.form.valid) {
            this.authService.createUser(this.email.value, this.password.value, this.name.value)
                .subscribe(
                    () => {
                        this.onSuccess.emit("success");
                        this.form.reset();
                        this.ngProgress.done();
                        this.router.navigate(['/']);
                        this.showSuccess('User Successfully Registered');
                    },
                    err => {
                        this.onError.emit(err)
                        this.ngProgress.done();
                        this.showError('Error, Please Try Again!');
                    }
                );
        }
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }
}
