import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {Term} from "./term";
import {reject} from "q";

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
        console.log(this.terms)
        return this.terms;
    }

    // Return a single observable term
    getTerm(key: string): Promise<Term> {
        const termPath =  `${this.basePath}/${key}`;
        // this.term =
           return new Promise((resolve, reject) => {
               this.db.object(termPath).subscribe((data) => {
                   resolve(data);
               }, (error) => {
                   reject(error);
               });
           });
        // console.log(this.term);
        // return this.term;
    }

    createTerm(term: Term): Promise<any>  {
        return new Promise((resolve, reject) => {
            this.terms.push(term).then((data) =>{
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
            // .catch(error => this.handleError(error));
    }


    // Update an existing term
    updateTerm(key: string, value: any):  Promise<any> {
        return new Promise((resolve, reject) => {
            this.terms.update(key, value).then((data) =>{
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    // Deletes a single term
    deleteTerm(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.terms.remove(key).then((data) => {
                resolve(data);
            }, (data) => {
                reject(data);
            });
        });
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
