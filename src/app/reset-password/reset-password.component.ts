import {Component, Output, EventEmitter, ViewContainerRef} from "@angular/core";
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "app/shared/auth.service";
import {Toasts} from "../shared/toasts";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends Toasts {
    form: FormGroup;
    email: AbstractControl;
    @Output() onSuccess = new EventEmitter();
    @Output() onError = new EventEmitter();

    constructor(private authService: AuthService, private fb: FormBuilder, public toastr: ToastsManager, vcr: ViewContainerRef) {
        super(toastr, vcr);
        this.form = fb.group({
            'email': ['', Validators.required]
        });
        this.email = this.form.controls['email'];
    }

    reset() {
        if (this.form.valid) {
            this.authService.sendPasswordResetEmail(this.email.value)
                .subscribe(
                    () => {
                        this.onSuccess.emit();
                        this.form.reset();
                        this.showSuccess('Confirmation Email Successfully sent!, Please check your email.')
                    },
                    err => {
                        this.onError.emit(err);
                        this.showError('Error, Double Check Your Email and Try Again!');
                    }
                );

        }
    }
}
