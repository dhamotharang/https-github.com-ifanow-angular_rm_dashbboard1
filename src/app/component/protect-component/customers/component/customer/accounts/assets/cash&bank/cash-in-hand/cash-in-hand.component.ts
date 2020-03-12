import { Component, Input, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../../../customer.service';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { DatePipe } from '@angular/common';
import { MAT_DATE_FORMATS, MatInput } from '@angular/material';
import { MY_FORMATS2 } from 'src/app/constants/date-format.constant';
import { AuthService } from 'src/app/auth-service/authService';
import { UtilService, ValidatorType } from 'src/app/services/util.service';
import { EventService } from 'src/app/Data-service/event.service';

@Component({
  selector: 'app-cash-in-hand',
  templateUrl: './cash-in-hand.component.html',
  styleUrls: ['./cash-in-hand.component.scss'],
  providers: [
    [DatePipe],
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2 },
  ],
})
export class CashInHandComponent implements OnInit {
  validatorType = ValidatorType
  inputData: any;
  ownerName: any;
  familyMemberId: any;
  isCashBalance = false;
  isBalanceAsOn = false;
  ownerData: any;
  cashInHand: any;
  showHide = false;
  advisorId: any;
  private clientId: any;
  nomineesListFM: any;
  flag: any;
  adviceShowHeaderAndFooter: boolean = true;
  @ViewChildren(MatInput) inputs: QueryList<MatInput>;
  editData: any;
  constructor(private fb: FormBuilder, private custumService: CustomerService,
    public subInjectService: SubscriptionInject, private datePipe: DatePipe, public utils: UtilService, public eventService: EventService) {
  }

  @Input()
  set data(data) {
    this.inputData = data;
    this.getdataForm(data);
  }

  get data() {
    return this.inputData;
  }

  @Input() popupHeaderText: string = 'Add Cash in hand';

  ngOnInit() {
    if (this.data && this.data.flag) {
      this.adviceShowHeaderAndFooter = false;
    } else {
      this.adviceShowHeaderAndFooter = true;
    }
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
    this.getdataForm(this.data);

  }

  display(value) {
    console.log('value selected', value);
    this.ownerName = value.userName;
    this.familyMemberId = value.id;
  }
  lisNominee(value) {
    console.log(value)
    this.nomineesListFM = Object.assign([], value.familyMembersList);
  }
  Close(flag) {
    this.subInjectService.changeNewRightSliderState({ state: 'close', refreshRequired: flag });
  }

  showLess(value) {
    if (value == true) {
      this.showHide = false;
    } else {
      this.showHide = true;
    }
  }

  getdataForm(data) {
    this.flag = data;
    // (!data) ? data = {} : (data.assetDataOfAdvice) ? data = data.assetDataOfAdvice : ''

    if (data == undefined) {
      data = {};
      this.flag = "addCASHINHAND";
    }
    else {
      this.flag = "editCASHINHAND";
      (data.assetDataOfAdvice) ? data = data.assetDataOfAdvice : this.editData = data;
    }
    this.cashInHand = this.fb.group({
      ownerName: [(data.ownerName == undefined) ? '' : data.ownerName, [Validators.required]],
      balanceAsOn: [(data.balanceAsOn == undefined) ? '' : new Date(data.balanceAsOn), [Validators.required]],
      cashBalance: [(data.cashValue == undefined) ? '' : data.cashValue, [Validators.required]],
      // bankAcNo: [(data.bankAccountNumber == undefined) ? '' : data.bankAccountNumber, [Validators.required]],
      description: [(data.description == undefined) ? '' : data.description,],
      familyMemberId: [[(data.familyMemberId == undefined) ? '' : data.familyMemberId],]
    });
    this.ownerData = this.cashInHand.controls;
    this.familyMemberId = this.cashInHand.controls.familyMemberId.value;
    this.familyMemberId = this.familyMemberId[0];
  }

  getFormControl(): any {
    return this.cashInHand.controls;
  }

  saveCashInHand() {
    if (this.cashInHand.invalid) {
      this.inputs.find(input => !input.ngControl.valid).focus();
      this.cashInHand.markAllAsTouched();
    } else {
      const obj = {
        advisorId: this.advisorId,
        clientId: this.clientId,
        familyMemberId: this.familyMemberId,
        ownerName: (this.ownerName == undefined) ? this.cashInHand.controls.ownerName.value : this.ownerName,
        balanceAsOn: this.datePipe.transform(this.cashInHand.controls.balanceAsOn.value, 'yyyy-MM-dd'),
        cashValue: this.cashInHand.controls.cashBalance.value,
        // bankAccountNumber: this.cashInHand.controls.bankAcNo.value,
        description: this.cashInHand.controls.description.value,
      };
      let adviceObj = {
        advice_id: this.advisorId,
        adviceStatusId: 5,
        stringObject: obj,
        adviceDescription: "manualAssetDescription"
      }
      if (this.flag == "addCASHINHAND") {
        this.custumService.addCashInHand(obj).subscribe(
          data => this.addCashInHandRes(data)
        );
      } else if (this.flag == 'adviceCashInHand') {
        this.custumService.getAdviceCashInHand(adviceObj).subscribe(
          data => this.getAdviceCashInHandRes(data),
        );
      } else {
        // edit call
        obj['id'] = this.editData.id;
        this.custumService.editCashInHand(obj).subscribe(
          data => this.editCashInHandRes(data)
        );
      }
    }
  }
  getAdviceCashInHandRes(data) {
    this.eventService.openSnackBar('Cash in hand added successfully', 'OK');
    this.subInjectService.changeNewRightSliderState({ state: 'close', data, refreshRequired: true });

  }
  addCashInHandRes(data) {
    console.log('addrecuringDepositRes', data);
    this.subInjectService.changeNewRightSliderState({ state: 'close', data, refreshRequired: true });
    this.eventService.openSnackBar('Cash in hand added successfully', 'OK');

  }

  editCashInHandRes(data) {
    this.subInjectService.changeNewRightSliderState({ state: 'close', data, refreshRequired: true });
    this.eventService.openSnackBar('Cash in hand edited successfully', 'OK');

  }

}
