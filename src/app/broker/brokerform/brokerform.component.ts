import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Broker} from "../shared/broker";
import {UploadService} from "../../properties/shared/upload.service";
import {Upload} from "../../properties/shared/upload"; ( UploadService)
import { Toasts} from "../../shared/toasts"
import {ToastsManager} from "ng2-toastr";
import * as _ from "lodash";
import {BrokerService} from "../shared/broker.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-brokerform',
  templateUrl: './brokerform.component.html',
  styleUrls: ['./brokerform.component.css']
})
export class BrokerformComponent extends Toasts implements OnInit {

  broker: Broker;
  currentUpload: Upload;
  selectedFile: FileList;

  broker_title = [
      {id: 'Senior Broker', name: 'Senior Broker'},
      {id: 'Junior Broker', name: 'Junior Broker'},
      {id: 'Chief Broker', name: 'Chief Broker'},
  ];

  constructor(private uploadService: UploadService, public toastr: ToastsManager,
              vcr: ViewContainerRef, public brokerService: BrokerService  ) {
    super(toastr, vcr);
  }

  ngOnInit() {
    this.brokerService.getBrokersList();
  }

  createBroker(form){

    this.broker = new Broker(form.value.name, this.uploadService.brokerImage, form.value.title, firebase.database.ServerValue.TIMESTAMP);
    console.log(this.broker);
    this.brokerService.createBroker(this.broker).then((data) => {
        this.showSuccess('Broker Successfully Created!');
        form.reset();
        this.currentUpload = null;
    }, (error) => {
        console.log(error);
        this.showError('Error, Wait for the upload to finish, or check your connection and Try Again!' );
    });

  }

  uploadImage(){
      let file = this.selectedFile;
      this.showInfo('Broker\'s picture is uploading please Wait!');
      let filesIndex = _.range(file.length);
      _.each(filesIndex, (idx) => {
          this.currentUpload = new Upload(file[idx]);
          this.uploadService.pushUpload(this.currentUpload).then((data) => {
              this.uploadService.brokerImage = data.url;
              this.showSuccess('Picture successfully uploaded');
          }, (error) => {
              console.log(error);
              this.showError('Error! Picture not uploaded, please try again!');
          });
      });
  }

  detectFile(event) {
      this.selectedFile = event.target.files;
  }

}
