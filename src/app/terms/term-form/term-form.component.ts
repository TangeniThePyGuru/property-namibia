import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Term} from "../shared/term";
import {TermService} from "../shared/term.service";
import {Toasts} from "../../shared/toasts";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-term-form',
  templateUrl: './term-form.component.html',
  styleUrls: ['./term-form.component.css']
})
export class TermFormComponent extends Toasts implements OnInit{


  term: Term = new Term();

  constructor(private termSvc: TermService, public toastr: ToastsManager, vcr: ViewContainerRef) {
      super(toastr, vcr);
    }

  ngOnInit(){}

  createTerm() {
      this.termSvc.createTerm(this.term).then(() =>{
          this.showSuccess("Term Created");
      }).catch(() =>{
          this.showError('Error');
      })
      this.term = new Term(); // reset item

  }
}
