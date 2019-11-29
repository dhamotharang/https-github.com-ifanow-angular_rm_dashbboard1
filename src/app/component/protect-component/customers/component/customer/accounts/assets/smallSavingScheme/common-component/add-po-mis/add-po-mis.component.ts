import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth-service/authService';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { CustomerService } from '../../../../../customer.service';
import { EventService } from 'src/app/Data-service/event.service';
import { MY_FORMATS2 } from 'src/app/constants/date-format.constant';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-add-po-mis',
  templateUrl: './add-po-mis.component.html',
  styleUrls: ['./add-po-mis.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2 },
  ],
})
export class AddPoMisComponent implements OnInit {
  show: boolean;
  _inputData: any;
  pomisForm: any;
  ownerData: any;
  ownerName: any;
  selectedFamilyData: any;
  isAmtValid: boolean;
  isDateValid: boolean;
  isTypeValid: boolean;
  advisorId: any;
  familyMemberId: any;

  constructor(private fb: FormBuilder, public subInjectService: SubscriptionInject, public custumService: CustomerService, public eventService: EventService) { }
  @Input()
  set data(inputData) {
    this._inputData = inputData;
  }

  get data() {
    return this._inputData;
  }
  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.show = false;
    this.getPomisData(this.data);

  }
  close() {
    // let data=this._inputData.loanTypeId;
    this.subInjectService.changeNewRightSliderState({ state: 'close' });
  }
  display(value) {
    console.log('value selected', value)
    this.ownerName = value.userName;
    this.familyMemberId = value
  }
  getPomisData(data) {
    if (data == undefined) {
      data = {};
    }
    this.pomisForm = this.fb.group({
      ownerName: [data.ownerName, [Validators.required]],
      amtInvested: [data.amountInvested, [Validators.required, Validators.min(500)]],
      commencementdate: [new Date(data.commencementDate), [Validators.required]],
      ownershipType: [(data.ownerTypeId) + "", [Validators.required]],
      poBranch: [data.postOfficeBranch],
      nominee: [data.nominee],
      accNumber: [(data.bankAccountNumber)],
      description: [data.description],
      familyMemberId: [[(data == undefined) ? '' : data.familyMemberId], [Validators.required]],

    });

    this.getFormControl().amtInvested.maxLength = 20;
    this.getFormControl().accNumber.maxLength = 20;
    this.familyMemberId = this.pomisForm.controls.familyMemberId.value,
      this.familyMemberId = this.familyMemberId[0]
    this.ownerData = this.pomisForm.controls;

  }
  getFormControl() {
    return this.pomisForm.controls;
  }
  saveFormData(state) {
    if (this.pomisForm.controls.amtInvested.invalid) {
      this.isAmtValid = true;
      return;
    } else if (this.pomisForm.controls.commencementdate.invalid) {
      this.isDateValid = true;
      return;
    } else if (this.pomisForm.controls.ownershipType.invalid) {
      this.isTypeValid = true;
      return;
    } else {
      const obj = {
        ownerName: (this.ownerName == null) ? this.pomisForm.controls.ownerName.value : this.ownerName,
        amtInvested: this.pomisForm.controls.amtInvested.value,
        commencementdate: this.pomisForm.controls.commencementdate.value,
        ownershipType: this.pomisForm.controls.ownershipType.value,
        poBranch: this.pomisForm.controls.poBranch.value,
        nominee: this.pomisForm.controls.nominee.value,
        accNumber: this.pomisForm.controls.accNumber.value,
        description: this.pomisForm.controls.description.value,
        familyMemberId: this.familyMemberId.id

      }
      obj.amtInvested = parseInt(obj.amtInvested);
      obj.accNumber = parseInt(obj.accNumber);
      obj.commencementdate = obj.commencementdate.toISOString().slice(0, 10);


      if (this._inputData == 'Add') {
        let objToSend = {
          "id": this._inputData.id,
          "advisorId": this.advisorId,
          "clientId": 2978,
          "familyMemberId": obj.familyMemberId,
          "ownerName": obj.ownerName,
          "amountInvested": obj.amtInvested,
          "commencementDate": obj.commencementdate,
          "postOfficeBranch": obj.poBranch,
          "bankAccountNumber": obj.accNumber,
          "ownerTypeId": obj.ownershipType,
          "nominee": obj.nominee,
          "description": obj.description,
          // "createdDate":obj.createdDate,
        }
        console.log("obj", obj);
        this.custumService.addPOMIS(objToSend).subscribe(
          data => this.addPOMISRes(data)
        );
      } else {
        let editObj = {
          "id": this._inputData.id,
          "clientId": 2978,
          "familyMemberId": obj.familyMemberId,
          "advisorId": this.advisorId,
          "ownerName": obj.ownerName,
          "amountInvested": obj.amtInvested,
          "commencementDate": obj.commencementdate,
          "postOfficeBranch": obj.poBranch,
          "bankAccountNumber": obj.accNumber,
          "ownerTypeId": obj.ownershipType,
          "nominee": obj.nominee,
          "description": obj.description,
          // "createdDate":"2001-01-01"
        }
        this.custumService.editPOMIS(editObj).subscribe(
          data => this.editPOMISRes(data)
        );
      }
    }
  }
  addPOMISRes(data) {
    console.log(data);
    if (data) {
      console.log(data);
      this.subInjectService.changeNewRightSliderState({ state: 'close' })
      this.eventService.openSnackBar('Liabilities added successfully', 'OK');
    } else {
      this.eventService.openSnackBar('Error', 'dismiss');

    }
  }
  editPOMISRes(data) {
    console.log(data);
    if (data) {
      console.log(data);
      this.subInjectService.changeNewRightSliderState({ state: 'close' })
      this.eventService.openSnackBar('Liabilities edited successfully', 'OK');
    } else {
      this.eventService.openSnackBar('Error', 'dismiss');
    }
  }
  showMore() {
    this.show = true;
  }
  showLess() {
    this.show = false;

  }
}
