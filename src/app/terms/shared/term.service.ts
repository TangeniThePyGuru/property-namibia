import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {Term} from "./term";

@Injectable()
export class TermService {

    private basePath: string = '/terms';

    terms: FirebaseListObservable<Term[]> = null; //  list of objects
    term: FirebaseObjectObservable<Term> = null; //   single object

    constructor(private db: AngularFireDatabase) { }

    getTermsList(query={}): FirebaseListObservable<Term[]> {
        this.terms = this.db.list(this.basePath, {
            query: query
        });
        return this.terms;
    }

    // Return a single observable term
    getTerm(key: string): FirebaseObjectObservable<Term> {
        const termPath =  `${this.basePath}/${key}`;
        this.term = this.db.object(termPath)
        return this.term;
    }

    createTerm(term: Term): void  {
        this.terms.push(term);
            // .catch(error => this.handleError(error));
    }


    // Update an existing term
    updateTerm(key: string, value: any): void {
        this.terms.update(key, value)
            .catch(error => this.handleError(error));
    }

    // Deletes a single term
    deleteTerm(key: string): void {
        this.terms.remove(key)
            .catch(error => this.handleError(error));
    }

    // Deletes the entire list of terms
    deleteAll(): void {
        this.terms.remove()
            .catch(error => this.handleError(error));
    }

    // Default error handling for all actions
    private handleError(error) {
        console.log(error);
    }


}
