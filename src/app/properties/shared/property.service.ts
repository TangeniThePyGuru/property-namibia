import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Property } from './property';

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
  getProperty(key: string): FirebaseObjectObservable<Property> {
    const propertyPath =  `${this.basePath}/${key}`;
    this.property = this.db.object(propertyPath)
    return this.property
  }

  createItem(property: Property): void  {
    this.properties.push(property)
        // .catch(error => this.handleError(error))
  }
  // Update an existing property
  updateProperty(key: string, value: any): void {
    this.properties.update(key, value)
        .catch(error => this.handleError(error))
  }
  // Deletes a single property
  deleteProperty(key: string): void {
    this.properties.remove(key)
        .catch(error => this.handleError(error))
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