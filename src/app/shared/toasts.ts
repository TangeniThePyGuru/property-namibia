import {ToastsManager} from "ng2-toastr";
import {ViewContainerRef} from "@angular/core";

export class Toasts {

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    showSuccess(message = 'You are awesome!') {
        this.toastr.success(message, 'Success!');
    }

    showError(message = 'This is not good!') {
        this.toastr.error( message, 'Oops!');
    }

    showWarning(message = 'You are being warned.') {
        this.toastr.warning(message, 'Alert!');
    }

    showInfo(message = 'Just some information for you.') {
        this.toastr.info(message, 'Info!');
    }

    showCustom(title: string = null, message: string, options = true) {
        let messageOutput = '<span style="color: red">' +  message + '.</span>';
        this.toastr.custom(messageOutput, title, {enableHTML: options});
    }


}
