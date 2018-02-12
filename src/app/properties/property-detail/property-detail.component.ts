import { Component, OnInit, Input } from '@angular/core';
import {Property} from "../shared/property";
import {PropertyService} from '../shared/property.service'

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  @Input() property: Property;

  constructor(private propertySvc: PropertyService) { }

  ngOnInit() {
  }

  deleteProperty() {
    this.propertySvc.deleteProperty(this.property.$key)
  }
}
