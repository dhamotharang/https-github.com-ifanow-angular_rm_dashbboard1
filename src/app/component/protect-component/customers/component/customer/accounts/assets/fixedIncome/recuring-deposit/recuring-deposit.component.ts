import { Component, Input, OnInit, ViewChildren, QueryList } from '@angular/core';
import { AuthService } from 'src/app/auth-service/authService';
import { MAT_DATE_FORMATS, MatInput } from '@angular/material';
import { MY_FORMATS2 } from 'src/app/constants/date-format.constant';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomerService } from '../../../../customer.service';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import * as moment from 'moment';
import { EventService } from 'src/app/Data-service/event.service';
import { UtilService, ValidatorType } from 'src/app/services/util.service';


@Component({
  selector: 'app-recuring-deposit',
  templateUrl: './recuring-deposit.component.html',
  styleUrls: ['./recuring-deposit.component.scss'],
  providers: [
    [DatePipe],
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2 },
  ],
})
export class RecuringDepositComponent implements OnInit {
  validatorType = ValidatorType;
  maxDate = new Date();
  advisorId: any;
  showHide = false;
  dataSource: any;
  recuringDeposit: any;
  isownerName = false;
  isMonthlyContribution = false;
  isOwnerType = false;
  isCommencementDate = false;
  isInterestRate = false;
  isCompound = false;
  isLinkBankAc = false;
  isFDType = false;
  isBankName = false;
  isPayOpt = false;
  isMaturityDate = false;
  isMaturity = false;
  isDescription = false;
  isTenure = false;
  inputData: any;
  ownerName: any;
  fdMonths: string[];
  tenure: any;
  getDate: string;
  maturityDate: any;
  selectedFamilyData: any;
  ownerData: any;
  familyMemberId: any;
  clientId: any;
  nomineesListFM: any = [];
  flag: any;
  callMethod:any;
  nomineesList = [];
  depoData: any = [];
  nominees: any = [];
  adviceShowHeaderAndFooter: boolean = true;
  @ViewChildren(MatInput) inputs: QueryList<MatInput>;
  constructor(private event: EventService, private fb: FormBuilder, private custumService: CustomerService,
    public subInjectService: SubscriptionInject, private datePipe: DatePipe, public utils: UtilService) {
  }

  @Input()
  set data(data) {
    this.inputData = data;
    this.getdataForm(data);
  }

  get data() {
    return this.inputData;
  }
  @Input() popupHeaderText: string = 'Add Recurring deposits';

  ngOnInit() {
    if (this.data && this.data.flag) {
      this.adviceShowHeaderAndFooter = false;
    } else {
      this.adviceShowHeaderAndFooter = true;
    }
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
    this.getdataForm(this.inputData);
    // this.getdataForm()
    this.fdMonths = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120']
  }



  Close(flag) {
    this.subInjectService.changeNewRightSliderState({ state: 'close', refreshRequired: flag })
  }

  // ===================owner-nominee directive=====================//
  display(value) {
    console.log('value selected', value)
    this.ownerName = value.userName;
    this.familyMemberId = value.id
  }

  lisNominee(value) {
    this.ownerData.Fmember = value;
    this.nomineesListFM = Object.assign([], value);
  }

  disabledMember(value, type) {
    this.callMethod = {
      methodName : "disabledMember",
      ParamValue : value,
      disControl : type
    }
  }

  displayControler(con) {
    console.log('value selected', con);
    if(con.owner != null && con.owner){
      this.recuringDeposit.controls.getCoOwnerName = con.owner;
    }
    if(con.nominee != null && con.nominee){
      this.recuringDeposit.controls.getNomineeName = con.nominee;
    }
  }

  onChangeJointOwnership(data) {
    this.callMethod = {
      methodName : "onChangeJointOwnership",
      ParamValue : data
    }
  }

  /***owner***/ 

  get getCoOwner() {
    return this.recuringDeposit.get('getCoOwnerName') as FormArray;
  }

  addNewCoOwner(data) {
    this.getCoOwner.push(this.fb.group({
      name: [data ? data.name : '', [Validators.required]], share: [data ? String(data.share) : '', [Validators.required]], familyMemberId: [data ? data.familyMemberId : 0], id: [data ? data.id : 0]
    }));
    if (!data || this.getCoOwner.value.length < 1) {
      for (let e in this.getCoOwner.controls) {
        this.getCoOwner.controls[e].get('share').setValue('');
      }
    }

    if(this.getCoOwner.value.length > 1 && !data){
     let share = 100/this.getCoOwner.value.length;
     for (let e in this.getCoOwner.controls) {
      if(!Number.isInteger(share) && e == "0"){
        this.getCoOwner.controls[e].get('share').setValue(Math.round(share) + 1);
      }
      else{
        this.getCoOwner.controls[e].get('share').setValue(Math.round(share));
      }
     }
    }
    else{
      this.disabledMember(null, null)
    }
  }

  removeCoOwner(item) {
    this.getCoOwner.removeAt(item);
    if (this.recuringDeposit.value.getCoOwnerName.length == 1) {
      this.getCoOwner.controls['0'].get('share').setValue('100');
    } else {
      let share = 100/this.getCoOwner.value.length;
      for (let e in this.getCoOwner.controls) {
        if(!Number.isInteger(share) && e == "0"){
          this.getCoOwner.controls[e].get('share').setValue(Math.round(share) + 1);
        }
        else{
          this.getCoOwner.controls[e].get('share').setValue(Math.round(share));
        }
      }
    }
    this.disabledMember(null, null);
  }
  /***owner***/ 

  /***nominee***/ 

  get getNominee() {
    return this.recuringDeposit.get('getNomineeName') as FormArray;
  }

  removeNewNominee(item) {
    this.getNominee.removeAt(item);
    if (this.recuringDeposit.value.getNomineeName.length == 1) {
      this.getNominee.controls['0'].get('sharePercentage').setValue('100');
    } else {
      let share = 100/this.getNominee.value.length;
      for (let e in this.getNominee.controls) {
        if(!Number.isInteger(share) && e == "0"){
          this.getNominee.controls[e].get('sharePercentage').setValue(Math.round(share) + 1);
        }
        else{
          this.getNominee.controls[e].get('sharePercentage').setValue(Math.round(share));
        }
      }
    }
    this.disabledMember(null, null);
  }


  
  addNewNominee(data) {
    this.getNominee.push(this.fb.group({
      name: [data ? data.name : ''], sharePercentage: [data ? String(data.sharePercentage) : 0], familyMemberId: [data ? data.familyMemberId : 0], id: [data ? data.id : 0]
    }));
    if (!data || this.getNominee.value.length < 1) {
      for (let e in this.getNominee.controls) {
        this.getNominee.controls[e].get('sharePercentage').setValue(0);
      }
    }

    if(this.getNominee.value.length > 1 && !data){
      let share = 100/this.getNominee.value.length;
      for (let e in this.getNominee.controls) {
        if(!Number.isInteger(share) && e == "0"){
          this.getNominee.controls[e].get('sharePercentage').setValue(Math.round(share) + 1);
        }
        else{
          this.getNominee.controls[e].get('sharePercentage').setValue(Math.round(share));
        }
      }
     }
     else{
      this.disabledMember(null, null)
    }
    
  }
  /***nominee***/ 
  // ===================owner-nominee directive=====================//

 
  ownerDetails(value) {
    this.familyMemberId = value.id;
  }
  
  keyPressRdNumber(event: any) {
    var k = event.keyCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 45 || k == 47 || k == 8 || (k >= 48 && k <= 57));
  }

  showLess(value) {
    if (value == true) {
      this.showHide = false;
    } else {
      this.showHide = true;
    }
  }

  getDateYMD() {
    this.tenure = moment(this.recuringDeposit.controls.commencementDate.value).add(this.recuringDeposit.controls.tenure.value, 'months');
    this.getDate = this.datePipe.transform(this.tenure, 'yyyy-MM-dd')
    console.log('recurring deposit', this.getDate)
    return this.getDate;
  }

  getdataForm(data) {
    this.flag = data
    if (data == undefined) {
      data = {}
    }
    this.depoData = data;
    this.recuringDeposit = this.fb.group({
      getCoOwnerName: this.fb.array([this.fb.group({
        name: ['',[Validators.required]],
        share: [0,[Validators.required]],
        familyMemberId: [0],
        id:[0]
      })]),
      // ownerName: [(data == undefined) ? '' : data.ownerName, [Validators.required]],
      monthlyContribution: [(data == undefined) ? '' : data.monthlyContribution, [Validators.required]],
      commencementDate: [(data.commencementDate == undefined) ? null : new Date(data.commencementDate), [Validators.required]],
      interestRate: [(data == undefined) ? '' : data.interestRate, [Validators.required]],
      compound: [(data.interestCompounding == undefined) ? '' : (data.interestCompounding) + "", [Validators.required]],
      linkBankAc: [(data == undefined) ? '' : data.linkedBankAccount,],
      tenure: [(data == undefined) ? '' : data.tenure, [Validators.required, Validators.min(1), Validators.max(120)]],
      description: [(data == undefined) ? '' : data.description,],
      bankName: [(data == undefined) ? '' : data.bankName,],
      // ownerType: [(data == undefined) ? '' : (data.ownershipType) + "", [Validators.required]],
      rdNo: [(data == undefined) ? '' : data.rdNumber,],
      id: [(data == undefined) ? 0 : data.id,],
      familyMemberId: [[(data == undefined) ? '' : data.familyMemberId],],
      getNomineeName: this.fb.array([this.fb.group({
        name: [''],
        sharePercentage: [0],
        familyMemberId: [0],
        id:[0]
      })]),
    });

    // this.getFormControl().ownerName.maxLength = 40;
    this.getFormControl().description.maxLength = 60;
    this.getFormControl().rdNo.maxLength = 10;
    this.getFormControl().bankName.maxLength = 15;
     // ==============owner-nominee Data ========================\\
  /***owner***/ 
  if(this.recuringDeposit.value.getCoOwnerName.length == 1){
    this.getCoOwner.controls['0'].get('share').setValue('100');
  }

  if (data.ownerList) {
    this.getCoOwner.removeAt(0);
    data.ownerList.forEach(element => {
      this.addNewCoOwner(element);
    });
  }
  
/***owner***/ 

/***nominee***/ 
if(data.nomineeList){
  this.getNominee.removeAt(0);
  data.nomineeList.forEach(element => {
    this.addNewNominee(element);
  });
}
/***nominee***/ 

this.ownerData = {Fmember: this.nomineesListFM, controleData:this.recuringDeposit}
// this.formData = this.recuringDeposit;
// ==============owner-nominee Data ========================\\
    if (data != undefined) {
      this.familyMemberId = this.recuringDeposit.controls.familyMemberId.value
      this.familyMemberId = this.familyMemberId[0]
    }
    // this.ownerData = this.recuringDeposit.controls;

  }

  getFormDataNominee(data) {
    this.nomineesList = data.controls;
    console.log(this.nomineesList, "this.nomineesList 123")
  }

  getFormControl(): any {
    return this.recuringDeposit.controls;
  }

  saveRecuringDeposit() {

    if (this.nomineesList) {

      this.nomineesList.forEach(element => {
        let obj = {
          "name": element.controls.name.value,
          "sharePercentage": element.controls.sharePercentage.value,
          "id": (element.controls.id.value) ? element.controls.id.value : 0,
          "familyMemberId": (element.controls.familyMemberId.value) ? element.controls.familyMemberId.value : 0
        }
        this.nominees.push(obj)
      });
    }
    if (this.recuringDeposit.controls.commencementDate.value != null || this.recuringDeposit.controls.tenure.value != null) {
      this.tenure = this.getDateYMD()
      this.maturityDate = this.tenure
    }
    if (this.recuringDeposit.invalid) {
      this.inputs.find(input => !input.ngControl.valid).focus();
      this.recuringDeposit.markAllAsTouched();
      return;
    }
    //  else if (this.recuringDeposit.get('ownerType').invalid) {
    //   this.recuringDeposit.get('ownerType').markAsTouched();
    //   this.isOwnerType = true;
    //   return;
    // }
    else {

      let obj = {
        advisorId: this.advisorId,
        clientId: this.clientId,
        familyMemberId: this.familyMemberId,
        // ownerName: (this.ownerName == undefined) ? this.recuringDeposit.controls.ownerName.value : this.ownerName,
        ownerList: this.recuringDeposit.value.getCoOwnerName,
        monthlyContribution: this.recuringDeposit.controls.monthlyContribution.value,
        interestRate: this.recuringDeposit.controls.interestRate.value,
        commencementDate: this.datePipe.transform(this.recuringDeposit.controls.commencementDate.value, 'yyyy-MM-dd'),
        linkedBankAccount: this.recuringDeposit.controls.linkBankAc.value,
        description: this.recuringDeposit.controls.description.value,
        tenure: this.recuringDeposit.controls.tenure.value,
        maturityDate: this.maturityDate,
        bankName: this.recuringDeposit.controls.bankName.value,
        rdNumber: this.recuringDeposit.controls.rdNo.value,
        interestCompounding: this.recuringDeposit.controls.compound.value,
        nomineeList: this.recuringDeposit.value.getNomineeName,
        // nominees: this.nominees,
        id: this.recuringDeposit.value.id
      }

      obj.nomineeList.forEach(element => {
        if(element.name == ''){
          obj.nomineeList= [];
        }
        else{
          obj.nomineeList= this.recuringDeposit.value.getNomineeName;
        }
      });
      console.log('recuringDeposit', obj)
      this.dataSource = obj;
      let adviceObj = {
        advice_id: this.advisorId,
        adviceStatusId: 5,
        stringObject: obj,
        adviceDescription: "manualAssetDescription"
      }
      if (this.flag == 'adviceRecurringDeposit') {
        this.custumService.getAdviceRd(adviceObj).subscribe(
          data => this.getAdviceRdRes(data),
          err => this.event.openSnackBar(err, "Dismiss")
        );
      }
      else if (this.recuringDeposit.controls.id.value == undefined) {
        this.custumService.addRecurringDeposit(obj).subscribe(
          data => this.addrecuringDepositRes(data),
          err => this.event.openSnackBar(err, "Dismiss")
        );
      } else {
        //edit call
        this.custumService.editRecurringDeposit(obj).subscribe(
          data => this.editrecuringDepositRes(data),
          err => this.event.openSnackBar(err, "Dismiss")
        );
      }

    }
  }
  onChange(event) {
    if (parseInt(event.target.value) > 100) {
      event.target.value = "100";
      this.recuringDeposit.get('interestRate').setValue(event.target.value);
    }
  }
  getAdviceRdRes(data) {
    console.log(data);
  }
  addrecuringDepositRes(data) {
    console.log('addrecuringDepositRes', data)
    this.event.openSnackBar('Added successfully!', 'Dismiss');
    this.subInjectService.changeNewRightSliderState({ state: 'close', data, refreshRequired: true })
  }

  editrecuringDepositRes(data) {
    this.event.openSnackBar('Updated successfully!', 'Dismiss');
    this.subInjectService.changeNewRightSliderState({ state: 'close', data, refreshRequired: true })
  }

  isFormValuesForAdviceValid() {
    if (this.recuringDeposit.valid || (this.recuringDeposit.valid && this.nomineesList.length !== 0)) {
      return true;
    } else {
      return false;
    }
  }
}
