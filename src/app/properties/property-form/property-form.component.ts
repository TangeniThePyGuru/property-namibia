import { Component, OnInit } from '@angular/core';
import {Property} from "../shared/property";
import {PropertyService} from "../shared/property.service";
import {Upload} from "../shared/upload";
import * as _ from "lodash";
import {UploadService} from "../shared/upload.service";

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {

  property: Property = new Property();
  selectedFiles: FileList;
  selectedFile: File;
  currentUpload: Upload;

  constructor( private upSvc: UploadService, private propertySvc: PropertyService) { }

  ngOnInit() {
  }

  createProperty() {
    this.propertySvc.createItem(this.property);
    this.property = new Property(); // reset property
  }

    detectFiles(event) {
        this.selectedFiles = event.target.files;
    }

    detectFile(event) {
        this.selectedFile = event.target.files;
    }

    uploadSingle() {
        let file = this.selectedFile;
        this.currentUpload = new Upload(file);
        this.upSvc.pushUpload(this.currentUpload);
    }

    uploadMulti() {
        let files = this.selectedFiles;
        let filesIndex = _.range(files.length);
        _.each(filesIndex, (idx) => {
            this.currentUpload = new Upload(files[idx]);
            this.upSvc.pushUpload(this.currentUpload); },
            (data) => {
                console.log(data);
            }
        );
    }



}
