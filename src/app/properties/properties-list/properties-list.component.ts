import { Component, OnInit } from '@angular/core';
import {Property} from "../shared/property";
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import {PropertyService} from "../shared/property.service";

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit {

  public properties: FirebaseListObservable<Property[]>;

  constructor(private propertySvc: PropertyService) { }

  ngOnInit() {
    this.properties = this.propertySvc.getPropertiesList({limitToLast: 5})
  }

  deleteProperties() {
    this.propertySvc.deleteAll()
  }

}
