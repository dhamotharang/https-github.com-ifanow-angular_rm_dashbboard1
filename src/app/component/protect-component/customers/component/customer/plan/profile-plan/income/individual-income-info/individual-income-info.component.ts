import { Component, EventEmitter, Input, OnInit, Output, ViewChildren, QueryList } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { MatInput } from '@angular/material';
import { MY_FORMATS2 } from 'src/app/constants/date-format.constant';
import { AuthService } from 'src/app/auth-service/authService';
import { PlanService } from '../../../plan.service';
import { EventService } from 'src/app/Data-service/event.service';
import { ValidatorType } from 'src/app/services/util.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

import { DatePipe } from '@angular/common';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-individual-income-info',
  templateUrl: './individual-income-info.component.html',
  styleUrls: ['./individual-income-info.component.scss'],
  providers: [
    [DatePipe],
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class IndividualIncomeInfoComponent implements OnInit {
  date = new FormControl(moment());
  chosenYearHandler(normalizedYear: Moment, form, value) {
    const ctrlValue =this.date.value;
    ctrlValue.year(normalizedYear.year());
    // this.date.setValue(ctrlValue);
    form.get(value).setValue(ctrlValue);

  }
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, form, value) {
    const ctrlValue =this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    form.get(value).setValue(ctrlValue);

    datepicker.close();
  }
  individualIncomeData: any;
  finalIncomeAddList = [];
  addMoreFlag: boolean;
  incomeOption: any;
  singleIndividualIncome: any;
  singleIncomeType: any;
  incomePosition = 0;
  advisorId: any;
  clientId: any;
  editApiData: any;
  finalBonusList: any[];
  bonusList: any;
  showDateError: string;
  expectedBonusForm: any;
  @ViewChildren(MatInput) inputs: QueryList<MatInput>;
  isStatic = true;
  isErractic = false;
  constructor(private fb: FormBuilder, private subInjectService: SubscriptionInject, private planService: PlanService, private eventService: EventService) { }
  validatorType = ValidatorType;
  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
    if (!this.editApiData) {
      this.expectedBonusForm = this.fb.group({
        bonusList: new FormArray([])
      })
    }


  }
  incomeNetForm = this.fb.group({
    incomeOption: ['2', [Validators.required]],
    monthlyAmount: [, [Validators.required]],
    incomeStyle: [, [Validators.required]],
    continousTill: [String(1), [Validators.required]],
    continousTillYear: [, []],
    incomeGrowthRate: [, [Validators.required]],
    basicIncome: [, [Validators.required]],
    standardDeduction: [, [Validators.required]],
    deamessAlowance: [, [Validators.required]],
    hraRecieved: [, [Validators.required]],
    totalRentPaid: [, [Validators.required]],
    incomeStartDate: [, [Validators.required]],
    incomeEndDate: [, [Validators.required]],
    // expectingBonusValue: [, [Validators.required]],
    nextAppraisal: [],
    description: []
  })
  @Output() previousStep = new EventEmitter();
  @Input() set FinalIncomeList(data) {
    if (data == undefined) {
      this.incomeNetForm.controls.inc
      return;
    }
    this.addMoreFlag = false;
    this.incomeOption = "2"
    console.log(data)
    data.forEach(element => {
      if (element.selected) {
        element.incomeTypeList.forEach(checkedData => {
          let cloneElement = Object.assign({}, element)
          if (checkedData.checked) {
            cloneElement['finalIncomeList'] = checkedData;
            this.finalIncomeAddList.push(cloneElement)
          }
        })
      }
    });
    console.log(this.finalIncomeAddList)
    this.individualIncomeData = data
    this.singleIndividualIncome = this.finalIncomeAddList[this.incomePosition];
    console.log(this.singleIncomeType)
  }
  changeValidations() {
    if (this.incomeNetForm.get('continousTill').value == 3) {

      this.incomeNetForm.get('continousTillYear').setValidators([Validators.required]);
      this.incomeNetForm.get('continousTillYear').updateValueAndValidity();
      this.incomeNetForm.controls['continousTillYear'].setErrors({ 'required': true });
    } else {
      this.incomeNetForm.get('continousTillYear').setValidators(null);
      this.incomeNetForm.get('continousTillYear').updateValueAndValidity();
      this.incomeNetForm.controls['continousTillYear'].setErrors(null);
    }
  }
  @Input() set editIncomeData(data) {
    if (data == undefined) {
      this.incomeNetForm.controls.incomeOption.setValue('2');
      this.incomeNetForm.controls.incomeStyle.setValue('1')

      return;
    }
    else {
      this.editApiData = data;
      this.singleIndividualIncome = data;
      this.singleIndividualIncome['name'] = data.ownerName;
      this.singleIndividualIncome["finalIncomeList"] = { incomeTypeList: data.incomeTypeId }
      this.addMoreFlag = false;
      this.incomeOption = String(data.incomeTypeId);
      this.incomeNetForm.controls.incomeOption.setValue((data.incomeTypeId) ? String(data.incomeTypeId) : '2');
      this.incomeNetForm.controls.monthlyAmount.setValue(data.monthlyIncome);
      this.incomeNetForm.controls.incomeStyle.setValue(data.incomeStyleId + '');
      this.incomeNetForm.controls.continousTill.setValue(String(data.continueTill));
      this.incomeNetForm.controls.incomeGrowthRate.setValue(data.growthRate);
      this.incomeNetForm.controls.basicIncome.setValue((data.basicIncome == 0) ? '' : data.basicIncome);
      this.incomeNetForm.controls.standardDeduction.setValue((data.standardDeduction == 0) ? '' : data.standardDeduction);
      this.incomeNetForm.controls.deamessAlowance.setValue((data.deamessAlowance == 0) ? '' : data.deamessAlowance);
      this.incomeNetForm.controls.hraRecieved.setValue((data.hraRecieved == 0) ? '' : data.hraRecieved);
      this.incomeNetForm.controls.totalRentPaid.setValue((data.totalRentPaid == 0) ? '' : data.totalRentPaid);
      this.incomeNetForm.controls.incomeStartDate.setValue(new Date(data.incomeStartYear, data.incomeStartMonth));
      this.incomeNetForm.controls.incomeEndDate.setValue(new Date(data.incomeEndYear, data.incomeEndMonth));
      this.incomeNetForm.controls.nextAppraisal.setValue(new Date(data.nextAppraisalOrNextRenewal));
      this.incomeNetForm.controls.description.setValue((data.description) ? data.description : '');
      this.incomeNetForm.controls.continousTillYear.setValue((data.numberOfYear) ? data.numberOfYear : '');
      this.expectedBonusForm = this.fb.group({
        bonusList: new FormArray([])
      })
      if(data.bonusOrInflowList.length > 0){
        data.bonusOrInflowList.forEach(element => {
          this.getBonusList.push(this.fb.group({
            id: [element.id],
            bonusOrInflow: [element.bonusOrInflow],
            receivingDate: [new Date(element.receivingYear, element.receivingMonth), [Validators.required]],
            amount: [element.amount, [Validators.required]],
          }))
        });
      }else{
        this.getBonusList.push(this.fb.group({
          id: [, [Validators.required]],
          bonusOrInflow: [, [Validators.required]],
          receivingDate: [, [Validators.required]],
          amount: [, [Validators.required]],
        }))
      }
     
      this.incomeNetForm.controls.incomeOption.setValue((data.basicIncome) ? '1' : '2');
      (data.basicIncome) ? this.incomeOption = '1' : this.incomeOption = '2'
      if (this.incomeNetForm.get('incomeStyle').value == 1) {
        this.isStatic = true;
        this.isErractic = false;
      } else {
        this.isStatic = false;
        this.isErractic = true;
      }
    }
    this.bonusList = data.bonusOrInflows;
  }
  onClickValueChange(value) {
    if (value == '1') {
      this.isStatic = true;
      this.isErractic = false
    } else {
      this.isStatic = false;
      this.isErractic = true
    }
    this.incomeNetForm.controls.incomeStyle.setValue(value)

  }
  cancel() {
    const obj =
    {
      data: this.individualIncomeData,
      stpeNo: 2,
      flag: "individualIncome"
    }
    this.previousStep.emit(obj)
  }
  showOptional() {
    (this.addMoreFlag) ? this.addMoreFlag = false : this.addMoreFlag = true;
    if (this.bonusList) {
      return;
    }
    if (!this.editApiData) {
      this.getBonusList.push(this.fb.group({
        receivingDate: [, [Validators.required]],
        amount: [, [Validators.required]],
        id:[]
      }))
    }

  }
  chngIncomeOption(data) {
    this.incomeOption = data.value;
    this.addMoreFlag = false;
    this.incomeNetForm.controls.continousTill.setValue('1');
    // let value = parseInt(data.value)
    // this.singleIndividualIncome["finalIncomeList"] = { incomeTypeList: value }


    console.log(data.value)
  }
  checkDateDiff(event) {
    let incomeStartDate;
    let incomeEndDate;

    if (this.incomeNetForm.get('incomeStartDate').value !== null && this.incomeNetForm.get('incomeEndDate').value !== null) {
      incomeStartDate = new Date((this.incomeNetForm.get('incomeStartDate').value._d) ? this.incomeNetForm.get('incomeStartDate').value._d : this.incomeNetForm.get('incomeStartDate').value).getTime();
      incomeEndDate = new Date((this.incomeNetForm.get('incomeEndDate').value._d) ? this.incomeNetForm.get('incomeEndDate').value._d : this.incomeNetForm.get('incomeEndDate').value).getTime();
      (incomeStartDate == undefined && incomeEndDate == undefined) ? ''
        : (incomeEndDate <= incomeStartDate)
          ? this.showDateError = "Due date should be greater than invoice date" :
          this.showDateError = undefined;
    }
  }
  onChange(form, value, event) {
    if (parseInt(event.target.value) > 100) {
      event.target.value = '100';
      form.get(value).setValue(event.target.value);
    }
  }
  submitIncomeForm() {
    // let value = parseInt(this.incomeNetForm.get('incomeOption').value)
    // this.singleIndividualIncome["finalIncomeList"] = { incomeTypeList: value }
    // if (this.singleIndividualIncome.finalIncomeList.incomeTypeId == 1) {
    //   this.inputs.find(input => !input.ngControl.valid).focus();
    //   if (this.incomeOption == '1') {
    //     if (this.incomeNetForm.get('basicIncome').invalid) {
    //       this.incomeNetForm.get('basicIncome').markAsTouched();
    //       return;
    //     }
    //     else if (this. .get('standardDeduction').invalid) {
    //       this.incomeNetForm.get('standardDeduction').markAsTouched();

    //       return;
    //     }
    //     else if (this.incomeNetForm.get('deamessAlowance').invalid) {
    //       this.incomeNetForm.get('deamessAlowance').markAsTouched();
    //       return;
    //     }
    //     else if (this.incomeNetForm.get('hraRecieved').invalid) {
    //       this.incomeNetForm.get('hraRecieved').markAsTouched();
    //       return;
    //     }
    //     else if (this.incomeNetForm.get('totalRentPaid').invalid) {
    //       this.incomeNetForm.get('totalRentPaid').markAsTouched();
    //       return;
    //     }
    //   }
    //   else {
    //     if (this.incomeNetForm.get('monthlyAmount').invalid) {
    //       this.incomeNetForm.get('monthlyAmount').markAsTouched();
    //       return;
    //     }
    //   }
    // }
    // if (this.singleIndividualIncome.finalIncomeList.incomeTypeId != 1) {

    // }
    // if (this.incomeNetForm.get('monthlyAmount').invalid) {
    //   this.incomeNetForm.get('monthlyAmount').markAsTouched();
    //   return;
    // }
    // if (this.incomeNetForm.get('incomeGrowthRate').invalid) {
    //   this.incomeNetForm.get('incomeGrowthRate').markAsTouched();
    //   return;
    // }

    // if (this.incomeNetForm.get('incomeStartDate').invalid) {
    //   this.incomeNetForm.get('incomeStartDate').markAsTouched();
    //   return;
    // }
    // if (this.incomeNetForm.get('incomeEndDate').invalid) {
    //   this.incomeNetForm.get('incomeEndDate').markAsTouched();
    //   return;
    // }

    if (this.showDateError) {
      return
    }
    if (this.incomeNetForm.get('incomeOption').value == '2') {
      this.incomeNetForm.get('basicIncome').setErrors(null);
      this.incomeNetForm.get('standardDeduction').setErrors(null);
      this.incomeNetForm.get('deamessAlowance').setErrors(null);
      this.incomeNetForm.get('hraRecieved').setErrors(null);
      this.incomeNetForm.get('totalRentPaid').setErrors(null);

    } else {
      this.incomeNetForm.get('monthlyAmount').setErrors(null);
    }
    if (this.incomeNetForm.invalid) {

      this.incomeNetForm.markAllAsTouched();
    } else {


      let obj =
      {
        "familyMemberId": this.singleIndividualIncome.id,
        "clientId": this.clientId,
        "advisorId": this.advisorId,
        "ownerName": this.singleIndividualIncome.name,
        "monthlyIncome": this.incomeNetForm.get('monthlyAmount').value,
        "incomeStartMonth": new Date(this.incomeNetForm.get('incomeStartDate').value).getMonth(),
        "incomeStartYear": new Date(this.incomeNetForm.get('incomeStartDate').value).getFullYear(),
        "incomeEndMonth": new Date(this.incomeNetForm.get('incomeEndDate').value).getMonth(),
        "incomeEndYear": new Date(this.incomeNetForm.get('incomeEndDate').value).getFullYear(),
        "incomeGrowthRateId": 50,
        // "incomeOption":this.incomeNetForm.get('incomeOption').value,
        "growthRate": (this.incomeNetForm.get('incomeGrowthRate').value) ? this.incomeNetForm.get('incomeGrowthRate').value : 0,
        "incomeStyleId": this.incomeNetForm.get('incomeStyle').value,
        // "incomeStyleId":20,
        "continueTill": parseInt(this.incomeNetForm.get("continousTill").value),
        "numberOfYear": parseInt(this.incomeNetForm.get("continousTillYear").value) ? parseInt(this.incomeNetForm.get("continousTillYear").value) : null,
        "nextAppraisalOrNextRenewal": this.incomeNetForm.get('nextAppraisal').value ? this.incomeNetForm.get('nextAppraisal').value : null,
        "incomeTypeId": this.singleIndividualIncome.finalIncomeList.incomeTypeList,
        "realEstateId": 20,
        "basicIncome": (this.incomeNetForm.get('basicIncome').value) ? (this.incomeNetForm.get('basicIncome').value) : 0,
        "standardDeduction": (this.incomeNetForm.get('standardDeduction').value) ? this.incomeNetForm.get('standardDeduction').value : 0,
        "deamessAlowance": (this.incomeNetForm.get('deamessAlowance').value) ? this.incomeNetForm.get('deamessAlowance').value : 0,
        "hraRecieved": (this.incomeNetForm.get('hraRecieved').value) ? this.incomeNetForm.get('hraRecieved').value : 0,
        "totalRentPaid": (this.incomeNetForm.get('totalRentPaid').value) ? this.incomeNetForm.get('totalRentPaid').value : 0,
        "description": this.incomeNetForm.get('description').value,
        "monthlyDistributionList": [],
        "bonusOrInflowList": []
      }
      if (this.getBonusList) {
        this.finalBonusList = []
        this.getBonusList.controls.forEach(element => {
          let obj =
          {
            // "id":0,
            // "bonusOrInflow":0,
            "amount": element.get('amount').value,
            "receivingMonth": new Date(element.get('receivingDate').value).getMonth(),
            "receivingYear": new Date(element.get('receivingDate').value).getFullYear(),
            "id": element.get('id').value ? element.get('id').value : null
          }
          this.finalBonusList.push(obj)
        })
      }
      obj['monthlyDistributionList'] = this.finalBonusList;
      if (obj.monthlyDistributionList.length == 0) {
        obj.monthlyDistributionList = null;
      }
      obj['bonusOrInflowList'] = obj.monthlyDistributionList;

      console.log(obj)
      if (this.editApiData) {
        obj['id'] = this.editApiData.id;
        obj['changesIn']=1;
        if(this.editApiData.bonusOrInflowList){
          obj['bonusOrInflowList'] = obj.monthlyDistributionList;
          delete obj.monthlyDistributionList
        }
        this.planService.editIncomeData(obj).subscribe(
          data => this.submitIncomeFormRes(data),
          error => this.eventService.showErrorMessage(error)
        )
      }
      else {

        this.planService.addIncomeData(obj).subscribe(
          data => this.submitIncomeFormRes(data),
          error => this.eventService.showErrorMessage(error)
        )
      }
    }
  }
  submitIncomeFormRes(data) {
    this.incomePosition++;
    if (this.incomePosition < this.finalIncomeAddList.length) {
      this.singleIndividualIncome = this.finalIncomeAddList[this.incomePosition]
      this.incomeNetForm.reset();
      this.incomeNetForm.controls.incomeOption.setValue('2')
      this.getExpectedBonusForm.reset();
    }
    else {
      (this.editApiData) ? this.eventService.openSnackBar("Income is edited") : this.eventService.openSnackBar("Income is added")
      this.subInjectService.changeNewRightSliderState({ state: 'close', refreshRequired: true });
    }
  }
  //  expected bonus array logic

  get getExpectedBonusForm() { return this.expectedBonusForm.controls };
  get getBonusList() { return this.getExpectedBonusForm.bonusList as FormArray };

  addExpectedBonus() {
    this.getBonusList.push(this.fb.group({
      id: [, [Validators.required]],
      bonusOrInflow: [, [Validators.required]],
      receivingDate: [, [Validators.required]],
      amount: [, [Validators.required]],
    }))
    console.log(this.getBonusList)
  }
  removeExpectedBonus(index) {
    if (this.getBonusList.controls.length > 1) {
      if (this.getBonusList.controls[index].value.id) {
        let id = this.getBonusList.controls[index].value.id;
        this.planService.deleteBonusInflow(id).subscribe(
          data => {
          }
        );
      }
      this.expectedBonusForm.controls.bonusList.removeAt(index)

    }
  }
  close(flag) {
    this.subInjectService.changeNewRightSliderState({ state: 'close', refreshRequired: flag });
  }
}