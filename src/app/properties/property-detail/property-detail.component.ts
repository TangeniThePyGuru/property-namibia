import {Component, OnInit, Input, ViewContainerRef} from '@angular/core';
import {Property} from "../shared/property";
import {PropertyService} from '../shared/property.service'
import {ToastsManager} from "ng2-toastr";
import {Toasts} from "../../shared/toasts";

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent extends Toasts implements OnInit {
  @Input() property: Property;

  constructor(private propertySvc: PropertyService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    super(toastr, vcr);
  }

  ngOnInit() {
  }

  deleteProperty() {
    this.propertySvc.deleteProperty(this.property.$key).then(() => {
      this.showSuccess('Property Deleted');
    }, () => {
      this.showError('Error, Please Try Again!');
    });
  }
}
