import { Component, OnInit, Input } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material';
import { MY_FORMATS2 } from 'src/app/constants/date-format.constant';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { CustomerService } from '../../../../../customer.service';
import { AuthService } from 'src/app/auth-service/authService';
import { EventService } from 'src/app/Data-service/event.service';

@Component({
  selector: 'app-add-ppf',
  templateUrl: './add-ppf.component.html',
  styleUrls: ['./add-ppf.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2 },
  ]
})
export class AddPpfComponent implements OnInit {
  isOptionalField: boolean;
  advisorId: any;
  ownerName: any;
  familyMemberId: any;
  inputData: any;
  ownerData: any;
  ppfSchemeForm;
  transactionForm
  optionalppfSchemeForm;
  transactionList = [];
  addTransactionList: number;
  transactionData: any;
  editApi: any;
  clientId: number;
  constructor(private eventService: EventService, private fb: FormBuilder, private subInjectService: SubscriptionInject, private cusService: CustomerService) { }

  @Input()
  set data(data) {
    this.inputData = data;
    this.getdataForm(data);
  }

  get data() {
    return this.inputData;
  }
  ngOnInit() {
    this.isOptionalField = true;
    this.advisorId = AuthService.getAdvisorId();
    this.clientId=2978;
  }
  display(value) {
    console.log('value selected', value)
    this.ownerName = value.userName;
    this.familyMemberId = value.id
  }
  moreFields() {
    (this.isOptionalField) ? this.isOptionalField = false : this.isOptionalField = true
  }

  getdataForm(data) {
    if (data == undefined) {
      data = {};
    }
    else {
      this.editApi = data
    }
    this.ppfSchemeForm = this.fb.group({
      ownerName: [data.ownerName, [Validators.required]],
      accountBalance: [, [Validators.required]],
      balanceAsOn: [, [Validators.required]],
      commencementDate: [, [Validators.required]],
      futureContribution: [, [Validators.required]],
      frquency: [, [Validators.required]],
    })
    this.optionalppfSchemeForm = this.fb.group({
      description: [, [Validators.required]],
      bankName: [, [Validators.required]],
      linkedBankAccount: [, [Validators.required]],
      nominee: [, [Validators.required]]

    })
    this.ownerData = this.ppfSchemeForm.controls;
  }
  getFormData(data) {
    console.log(data)
    this.transactionData = data.controls
  }
  addPPF() {
    let finalTransctList = []
    this.transactionData.forEach(element => {
      let obj = {
        "date": element.controls.date.value._d,
        "amount": element.controls.amount.value,
        "paymentType": element.controls.transactionType.value
      }
      finalTransctList.push(obj)
    });
    if (this.ppfSchemeForm.get('accountBalance').invalid) {
      // this.ppfSchemeForm.get('accountBalance').status="INVALIDF"
      return;
    }
    else if (this.ppfSchemeForm.get('balanceAsOn').invalid) {
      return;
    }
    else if (this.ppfSchemeForm.get('commencementDate').invalid) {
      return;
    }
    else if (this.ppfSchemeForm.get('futureContribution').invalid) {
      return;
    }
    else if (this.ppfSchemeForm.get('frquency').invalid) {
      return;
    }
    else {
      if (this.editApi) {
        // let obj = {
        //   "familyMemberId": this.familyMemberId,
        //   "ownerName": this.ownerName,
        //   "accountBalance": this.ppfSchemeForm.get('accountBalance').value,
        //   "balanceAsOn": this.ppfSchemeForm.get('balanceAsOn').value,
        //   "commencementDate": "2019-10-10",
        //   "description": "saving schemes here",
        //   "bankName": "icici",
        //   "linkedBankAccount": "bankAcc112233",
        //   "nomineeName": "dev",
        //   "agentName": "myPlanner",
        //   "ppfTransactionType": 1,
        //   "transactionDate": "2020-12-12",
        //   "amount": 5000,
        //   "id": 13,
        //   "ppfTransactionId": 5
        // }
        // this.cusService.editPPF(obj).subscribe(
        //   data => this.addPPFResponse(data),
        //   err => this.eventService.openSnackBar(err)
        // )
      }
      else {
        let obj = {
          "advisorId": this.advisorId,
          "clientId": this.clientId,
          "ownerName": this.ownerName,
          "familyMemberId": this.familyMemberId,
          "accountBalance": this.ppfSchemeForm.get('accountBalance').value,
          "balanceAsOn":this.ppfSchemeForm.get('balanceAsOn').value,
          "commencementDate": this.ppfSchemeForm.get('commencementDate').value,
          "description": this.optionalppfSchemeForm.get('description').value,
          "bankName": this.optionalppfSchemeForm.get('bankName').value,
          "linkedBankAccount": this.optionalppfSchemeForm.get('linkedBankAccount').value,
          "nomineeName":this.optionalppfSchemeForm.get('nominee').value,
          "agentName": "akshay",
          "frequency":this.ppfSchemeForm.get('frquency').value,
          "futureApproxcontribution":this.ppfSchemeForm.get('futureContribution').value,
          "publicprovidendfundtransactionlist":finalTransctList
        }
        this.cusService.addPPFScheme(obj).subscribe(
          data => this.addPPFResponse(data),
          err => this.eventService.openSnackBar(err)
        )
      }
    }
  }
  addPPFResponse(data) {
    console.log(data)
  }
  close() {
    this.isOptionalField = true
    this.subInjectService.changeNewRightSliderState({ state: 'close' });
  }

}
