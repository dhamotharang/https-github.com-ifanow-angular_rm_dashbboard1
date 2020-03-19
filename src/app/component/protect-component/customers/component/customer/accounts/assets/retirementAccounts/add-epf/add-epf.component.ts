import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomerService } from '../../../../customer.service';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { DatePipe } from '@angular/common';
import { MAT_DATE_FORMATS, MatSort, MatInput } from '@angular/material';
import { MY_FORMATS2 } from 'src/app/constants/date-format.constant';
import { AuthService } from 'src/app/auth-service/authService';
import { UtilService, ValidatorType } from 'src/app/services/util.service';
import { EventService } from 'src/app/Data-service/event.service';
@Component({
  selector: 'app-add-epf',
  templateUrl: './add-epf.component.html',
  styleUrls: ['./add-epf.component.scss'],
  providers: [
    [DatePipe],
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2 },
  ],
})
export class AddEPFComponent implements OnInit {
  validatorType = ValidatorType
  maxDate = new Date();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isBalanceAsOn = false;
  isAnnualSalGrowth = false;
  isCurrentEPFBal = false;
  isEmployerContry = false;
  isEmployeeContry = false;
  inputData: any;
  ownerName: any;
  familyMemberId: any;
  showHide = false;
  epf: any;
  callMethod:any;
  ownerData: any;
  advisorId: any;
  clientId: any;
  isOwnerName = false;
  nomineesListFM: any= [];
  dataFM = [];
  familyList: any;
  flag: any;
  adviceShowHeaderAndFooter: boolean = true;
  @ViewChildren(MatInput) inputs: QueryList<MatInput>;
  constructor(private event: EventService, private router: Router, private fb: FormBuilder, private custumService: CustomerService, public subInjectService: SubscriptionInject, private datePipe: DatePipe, public utils: UtilService) { }
  @Input()
  set data(data) {
    this.inputData = data;
    this.getdataForm(data);
  }

  get data() {
    return this.inputData;
  }

  @Input() popupHeaderText: string = 'Add Employees providend fund (EPF)';

  ngOnInit() {
    if (this.data && this.data.flag) {
      this.adviceShowHeaderAndFooter = false;
    } else {
      this.adviceShowHeaderAndFooter = true;
    }
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
  }
  
  nomineesList() {
    this.dataFM = this.nomineesListFM
    if (this.dataFM.length > 0) {
      let name = this.ownerName
      // var evens = _.reject(this.dataFM, function (n) {
      //   return n.userName == name;
      // });
      let evens = this.dataFM.filter(delData => delData.userName != name)
      this.familyList = evens
    }

    console.log('familyList', this.familyList)
  }

  // getOwnerName(value) {
  //   console.log('selected', value);
  //   value.familyList = this.family;
  //   this.valueChange.emit(value);
  // }
  showLess(value) {
    if (value == true) {
      this.showHide = false;
    } else {
      this.showHide = true;
    }
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
    this.epf.controls.getCoOwnerName = con.owner;
  }
  if(con.nominee != null && con.nominee){
    this.epf.controls.getNomineeName = con.nominee;
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
  return this.epf.get('getCoOwnerName') as FormArray;
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
  if (this.epf.value.getCoOwnerName.length == 1) {
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
  return this.epf.get('getNomineeName') as FormArray;
}

removeNewNominee(item) {
  this.getNominee.removeAt(item);
  if (this.epf.value.getNomineeName.length == 1) {
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
  onChange(event) {
    if (parseInt(event.target.value) > 100) {
      event.target.value = "100";
      this.epf.get('annualSalGrowth').setValue(event.target.value);
    }
  }
  getdataForm(data) {
    this.flag = data;
    (!data) ? data = {} : (data.assetDataOfAdvice) ? data = data.assetDataOfAdvice : '';
    this.epf = this.fb.group({
      getCoOwnerName: this.fb.array([this.fb.group({
        name: ['',[Validators.required]],
        share: ['',[Validators.required]],
        familyMemberId: 0,
        id:0
      })]),
      // ownerName: [(data == undefined) ? '' : data.ownerName, [Validators.required]],
      employeeContry: [(data == undefined) ? '' : data.employeesMonthlyContribution, [Validators.required]],
      employerContry: [(data == undefined) ? '' : data.employersMonthlyContribution, [Validators.required]],
      annualSalGrowth: [(data == undefined) ? '' : data.annualSalaryGrowthRate, [Validators.required]],
      currentEPFBal: [(data == undefined) ? '' : data.currentEpfBalance, [Validators.required]],
      maturityYear: [(data == undefined) ? '' : (data.maturityYear),],
      balanceAsOn: [(data == undefined) ? '' : new Date(data.balanceAsOnDate), [Validators.required]],
      EPFNo: [(data == undefined) ? '' : (data.epfNo),],
      bankAcNo: [(data == undefined) ? '' : data.bankAccountNumber,],
      description: [(data == undefined) ? '' : data.description,],
      id: [(data == undefined) ? '' : data.id,],
      familyMemberId: [[(data == undefined) ? '' : data.familyMemberId],],
      getNomineeName: this.fb.array([this.fb.group({
        name: [''],
        sharePercentage: [0],
        familyMemberId: [0],
        id:[0]
      })])
    });
// ==============owner-nominee Data ========================\\
  /***owner***/ 
  if(this.epf.value.getCoOwnerName.length == 1){
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

this.ownerData = {Fmember: this.nomineesListFM, controleData:this.epf}
// ==============owner-nominee Data ========================\\    this.familyMemberId = this.epf.controls.familyMemberId.value
    // this.familyMemberId = this.familyMemberId[0]
  }
  getFormControl(): any {
    return this.epf.controls;
  }
  saveEPF() {
    if (this.epf.invalid) {
      this.inputs.find(input => !input.ngControl.valid).focus();
      this.epf.markAllAsTouched();
      return;
    } else {

      let obj = {
        advisorId: this.advisorId,
        clientId: this.clientId,
        ownerList: this.epf.value.getCoOwnerName,
        familyMemberId: this.familyMemberId,
        // ownerName: (this.ownerName == undefined) ? this.epf.controls.ownerName.value : this.ownerName,
        employeesMonthlyContribution: this.epf.controls.employeeContry.value,
        employersMonthlyContribution: this.epf.controls.employerContry.value,
        annualSalaryGrowthRate: this.epf.controls.annualSalGrowth.value,
        currentEpfBalance: this.epf.controls.currentEPFBal.value,
        maturityYear: this.epf.controls.maturityYear.value,
        balanceAsOnDate: this.datePipe.transform(this.epf.controls.balanceAsOn.value, 'yyyy-MM-dd'),
        epfNo: this.epf.controls.EPFNo.value,
        bankAccountNumber: this.epf.controls.bankAcNo.value,
        description: this.epf.controls.description.value,
        nomineeList: this.epf.value.getNomineeName,
        id: this.epf.controls.id.value
      }

      obj.nomineeList.forEach(element => {
        if(element.name == ''){
          obj.nomineeList= [];
        }
        else{
          obj.nomineeList= this.epf.value.getNomineeName;
        }
      });
      let adviceObj = {
        advice_id: this.advisorId,
        adviceStatusId: 5,
        stringObject: obj,
        adviceDescription: "manualAssetDescription"
      }
      if (this.epf.controls.id.value == undefined && this.flag != 'adviceEPF') {
        this.custumService.addEPF(obj).subscribe(
          data => this.addEPFRes(data), (error) => {
            this.event.showErrorMessage(error);
          }
        );
      }
      else if (this.flag == 'adviceEPF') {
        this.custumService.getAdviceEpf(adviceObj).subscribe(
          data => this.getAdviceEpfRes(data), (error) => {
            this.event.showErrorMessage(error);
          }
        );
      } else {
        //edit call
        this.custumService.editEPF(obj).subscribe(
          data => this.editEPFRes(data), (error) => {
            this.event.showErrorMessage(error);
          }
        );
      }
    }
  }
  getAdviceEpfRes(data) {
    this.event.openSnackBar('EPF added successfully!', 'Dismiss');
    this.subInjectService.changeNewRightSliderState({ flag: 'added', state: 'close', data, refreshRequired: true })

  }
  addEPFRes(data) {
    console.log('Added successfully!', data)
    this.event.openSnackBar('Added successfully!', 'Dismiss');
    this.subInjectService.changeNewRightSliderState({ flag: 'added', state: 'close', data, refreshRequired: true })
  }
  editEPFRes(data) {
    this.event.openSnackBar('Updated successfully!', 'Dismiss');
    this.subInjectService.changeNewRightSliderState({ flag: 'added', state: 'close', data, refreshRequired: true })
  }
}