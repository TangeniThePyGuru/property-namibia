import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Property} from "../shared/property";
import {PropertyService} from "../shared/property.service";
import {Upload} from "../shared/upload";
import * as _ from "lodash";
import {UploadService} from "../shared/upload.service";
import {log} from "util";
import {Toast, ToastsManager} from "ng2-toastr";
import {Toasts} from "../../shared/toasts";

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent extends Toasts implements OnInit {

  property: Property = new Property();
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

  constructor( private upSvc: UploadService, private propertySvc: PropertyService, public toastr: ToastsManager, vcr: ViewContainerRef ) {
      super(toastr, vcr);
  }

  ngOnInit() {
  }

  createProperty() {
      // add pictures
      this.property.pictures = this.upSvc.uploads;
      this.property.thumbnail = this.upSvc.thumbnail;
    this.propertySvc.createProperty(this.property).then(() => {
        this.showSuccess('Property Successfully Added!');
        this.property = new Property();
    }, () => {
        this.showError('Error, Wait for the upload to finish, or check your connection and Try Again!' );
    })
  }

    detectFiles(event) {
        this.selectedFiles = event.target.files;
    }

    detectFile(event) {
        this.selectedFile = event.target.files;
    }

    uploadSingle() {
        let file = this.selectedFile;
        this.showInfo('Property images are uploading please Wait!')
        let filesIndex = _.range(file.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new Upload(file[idx]);
            this.upSvc.pushUpload(this.currentUpload).then((data) => {
                this.upSvc.thumbnail = data.url;
                this.showSuccess('File: ' +  idx + 1 + ' succesfully uploaded');
            }, (error) => {
                console.log(error)
                this.showError('Error! File ' + idx + 1 + ', not uploaded, please try again!');
            });
        });

    }

    uploadMulti() {
        let files = this.selectedFiles;
        console.log(files);
        this.showInfo('Property images are uploading please Wait!')
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
