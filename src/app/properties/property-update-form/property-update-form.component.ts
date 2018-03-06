import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Property} from "../shared/property";
import {ActivatedRoute, Router} from "@angular/router";
import {PropertyService} from "../shared/property.service";
import {NgProgress} from "ngx-progressbar";
import {Toasts} from "../../shared/toasts";
import {ToastsManager} from "ng2-toastr";
import {Upload} from "../shared/upload";
import {UploadService} from "../shared/upload.service";
import * as _ from "lodash";

@Component({
  selector: 'app-property-update-form',
  templateUrl: './property-update-form.component.html',
  styleUrls: ['./property-update-form.component.css']
})
export class PropertyUpdateFormComponent extends Toasts implements OnInit {

    property: Property;
    selectedFiles: FileList;
    selectedFile: FileList;
    currentUpload: Upload;

    bed_rooms = [
        {id: 1, name: '1 bedroom'},
        {id: 2, name: '2 bedrooms'},
        {id: 3, name: '3 bedrooms'},
        {id: 4, name: '4 bedrooms'},
        {id: 5, name: '5 bedrooms'}
    ];

    bath_rooms = [
        {id: 1, name: '1 bathroom'},
        {id: 2, name: '2 bathrooms'},
        {id: 3, name: '3 bathrooms'},
        {id: 4, name: '4 bathrooms'},
        {id: 5, name: '5 bathrooms'}
    ];

    property_label = [
        {id: 'sale', name: 'For Sale'},
        {id: 'rent', name: 'For Rent'},
    ];

    property_tag = [
        {id: 'townhouse', name: 'Townhouse'},
        {id: 'victorian', name: 'Victorian'},
        {id: 'contemporary', name: 'Contemporary'},
    ];

    property_period = [
        {id: 'month', name: 'Month'},
        {id: 'none', name: '--None--'},
    ];

    property_state = [
        {id: 'WHK', name: 'Windhoek'},
        {id: 'GBB', name: 'Bobabis'},
        {id: 'OTJ', name: 'Otjiwarongo'},
        {id: 'OND', name: 'Ondangwa'},
        {id: 'LUD', name: 'Luderitz'},
        {id: 'SH', name: 'Oshakati'},
    ];

    property_city = [
        {id: 'windhoek', name: 'Windhoek'},
        {id: 'okahanja', name: 'Okahanja'},
        {id: 'rehoboth', name: 'Rehoboth'},
        {id: 'swakopmund', name: 'Swakopmund'},
        {id: 'walvisbay', name: 'Walvisbay'},
        {id: 'luderitz', name: 'Luderitz'},
        {id: 'keetmanshoop', name: 'Keetmanshoop'},
        {id: 'ondangwa', name: 'Ondangwa'},
    ];


  constructor(public route: ActivatedRoute, public propertyService: PropertyService, public upSvc: UploadService,
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

  updateProperty(form) {
      let data = {};
      this.ngProgress.start();
      // check if thumbnail has been selected
      if (this.upSvc.thumbnail) {
        // form.value.push({thumbnail: this.upSvc.thumbnail });
        this.property.thumbnail = this.upSvc.thumbnail;

      }
      // check if new images have been uploaded
      if (this.upSvc.uploads) {

          this.property.pictures = this.upSvc.uploads;
      }

      console.log(form.value);

      this.propertyService.updateProperty(this.route.snapshot.paramMap.get('id'), this.property ).then((response) => {
          this.ngProgress.done();
          this.showSuccess('Success, Property Successfully Updated!');
          console.log(response);
      }).catch((error) => {
          this.ngProgress.done();
          this.showError('Error, Please Try again!');
          console.log(error);
      });
  }

    detectFiles(event) {
        this.selectedFiles = event.target.files;
    }

    detectFile(event) {
        this.selectedFile = event.target.files;
    }

    uploadSingle() {
        let file = this.selectedFile;
        this.showInfo('Property images are uploading please Wait!');
        let filesIndex = _.range(file.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new Upload(file[idx]);
            this.upSvc.pushUpload(this.currentUpload).then((data) => {
                this.upSvc.thumbnail = data.url;
                this.showSuccess('Thumbnail successfully uploaded');
            }, (error) => {
                console.log(error);
                this.showError('Error! Thumbnail not uploaded, please try again!');
            });
        });

    }

    uploadMulti() {
        let files = this.selectedFiles;
        console.log(files);
        this.showInfo('Property images are uploading please Wait!');
        let count = 1;
        let filesIndex = _.range(files.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new Upload(files[idx]);
            // this.currentUpload.progress = 0;
            this.upSvc.pushUpload(this.currentUpload).then((data) => {
                console.log(data);
                this.upSvc.uploads.push(data.url);
                this.showSuccess('File: ' + count  + ' succesfully uploaded');
                count++;
            }, () => {
                this.showError('Error! File ' + count + ', not uploaded, please try again!');
                count++;
            }); }
        );
    }

}
