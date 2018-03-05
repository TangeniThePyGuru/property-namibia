import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Term} from "../shared/term";
import {TermService} from "../shared/term.service";
import {Toasts} from "../../shared/toasts";
import {ToastsManager} from "ng2-toastr";
import {Form} from "@angular/forms";
import {NgProgress} from "ngx-progressbar";

@Component({
  selector: 'app-term-form',
  templateUrl: './term-form.component.html',
  styleUrls: ['./term-form.component.css']
})
export class TermFormComponent extends Toasts implements OnInit{


  term: Term;

  constructor(private termSvc: TermService, public toastr: ToastsManager, vcr: ViewContainerRef,
              public ngProgress: NgProgress) {
      super(toastr, vcr);
    }

  ngOnInit(){}

  createTerm(form) {
      this.ngProgress.start();
      this.term = new Term(form.value.title, form.value.content);
      console.log(form);
      this.termSvc.createTerm(this.term).then(() =>{
          this.ngProgress.done();
          this.showSuccess('Term Created');
          form.reset();
      }).catch(() =>{
          this.ngProgress.done();
          this.showError('Error');
      });
  }
}
