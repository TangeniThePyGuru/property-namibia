import { Injectable } from '@angular/core';
import {Broker} from "./broker";
import {FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase} from "angularfire2/database-deprecated";

@Injectable()
export class BrokerService {

    private basePath: string = '/brokers';
    brokers: FirebaseListObservable<Broker[]>; //  list of objects
    broker: FirebaseObjectObservable<Broker>; //   single object


    constructor(
        public db: AngularFireDatabase
    ) { }

    getBrokersList(query={}): FirebaseListObservable<Broker[]> {
        this.brokers = this.db.list(this.basePath, {
            query: query
        });
        return this.brokers;
    }

    createBroker(broker: Broker): Promise<any>  {
        return new Promise((resolve, reject) => {
            this.brokers.push(broker).then((data) => {
                resolve(data);
            }, (error) =>{
                reject(error);
            });
        });
        // .catch(error => this.handleError(error))
    }

}
