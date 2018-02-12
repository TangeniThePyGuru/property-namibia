import { Component, OnInit } from '@angular/core';
import {Property} from "../shared/property";
import {PropertyService} from "../shared/property.service";

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {

  item: Property = new Property();
  constructor(private propertySvc: PropertyService) { }

  ngOnInit() {
  }

  createProperty() {
    this.propertySvc.createItem(this.item)
    this.item = new Property() // reset item
  }



}
