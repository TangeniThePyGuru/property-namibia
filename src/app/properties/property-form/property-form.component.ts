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
        this.showError('Error, Please Try Again!' );
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
