import { Component, OnInit, Output, Input,EventEmitter} from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { UtilService } from 'src/app/services/util.service';
import { SubscriptionInject } from '../../../../subscription-inject.service';
import { SubscriptionService } from '../../../../subscription.service';
import { EventService } from 'src/app/Data-service/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumServiceService } from 'src/app/services/enum-service.service';


@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss']
})
export class SubscriptionDetailsComponent implements OnInit {
  payeeDataRes: any;
  noDataMessage: string;
  @Output() subStartNextBtn = new EventEmitter();
  // @Input() set upperData(data) {
  //   if (data == undefined) {
  //     return;
  //   } else {
  //     // this.getPayeeData(data);
  //   }
  // }

  @Input()
  set data(payeeData) {
    // if (payeeData == undefined) {
    //   return;
    // } else if (payeeData.length > 0) {
    //   if (payeeData.length == 1) {
    //     payeeData[0].share = 100
    //     payeeData[0].selected = 1
    //     this.payeeDataRes = payeeData;
    //     this.subStartNextBtn.emit(payeeData[0])
    //   }
    //   else {
    //     this.payeeDataRes = payeeData;
    //   }
    //   return;
    // } else {
      this._payeeData = payeeData;
      console.log('input payeeData : ', this._payeeData);
      // this.getPayeeData(payeeData)
    // }
  }
  restrictAfter100(event) {
    if (parseInt(event.target.value) > 100) {
      event.target.value = "100";
      // console.log(typeof (event.target.value), event.target.value);
    }
  }

  

  constructor(public utils: UtilService, private enumService: EnumServiceService,public subInjectService: SubscriptionInject, public subService: SubscriptionService, public eventService: EventService, private fb: FormBuilder) {

  }


  // noDataMessage = 'Loading...';
  _payeeData: any;

  @Output() outputData = new EventEmitter<Object>();
  @Output() payeeFlag = new EventEmitter<Object>();
  dataSub: any;
  dataObj;
  getRowData: any;
  isSelectedPlan: any;
  arraTosend: any;
  dataMatSlider: any;
  clickedOnMatSlider = false;
  subscriptionDetails: FormGroup;
  totalValue = 0;
  feeCollectionMode:any;
  isEdite:boolean = false;
  ngOnInit() {
    // console.log('change payee upperData', this.upperData);
    this.subscriptionDetails = this.fb.group({
      subscription: [this._payeeData.subscriptionNumber, [Validators.required]],
      activationDate: [new Date(this._payeeData.startsOn), [Validators.required]],
      invoiceSendingMode: [1, [Validators.required]],
      feeCollectionMode: [this._payeeData.feeMode, [Validators.required]],
      dueDateFrequency: [5, [Validators.required]]
    });

    this.feeCollectionMode = this.enumService.getFeeCollectionModeData();

  }

  enableForm(){
    this.isEdite = true;
  }

  Close(flag) {
    this.subInjectService.changeUpperRightSliderState({ state: 'close',refreshRequired:flag });
    this.subInjectService.changeNewRightSliderState({ state: 'close',refreshRequired:flag });
  }
  // getPayeeData(data) {
  //   this.getRowData = data;
  //   this.dataObj = {
  //     clientId: this.getRowData.clientId,
  //     subId: this.getRowData.id
  //   };
  //   this.subService.getPayeerProfile(this.dataObj).subscribe(
  //     responseData => {
  //       console.log('getPayeeProfile responseData: ', responseData);
  //       if (responseData) {
  //       } else {
  //         this.noDataMessage = 'No payee profile found.';
  //       }
  //       this.getPayeeProfileRes(responseData);
  //     }
  //     , error => {
  //       console.log('getPayeerProfile error: ', error);
  //     });

  // }

  // getPayeeProfileRes(data) {
  //   console.log('getPayeeProfileRes data', data);
  //   this.payeeDataRes = data;

  // }

  openAddPayee() {
    const obj = {
      data: 'Add',
      flag: false
    };
    this.payeeFlag.emit(obj);
  }

  onInputChange(event: MatSliderChange, singlePlan) {
    console.log('This is emitted as the thumb slides');
    console.log(event.value);
    this.dataMatSlider = event.value;
  }

  saveChangePayeeSetting() {
    const obj = [];
    this.payeeDataRes.forEach(element => {
      if (element.selected == 1 || element.selected == true) {
        const obj1 = {
          id: element.id,
          subscriptionId: this.getRowData.id,
          share: element.share
        };
        obj.push(obj1);
      }
    });
    console.log('obj ====', obj);
    this.subService.changePayeeSetting(obj).subscribe(
      data => this.changePayeeSettingRes(data)
    );
  }

  changePayeeSettingRes(data) {
    console.log('changePayeeSettingRes', data);
    if (data == 1) {
      this.eventService.openSnackBar('Payee updated successfully', 'OK');
      this.Close(true);
    }
  }

  selectedPayee(data, singlePlan) {
    console.log(data);
    if (this.clickedOnMatSlider) {
      this.clickedOnMatSlider = false;
      return;
    }
    (data == 1) ? singlePlan.selected = 0 : singlePlan.selected = 1;
    this.calculateMaxValue(this.payeeDataRes);
  }

  matSliderOnChange(data, singlePlan, value) {
    console.log('matSliderOnChange', data, value);
    this.clickedOnMatSlider = true;
    if (data == 1) {
      singlePlan.selected = 0;
    } else {
      singlePlan.selected = 1;
    }
    this.calculateMaxValue(this.payeeDataRes);
  }

  calculateMaxValue(data) {
    this.totalValue = 0;
    data.forEach(singlePayee => {
      if (singlePayee.selected == 1) {
        const tempValue = this.totalValue + singlePayee.share;
        console.log('calculateMaxValue tempValue: ', tempValue);
        if (tempValue >= 100) {
          singlePayee.share = 100 - this.totalValue;
          this.totalValue = 100;
        } else {
          this.totalValue = tempValue;
        }
        // if (singlePayee.share == 0) {
        //   singlePayee.selected = 0;
        // }
      }
    });

    this.outputData.emit(data);
    return this.totalValue;

  }

  goBack() {

  }

}
