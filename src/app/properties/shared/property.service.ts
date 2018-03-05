import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Property } from './property';
import {reject} from "q";

@Injectable()
export class PropertyService {

  private basePath: string = '/propertylisting';
  properties: FirebaseListObservable<Property[]> = null; //  list of objects
  property: FirebaseObjectObservable<Property> = null; //   single object

  constructor(private db: AngularFireDatabase) { }

  getPropertiesList(query={}): FirebaseListObservable<Property[]> {
    this.properties = this.db.list(this.basePath, {
      query: query
    });
    return this.properties;
  }

  // Return a single observable item
  getProperty(key: string): Promise<Property> {
    const propertyPath =  `${this.basePath}/${key}`;

      return new Promise((resolve, reject) => {
          this.db.object(propertyPath).subscribe((data) => {
              resolve(data);
              // this.property = data;
          }, (error) => {
              reject(error);
          });
      });

    // return this.property
  }

  createProperty(property: Property): Promise<any>  {
      return new Promise((resolve, reject) => {
          this.properties.push(property).then(() => {
            resolve(property);
          }, () =>{
            reject(property);
          });
      });
        // .catch(error => this.handleError(error))
  }
  // Update an existing property
  updateProperty(key: string, value: any): Promise<any> {
    // this.properties.update(key, value)
    //     .catch(error => this.handleError(error))
      return new Promise((resolve, reject) => {
          this.properties.update(key, value).then(data => {
              resolve(data);
          }, (error) => {
              reject(error);
          });
      });
  }
  // Deletes a single property
  deleteProperty(key: string): Promise<any> {
      return new Promise((resolve, reject) => {
          this.properties.remove(key).then((data) => {
            resolve(data);
          }, (data) => {
            reject(data);
          });
      });
  }
  // Deletes the entire list of properties
  deleteAll(): void {
    this.properties.remove()
        .catch(error => this.handleError(error))
  }
  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }
}
