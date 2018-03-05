import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Term} from "../shared/term";
import {ActivatedRoute, Router} from "@angular/router";
import {TermService} from "../shared/term.service";
import {NgProgress} from "ngx-progressbar";
import {Toasts} from "../../shared/toasts";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-term-update-form',
  templateUrl: './term-update-form.component.html',
  styleUrls: ['./term-update-form.component.css']
})
export class TermUpdateFormComponent extends Toasts implements OnInit {

  term: Term;

  constructor(private route: ActivatedRoute, private termService: TermService,
              public ngProgress: NgProgress, public toastr: ToastsManager, vcr: ViewContainerRef) {
    super(toastr, vcr);

  }

  ngOnInit() {
    this.ngProgress.start();
    this.termService.getTerm(this.route.snapshot.paramMap.get('id')).then((term) => {
      this.term = term;
      this.ngProgress.done();
      console.log(term);
    });
  }

  updateTerm(form) {
    this.ngProgress.start();
    this.termService.updateTerm(this.route.snapshot.paramMap.get('id'), form.value ).then((response)=>{
      this.ngProgress.done();
      this.showSuccess('Success, Term Successfully Updated!')
      console.log(response);
    }).catch((error) => {
      this.ngProgress.done();
      this.showError('Error, Please Try again!')
      console.log(error);
    });
  }

}
