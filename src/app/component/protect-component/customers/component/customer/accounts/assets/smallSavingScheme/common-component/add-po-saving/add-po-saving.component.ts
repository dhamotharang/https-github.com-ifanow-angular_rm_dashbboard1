import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth-service/authService';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DATE_FORMATS} from '@angular/material';
import {MY_FORMATS2} from 'src/app/constants/date-format.constant';
import {CustomerService} from '../../../../../customer.service';
import {EventService} from 'src/app/Data-service/event.service';
import {SubscriptionInject} from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';

@Component({
  selector: 'app-add-po-saving',
  templateUrl: './add-po-saving.component.html',
  styleUrls: ['./add-po-saving.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2},
  ]
})
export class AddPoSavingComponent implements OnInit {
  isOptionalField: any;
  advisorId: any;
  clientId: number;
  inputData: any;
  ownerData: any;
  poSavingForm: any;
  ownerName: any;
  familyMemberId: any;
  poSavingOptionalForm: any;
  editApi: any;
  accBalance: number;

  constructor(private fb: FormBuilder, private cusService: CustomerService,
              private eventService: EventService, private subInjectService: SubscriptionInject) {
  }

  @Input()
  set data(data) {
    this.inputData = data;
    this.getdataForm(data);
    this.accBalance = 1500000;
  }

  get data() {
    return this.inputData;
  }

  display(value) {
    console.log('value selected', value);
    this.ownerName = value.userName;
    this.familyMemberId = value.id;
  }

  changeAccountBalance(data) {
    (this.poSavingForm.get('ownershipType').value == 1) ? (this.accBalance = 1500000,
        this.poSavingForm.get('ownershipType').setValidators([Validators.max(1500000)])
    ) : this.accBalance = 200000;
  }

  ngOnInit() {
    this.isOptionalField = true;
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();

  }

  getdataForm(data) {
    if (data == undefined) {
      data = {
        ownerTypeId: 1
      };
    } else {
      this.editApi = data;
    }
    this.poSavingForm = this.fb.group({
      ownerName: [data.ownerName, [Validators.required]],
      accBal: [data.accountBalance, [Validators.required, Validators.min(50), Validators.max(1500000)]],
      balAsOn: [new Date(data.balanceAsOn), [Validators.required]],
      ownershipType: [(data.ownerTypeId) ? String(data.ownerTypeId) : '1', [Validators.required]]
    });
    this.poSavingOptionalForm = this.fb.group({
      poBranch: [data.postOfficeBranch],
      nominee: [data.nominee],
      bankAccNo: [data.acNumber],
      description: [data.description]
    });
    this.ownerData = this.poSavingForm.controls;

  }

  moreFields() {
    (this.isOptionalField) ? this.isOptionalField = false : this.isOptionalField = true;
  }

  addPOSaving() {
    if (this.poSavingForm.get('accBal').invalid) {
      this.poSavingForm.get('accBal').markAsTouched();
      return;
    } else if (this.poSavingForm.get('balAsOn').invalid) {
      this.poSavingForm.get('balAsOn').markAsTouched();
      return;
    } else if (this.poSavingForm.get('ownershipType').invalid) {
      this.poSavingForm.get('ownershipType').markAsTouched();
      return;
    } else {
      if (this.editApi) {
        const obj = {
          id: this.editApi.id,
          familyMemberId: this.familyMemberId,
          balanceAsOn: this.poSavingForm.get('balAsOn').value,
          accountBalance: this.poSavingForm.get('accBal').value,
          postOfficeBranch: this.poSavingOptionalForm.get('poBranch').value,
          ownerTypeId: this.poSavingForm.get('ownershipType').value,
          nominee: this.poSavingOptionalForm.get('nominee').value,
          acNumber: this.poSavingOptionalForm.get('bankAccNo').value,
          description: this.poSavingOptionalForm.get('description').value,
          ownerName: this.ownerName
        };
        this.cusService.editPOSAVINGData(obj).subscribe(
          data => this.addPOSavingResponse(data),
          err => this.eventService.openSnackBar(err)
        );
      } else {
        const obj = {
          clientId: this.clientId,
          advisorId: this.advisorId,
          familyMemberId: this.familyMemberId,
          balanceAsOn: this.poSavingForm.get('balAsOn').value,
          accountBalance: this.poSavingForm.get('accBal').value,
          postOfficeBranch: this.poSavingOptionalForm.get('poBranch').value,
          ownerTypeId: this.poSavingForm.get('ownershipType').value,
          nominee: this.poSavingOptionalForm.get('nominee').value,
          acNumber: this.poSavingOptionalForm.get('bankAccNo').value,
          description: this.poSavingOptionalForm.get('description').value,
          ownerName: this.ownerName
        };
        this.cusService.addPOSAVINGScheme(obj).subscribe(
          data => this.addPOSavingResponse(data),
          err => this.eventService.openSnackBar(err)
        );
      }
    }
  }

  addPOSavingResponse(data) {
    this.close();
    console.log(data);
    (this.editApi) ? this.eventService.openSnackBar('PO_SAVING is edited', 'dismiss') : this.eventService.openSnackBar('PO_SAVING is edited', 'added');

  }

  close() {
    this.isOptionalField = true;
    this.subInjectService.changeNewRightSliderState({state: 'close'});
  }
}
