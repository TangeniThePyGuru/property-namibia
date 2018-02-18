import { Component, OnInit } from '@angular/core';
import {Property} from "../shared/property";
import {PropertyService} from "../shared/property.service";
import {Upload} from "../shared/upload";
import * as _ from "lodash";
import {UploadService} from "../shared/upload.service";
import {log} from "util";

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {

  property: Property = new Property();
  selectedFiles: FileList;
  selectedFile: FileList;
  currentUpload: Upload;

  constructor( private upSvc: UploadService, private propertySvc: PropertyService) { }

  ngOnInit() {
  }

  createProperty() {
      // add pictures
      this.property.pictures = this.upSvc.uploads;
      this.property.thumbnail = this.upSvc.thumbnail;
    this.propertySvc.createItem(this.property);
    this.property = new Property()  ; // reset property
  }

    detectFiles(event) {
        this.selectedFiles = event.target.files;
    }

    detectFile(event) {
        this.selectedFile = event.target.files;
    }

    uploadSingle() {
        let file = this.selectedFile;
        let filesIndex = _.range(file.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new Upload(file[idx]);
            this.upSvc.pushUpload(this.currentUpload).then((data) => {
                this.upSvc.thumbnail = data;
            }, (error) => {
                console.log(error);
            });
        });

    }

    uploadMulti() {
        let files = this.selectedFiles;
        console.log(files);
        let filesIndex = _.range(files.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new Upload(files[idx]);
            this.upSvc.pushUpload(this.currentUpload).then((data) => {
                console.log(data);
                this.upSvc.uploads.push(data);
                // console.log('success');
            }); }
        );
    }



}
