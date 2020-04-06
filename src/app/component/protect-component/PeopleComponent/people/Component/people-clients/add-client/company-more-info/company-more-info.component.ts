import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SubscriptionInject} from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import {PeopleService} from 'src/app/component/protect-component/PeopleComponent/people.service';
import {EventService} from 'src/app/Data-service/event.service';
import {ValidatorType} from '../../../../../../../../services/util.service';
import {DatePipe} from '@angular/common';
import {EventEmitter, Output} from '@angular/core/src/metadata/*';
import {AuthService} from '../../../../../../../../auth-service/authService';

@Component({
  selector: 'app-company-more-info',
  templateUrl: './company-more-info.component.html',
  styleUrls: ['./company-more-info.component.scss']
})
export class CompanyMoreInfoComponent implements OnInit {
  moreInfoData: any = {};
  advisorId: any;
  mobileNumberFlag = 'Mobile';
  mobileData: any;
  invCategory = '1';
  validatorType = ValidatorType;
  prevData;

  moreInfoForm;
  @Input() fieldFlag;
  @Output() tabChange = new EventEmitter();

  constructor(private fb: FormBuilder, private subInjectService: SubscriptionInject, private peopleService: PeopleService, private eventService: EventService, private datePipe: DatePipe) {
  }

  @Input() set data(data) {
    this.advisorId = AuthService.getAdvisorId();
    this.prevData = data;
    if (!data) {
      this.prevData = {};
    }
    console.log(data);
    this.createMoreInfoForm(null);
  }

  createMoreInfoForm(data) {
    (data == undefined) ? data = {} : data;
    this.moreInfoForm = this.fb.group({
      displayName: [data.displayName],
      adhaarNo: [data.aadhaarNumber],
      maritalStatus: [(data.martialStatusId) ? String(data.martialStatusId) : '1'],
      anniversaryDate: [],
      bio: [data.bio],
      myNotes: [data.remarks],
      name: [data.name],
      email: [data.email, [Validators.pattern(this.validatorType.EMAIL)]],
      pan: [data.pan, [Validators.pattern(this.validatorType.PAN)]],
      designation: [],
      gender: ['1'],
    });
  }

  ngOnInit() {

  }

  getNumberDetails(data) {
    console.log(data);
    this.mobileData = data;
  }

  getCompanyDetails(data) {
    const obj = {
      userId: data.userId,
      userType: data.userType
    };
    this.peopleService.getCompanyPersonDetail(obj).subscribe(
      responseData => {
        if (responseData && responseData.length > 0) {
          this.moreInfoData = responseData[0];
          this.createMoreInfoForm(this.moreInfoData);
        }
        console.log(responseData);
      }, err => this.eventService.openSnackBar(err, 'Dismiss')
    );
  }

  saveNext(flag) {
    const mobileList = [];
    if (this.mobileData) {
      this.mobileData.controls.forEach(element => {
        console.log(element);
        mobileList.push({
          userType: 8,
          mobileNo: element.get('number').value,
        });
      });
    }
    const emailId = this.moreInfoForm.value.email;
    const emailList = [];
    if (emailId) {
      emailList.push({
        userType: 8,
        email: emailId
      });
    }
    const obj = {
      emailList,
      displayName: this.moreInfoForm.controls.displayName.value,
      bio: this.moreInfoForm.controls.bio.value,
      martialStatusId: this.moreInfoForm.controls.maritalStatus.value,
      occupationId: this.moreInfoForm.controls.designation.value,
      companyPersonDetailId: this.moreInfoData.companyPersonDetailId,
      pan: this.moreInfoForm.value.pan,
      clientId: this.moreInfoData.clientId ? this.moreInfoData.clientId : this.prevData.clientId,
      kycComplaint: 0,
      roleId: 0,
      genderId: this.moreInfoForm.value.genderId,
      aadharCard: this.moreInfoForm.controls.adhaarNo.value,
      dateOfBirth: this.datePipe.transform(this.moreInfoData.dateOfBirth, 'dd/MM/yyyy'),
      userId: this.moreInfoData.clientId ? this.moreInfoData.clientId : this.prevData.clientId,
      mobileList,
      name: this.moreInfoForm.value.name,
      bioRemarkId: this.moreInfoData.bioRemarkId,
      remarks: this.moreInfoForm.controls.myNotes.value,
    };
    if (this.moreInfoData.companyPersonDetailId) {
      this.peopleService.updateCompanyPersonDetail(obj).subscribe(
        data => {
          console.log(data);
          if (data) {
            (flag == 'Next') ? this.tabChange.emit(1) : this.close(data);
          } else {
            this.eventService.openSnackBar('Unknown error', 'Dismiss');
          }
        },
        err => this.eventService.openSnackBar(err, 'Dismiss')
      );
    } else {
      this.peopleService.saveCompanyPersonDetail(obj).subscribe(
        data => {
          console.log(data);
          (flag == 'Next') ? this.tabChange.emit(1) : this.close(data);
        },
        err => this.eventService.openSnackBar(err, 'Dismiss')
      );
    }
  }

  close(data) {
    this.subInjectService.changeNewRightSliderState({state: 'close', clientData: data});
  }
}
