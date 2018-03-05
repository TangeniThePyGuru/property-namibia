import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Property} from "../shared/property";
import {ActivatedRoute, Router} from "@angular/router";
import {PropertyService} from "../shared/property.service";
import {NgProgress} from "ngx-progressbar";
import {Toasts} from "../../shared/toasts";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-property-update-form',
  templateUrl: './property-update-form.component.html',
  styleUrls: ['./property-update-form.component.css']
})
export class PropertyUpdateFormComponent extends Toasts implements OnInit {

  property: Property;

  constructor(public route: ActivatedRoute, public propertyService: PropertyService,
              public ngProgress: NgProgress, public toastr: ToastsManager, vcr: ViewContainerRef) {
    super(toastr, vcr);
  }

  ngOnInit() {
      this.ngProgress.start();
    this.propertyService.getProperty(this.route.snapshot.paramMap.get('id'))
        .then((data) => {
          this.property = data;
          this.ngProgress.done();
        })
        .catch((error) => {
          console.log(error);
          this.ngProgress.done();
        });
  }

  updateProperty(form){
      this.ngProgress.start();
      this.propertyService.updateProperty(this.route.snapshot.paramMap.get('id'), form.value ).then((response)=>{
          this.ngProgress.done();
          this.showSuccess('Success, Property Successfully Updated!')
          console.log(response);
      }).catch((error) => {
          this.ngProgress.done();
          this.showError('Error, Please Try again!')
          console.log(error);
      });
  }

}
