import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionInject} from '../../../Subscriptions/subscription-inject.service';
import {FileUploadService} from 'src/app/services/file-upload.service';
import {apiConfig} from 'src/app/config/main-config';
import {appConfig} from 'src/app/config/component-config';
import {FileItem, ParsedResponseHeaders} from 'ng2-file-upload';
import {EventService} from '../../../../../../Data-service/event.service';

@Component({
  selector: 'app-detailed-view-mandate',
  templateUrl: './detailed-view-mandate.component.html',
  styleUrls: ['./detailed-view-mandate.component.scss']
})
export class DetailedViewMandateComponent implements OnInit {
  @Input() data;
  details: any;
  transactionData: any;
  isLoading = false;

  statusData = [
    {
      name: 'Pending authorization', checked: false, status: 0
    },
    {
      name: 'Form uploaded', checked: false, status: 4
    },
    {
      name: 'Accepted authorization', checked: false, status: 2
    },
    {
      name: 'Rejected authorization', checked: false, status: 3
    }
  ];
  statusDetails: any;
  file: any;

  constructor(private subInjectService: SubscriptionInject, private eventService: EventService) {
  }

  ngOnInit() {
    this.details = this.data;
    this.getDataStatus(this.details);
  }

  uploadFormFile(event) {// for pro build param added

  }

  uploadFormImageUpload(event) {// for pro build param added

  }

  getDataStatus(data) {
    this.isLoading = true;
    this.statusDetails = this.statusData;
    this.statusDetails.forEach(element => {
      (element.status <= data.status) ? element.checked = true : element.checked = false;
    });
    if (this.details.formUploadFlag == 1) {
      this.statusDetails[1].checked = true;
    }
    this.isLoading = false;
  }

  refresh(value) {
    this.getDataStatus(value);
  }

  close() {
    this.subInjectService.changeNewRightSliderState({state: 'close'});
  }

  getFileDetails(e, flag) {
    this.file = e.target.files[0];
    const file = e.target.files[0];
    const requestMap = {
      // tpUserRequestId: 1,
      documentType: flag,
      tpMandateDetailId: this.details.id
    };
    FileUploadService.uploadFileToServer(apiConfig.TRANSACT + appConfig.MANDATE_UPLOAD,
      file, requestMap, (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {

        if (status == 200) {
          const responseObject = JSON.parse(response);
          this.eventService.openSnackBar('File uploaded successfully');
        } else {
          const responseObject = JSON.parse(response);
          this.eventService.openSnackBar(responseObject.message, 'Dismiss', null, 60000);
        }
      });
  }
}
