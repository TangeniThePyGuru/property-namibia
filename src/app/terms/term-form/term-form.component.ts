import { Component, OnInit } from '@angular/core';
import {Term} from "../shared/term";
import {TermService} from "../shared/term.service";

@Component({
  selector: 'app-term-form',
  templateUrl: './term-form.component.html',
  styleUrls: ['./term-form.component.css']
})
export class TermFormComponent implements OnInit {


  term: Term = new Term();

  constructor(private termSvc: TermService) { }

  ngOnInit(){}

  createTerm() {
      this.termSvc.createTerm(this.term)
      this.term = new Term(); // reset item
  }
}
