import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {Term} from "../shared/term";
import {TermService} from "../shared/term.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastsManager} from "ng2-toastr";
import {Toasts} from "../../shared/toasts";
import {NgProgress} from "ngx-progressbar";
import {until} from "selenium-webdriver";


@Component({
  selector: 'app-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.css']
})
export class TermsListComponent extends Toasts implements OnInit {

    public terms: FirebaseListObservable<Term[]>;

    constructor(private termSvc: TermService, private spinnerService: Ng4LoadingSpinnerService,
                public toastr: ToastsManager, vcr: ViewContainerRef, public ngProgress: NgProgress) {
        super(toastr, vcr);
        // this.spinnerService.show();
    }

    ngOnInit() {
        // this.ngProgress.start();
        this.terms =  this.termSvc.getTermsList();
    }

    deleteTerms() {
        this.termSvc.deleteAll();
    }

}
