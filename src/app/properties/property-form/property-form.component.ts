import { Component, OnInit } from '@angular/core';
import {Property} from "../shared/property";
import {PropertyService} from "../shared/property.service";

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {

  property: Property = new Property();
  constructor(private propertySvc: PropertyService) { }

  ngOnInit() {
  }

  createProperty() {
    this.propertySvc.createItem(this.property)
    this.property = new Property(); // reset property
  }



}
