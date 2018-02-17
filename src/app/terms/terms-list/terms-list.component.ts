import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {Term} from "../shared/term";
import {TermService} from "../shared/term.service";

@Component({
  selector: 'app-terms-list',
  templateUrl: './terms-list.component.html',
  styleUrls: ['./terms-list.component.css']
})
export class TermsListComponent implements OnInit {

    public terms: FirebaseListObservable<Term[]>;

    constructor(private termSvc: TermService) { }

    ngOnInit() {
        this.terms = this.termSvc.getTermsList({limitToLast: 5});
    }

    deleteTerms() {
        this.termSvc.deleteAll();
    }

}
