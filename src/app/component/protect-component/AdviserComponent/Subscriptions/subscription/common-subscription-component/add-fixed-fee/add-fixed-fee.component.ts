import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SubscriptionInject } from '../../../subscription-inject.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SubscriptionService } from '../../../subscription.service';
import { EventService } from 'src/app/Data-service/event.service';
import { AuthService } from '../../../../../../../auth-service/authService';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-fixed-fee',
  templateUrl: './add-fixed-fee.component.html',
  styleUrls: ['./add-fixed-fee.component.scss']
})
export class AddFixedFeeComponent implements OnInit {
  serviceId: any;
  dataToSend: {};
  data: any;
  constructor(public utils: UtilService, public subInjectService: SubscriptionInject, private fb: FormBuilder,
    private subService: SubscriptionService, private eventService: EventService) {
  }

  isServiceValid;
  isCodeValid;
  isDescriptionValid;
  isFeesValid;
  isbillEvery;
  advisorId;
  ischeckFixedData;
  fixedFeeData = this.fb.group({
    serviceName: [, [Validators.required]],
    code: [, [Validators.required]],
    description: [, [Validators.required]],
    Duration: [1],
    fees: [, [Validators.required]],
    billingNature: [1],
    billEvery: [, [Validators.required]],
    billingMode: [1]
  });
  @Input() set fixedFee(data) {
    this.ischeckFixedData = data
    this.getFeeFormData(data)
  }
  @Output() outputFixedData = new EventEmitter();
  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.setValidation(false);
    (this.ischeckFixedData) ? console.log("fixed fee Data") : this.createFixedFeeForm('');
  }

  createFixedFeeForm(data) {
    this.fixedFeeData = this.fb.group({
      serviceName: [data, [Validators.required, Validators.maxLength(40)]],
      code: [data, [Validators.required]],
      description: [data, [Validators.required]],
      Duration: [1],
      fees: [data, [Validators.required]],
      billingNature: [1],
      billEvery: [data, [Validators.required]],
      billingMode: [1]
    });
    this.getFormControl().serviceName.maxLength = 40;
    this.getFormControl().code.maxLength = 10;
    this.getFormControl().description.maxLength = 160;
    this.getFormControl().fees.maxLength = 10;
  }

  setValidation(flag) {
    this.isServiceValid = flag;
    this.isCodeValid = flag;
    this.isDescriptionValid = flag;
    this.isFeesValid = flag;
    this.isbillEvery = flag;
  }

  getFormControl(): any {
    return this.fixedFeeData.controls;
  }

  getFeeFormData(data) {
    if (data == '') {
      this.createFixedFeeForm('')
      return;
    } else {
      this.data = data;
      this.serviceId = data.id;
      // data.servicePricing.billingNature = '1';
      console.log(' this isa snd;kasljdlkajsdlkashdlaksd ', data.servicePricing.billingNature);
      console.log(' this isa snd;kasljdlkajsdlkashdlaksd ', data.servicePricing.billingNature + '');

      // data.servicePricing.billingNature + ''
      this.fixedFeeData.controls.serviceName.setValue(data.serviceName);
      this.fixedFeeData.controls.code.setValue(data.serviceCode);
      this.fixedFeeData.controls.description.setValue(data.description);
      this.fixedFeeData.controls.Duration.setValue(data.servicePricing.billingCycle);
      this.fixedFeeData.controls.fees.setValue(data.servicePricing.pricingList[0].pricing);
      this.fixedFeeData.controls.billingNature.setValue(data.servicePricing.billingNature + '');
      // this.fixedFeeData.controls.billingNature.setValue('2');

      this.fixedFeeData.controls.billingMode.setValue(data.servicePricing.billingMode);
      this.fixedFeeData.controls.billEvery.setValue(data.servicePricing.billEvery);

      this.getFormControl().serviceName.maxLength = 40;
      this.getFormControl().code.maxLength = 10;
      this.getFormControl().description.maxLength = 160;
      this.getFormControl().fees.maxLength = 10;
    }

  }

  Close(state) {
    this.subInjectService.changeUpperRightSliderState({ state: 'close' });
    this.setValidation(false);
    this.createFixedFeeForm('');
  }

  closeTab(state, value) {
    console.log(state);
    this.subInjectService.rightSliderData(state);
    this.subInjectService.closeSlider(value);
  }

  saveFeeTypeData(feeType, state) {

    if (this.fixedFeeData.controls.serviceName.invalid) {
      this.isServiceValid = true;
      return;
    } else if (this.fixedFeeData.controls.code.invalid) {
      this.isCodeValid = true;
      return;
    } else if (this.fixedFeeData.controls.fees.invalid) {
      this.isFeesValid = true;
      return;
    } else if (this.fixedFeeData.controls.billEvery.invalid) {
      this.isbillEvery = true;
      return;
    } else {

      const obj = {
        serviceRepoId: this.serviceId,
        advisorId: this.advisorId,
        // advisorId: 12345,
        description: this.fixedFeeData.controls.description.value,
        // global: false,
        serviceCode: this.fixedFeeData.controls.code.value,
        serviceName: this.fixedFeeData.controls.serviceName.value,
        servicePricing: {
          id: this.data.servicePricing.id,
          // autoRenew: 0,
          billEvery: this.fixedFeeData.controls.billEvery.value,
          // billingCycle: 1,
          billingMode: parseInt(this.fixedFeeData.controls.billingMode.value),
          billingNature: parseInt(this.fixedFeeData.controls.billingNature.value),
          feeTypeId: parseInt(feeType),
          pricingList: [
            {
              id: this.data.servicePricing.pricingList[0].id,
              pricing: this.fixedFeeData.controls.fees.value,
              assetClassId: 1
            }
          ]

        }
      };
      this.dataToSend = obj;
      Object.assign(this.dataToSend, { id: this.serviceId });
      if (this.serviceId == undefined) {
        this.subService.createSettingService(obj).subscribe(
          data => this.saveFeeTypeDataResponse(data, state)
        );
      } else {
        this.subService.editSettingService(obj).subscribe(
          data => this.saveFeeTypeDataEditResponse(data, state)
        );
      }

    }
  }

  saveFeeTypeDataResponse(data, state) {
    this.outputFixedData.emit(data)
    this.eventService.openSnackBar('Service is Created', 'OK');
    this.subInjectService.changeUpperRightSliderState({ state: 'close' });
  }
  saveFeeTypeDataEditResponse(data, state) {
    this.outputFixedData.emit(this.dataToSend)
    this.eventService.openSnackBar('Service is Created', 'OK');
    this.subInjectService.changeUpperRightSliderState({ state: 'close' });
  }
}
