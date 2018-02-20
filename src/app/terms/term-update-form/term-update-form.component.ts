import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {Term} from "../shared/term";
import {TermService} from "../shared/term.service";
import {Toasts} from "../../shared/toasts";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-term-update-form',
  templateUrl: './term-update-form.component.html',
  styleUrls: ['./term-update-form.component.css']
})
export class TermUpdateFormComponent extends Toasts implements OnInit {

  @Input() term: Term;

  constructor(public termSvc: TermService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    super(toastr, vcr);
  }

  ngOnInit() {
  }

    updateTerm() {
        this.termSvc.updateTerm(this.term.$key, this.term).then(() => {
            this.showSuccess('Term Updated!');
        }, () => {
            this.showError('Error, Please Try Again!');
        });
    }

}
