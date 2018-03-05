import { Component, OnInit } from '@angular/core';
import {Term} from "../shared/term";
import {ActivatedRoute, Router} from "@angular/router";
import {TermService} from "../shared/term.service";

@Component({
  selector: 'app-term-update-form',
  templateUrl: './term-update-form.component.html',
  styleUrls: ['./term-update-form.component.css']
})
export class TermUpdateFormComponent implements OnInit {

  term: Term;

  constructor(private route: ActivatedRoute, private termService: TermService) {

  }

  ngOnInit() {
    this.termService.getTerm(this.route.snapshot.paramMap.get('id')).then((term) => {
      this.term = term;
      console.log(term);
    });
  }

  updateTerm(form) {
    console.log(form.value);
    this.termService.updateTerm(this.route.snapshot.paramMap.get('id'), form.value ).then((response)=>{
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

}
