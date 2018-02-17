import {Component, Input, OnInit} from '@angular/core';
import {Term} from "../shared/term";
import {TermService} from "../shared/term.service";

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: ['./term-detail.component.css']
})
export class TermDetailComponent implements OnInit {

  @Input() term: Term;

  constructor(private termSvc: TermService) { }

  ngOnInit() {
  }

  deleteTerm() {
      this.termSvc.deleteTerm(this.term.$key);
  }

}
