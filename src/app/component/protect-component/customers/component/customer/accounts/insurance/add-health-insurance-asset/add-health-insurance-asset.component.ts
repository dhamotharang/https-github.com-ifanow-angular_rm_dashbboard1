import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/auth-service/authService';
import { ValidatorType } from 'src/app/services/util.service';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { CustomerService } from '../../../customer.service';
import { MatInput, MatDialog } from '@angular/material';
import { EventService } from 'src/app/Data-service/event.service';
import { ClientBankComponent } from 'src/app/component/protect-component/PeopleComponent/people/Component/people-clients/add-client/client-bank/client-bank.component';

@Component({
  selector: 'app-add-health-insurance-asset',
  templateUrl: './add-health-insurance-asset.component.html',
  styleUrls: ['./add-health-insurance-asset.component.scss']
})
export class AddHealthInsuranceAssetComponent implements OnInit {
  maxDate = new Date();

  inputData: any;
  ownerName: any;
  nomineesListFM: any = [];
  accountList: any = [];
  familyMemberId: any;
  advisorId: any;
  clientId: any;
  insuranceId: any;
  addMoreFlag = false;
  FamilyMember: any;
  ProposerData: any;
  familyMemberLifeData: any;
  nominees: any[];
  flag: string;
  ownerData: any;
  callMethod: any;
  healthInsuranceForm: any;
  displayList: any;
  nomineesList: any[] = [];
  policyList: any;
  addOns: any;
  dataForEdit: any;
  bankList:any;
  bankAccountDetails: any;
  id: any;
  constructor(private fb: FormBuilder, private subInjectService: SubscriptionInject, private customerService: CustomerService, private eventService: EventService,private dialog: MatDialog) { }
  validatorType = ValidatorType
  @ViewChildren(MatInput) inputs: QueryList<MatInput>;

  @Input() set data(data) {
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
    this.inputData = data;
    this.policyList = data.displayList.policyTypes;
    this.addOns = data.displayList.addOns;
    this.getFamilyMemberList();
    this.getdataForm(data)
    // this.setInsuranceDataFormField(data);
    console.log(data);
  }
  get data() {
    return this.inputData;
  }
  bankAccountList(value) {
    this.bankList = value;
  }
  getFormDataNominee(data) {
    console.log(data)
    this.nomineesList = data.controls
  }
  display(value) {
    console.log('value selected', value)
    this.ownerName = value.userName;
    this.familyMemberId = value.id
  }

  lisNominee(value) {
    this.ownerData.Fmember = value;
    this.nomineesListFM = Object.assign([], value);
  }
  getFamilyMember(data, index) {
    this.familyMemberLifeData = data;
    console.log('family Member', this.FamilyMember);
  }


  disabledMember(value, type) {
    this.callMethod = {
      methodName: "disabledMember",
      ParamValue: value,
      disControl: type
    }
  }

  displayControler(con) {
    console.log('value selected', con);
    if (con.owner != null && con.owner) {
      this.healthInsuranceForm.controls.getCoOwnerName = con.owner;
    }
    if (con.nominee != null && con.nominee) {
      this.healthInsuranceForm.controls.getNomineeName = con.nominee;
    }
  }

  onChangeJointOwnership(data) {
    this.callMethod = {
      methodName: "onChangeJointOwnership",
      ParamValue: data
    }
  }

  /***owner***/
  get getCoOwner() {
    return this.healthInsuranceForm.get('getCoOwnerName') as FormArray;
  }
  get insuredMembersForm() {
    return this.healthInsuranceForm.get('InsuredMemberForm') as FormArray;
  }
  // get addBankAccount() {
  //   return this.healthInsuranceForm.get('addBankAccount') as FormArray;
  // }



  addNewCoOwner(data) {
    this.getCoOwner.push(this.fb.group({
      name: [data ? data.name : '', [Validators.required]], share: [data ? data.share : ''], familyMemberId: [data ? data.familyMemberId : 0], id: [data ? data.id : 0], isClient: [data ? data.isClient : 0]
    }));
    if (data) {
      setTimeout(() => {
        this.disabledMember(null, null);
      }, 1300);
    }

    if (this.getCoOwner.value.length > 1 && !data) {
      let share = 100 / this.getCoOwner.value.length;
      for (let e in this.getCoOwner.controls) {
        if (!Number.isInteger(share) && e == "0") {
          this.getCoOwner.controls[e].get('share').setValue(Math.round(share) + 1);
        }
        else {
          this.getCoOwner.controls[e].get('share').setValue(Math.round(share));
        }
      }
    }

  }

  removeCoOwner(item) {
    this.getCoOwner.removeAt(item);
    if (this.healthInsuranceForm.value.getCoOwnerName.length == 1) {
      this.getCoOwner.controls['0'].get('share').setValue('100');
    } else {
      let share = 100 / this.getCoOwner.value.length;
      for (let e in this.getCoOwner.controls) {
        if (!Number.isInteger(share) && e == "0") {
          this.getCoOwner.controls[e].get('share').setValue(Math.round(share) + 1);
        }
        else {
          this.getCoOwner.controls[e].get('share').setValue(Math.round(share));
        }
      }
    }
    this.disabledMember(null, null);
  }
  /***owner***/

  /***nominee***/

  get getNominee() {
    return this.healthInsuranceForm.get('getNomineeName') as FormArray;
  }

  removeNewNominee(item) {
    this.disabledMember(null, null);
    this.getNominee.removeAt(item);
    if (this.healthInsuranceForm.value.getNomineeName.length == 1) {
      this.getNominee.controls['0'].get('sharePercentage').setValue('100');
    } else {
      let share = 100 / this.getNominee.value.length;
      for (let e in this.getNominee.controls) {
        if (!Number.isInteger(share) && e == "0") {
          this.getNominee.controls[e].get('sharePercentage').setValue(Math.round(share) + 1);
        }
        else {
          this.getNominee.controls[e].get('sharePercentage').setValue(Math.round(share));
        }
      }
    }
  }



  addNewNominee(data) {
    this.getNominee.push(this.fb.group({
      name: [data ? data.name : ''], sharePercentage: [data ? data.sumInsured : 0], familyMemberId: [data ? data.familyMemberId : 0], id: [data ? data.id : 0], isClient: [data ? data.isClient : 0]
    }));
    if (!data || this.getNominee.value.length < 1) {
      for (let e in this.getNominee.controls) {
        this.getNominee.controls[e].get('sharePercentage').setValue(0);
      }
    }

    if (this.getNominee.value.length > 1 && !data) {
      let share = 100 / this.getNominee.value.length;
      for (let e in this.getNominee.controls) {
        if (!Number.isInteger(share) && e == "0") {
          this.getNominee.controls[e].get('sharePercentage').setValue(Math.round(share) + 1);
        }
        else {
          this.getNominee.controls[e].get('sharePercentage').setValue(Math.round(share));
        }
      }
    }


  }
  getdataForm(data) {
    this.dataForEdit = data.data;
    if (data.data == null) {
      data = {};
      this.dataForEdit = data.data;
      this.flag = "ADD";
    }
    else {
      this.dataForEdit = data.data;
      this.id = this.dataForEdit.id;
      if (this.dataForEdit.addOns.length > 0) {
        this.addOns.addOnId = this.dataForEdit.addOns[0].addOnId;
        this.addOns.addOnSumInsured = this.dataForEdit.addOns[0].addOnSumInsured;
      }
      this.flag = "EDIT";
    }
    this.healthInsuranceForm = this.fb.group({
      // ownerName: [!data.ownerName ? '' : data.ownerName, [Validators.required]],
      getCoOwnerName: this.fb.array([this.fb.group({
        name: ['', [Validators.required]],
        share: [0,],
        familyMemberId: 0,
        id: 0,
        isClient: 0
      })]),
      name: [(this.dataForEdit ? this.dataForEdit.name : null)],
      PlanType: [(this.dataForEdit ? this.dataForEdit.policyTypeId + '' : null), [Validators.required]],
      planDetails: [(this.dataForEdit ? this.dataForEdit.policyFeatureId + '' : null), [Validators.required]],
      deductibleAmt: [(this.dataForEdit ? this.dataForEdit.deductibleSumInsured : null), [Validators.required]],
      policyNum: [(this.dataForEdit ? this.dataForEdit.policyNumber : null), [Validators.required]],
      insurerName: [(this.dataForEdit ? this.dataForEdit.insurerName : null), [Validators.required]],
      planeName: [(this.dataForEdit ? this.dataForEdit.planName : null), [Validators.required]],
      premium: [(this.dataForEdit ? this.dataForEdit.premiumAmount : null), [Validators.required]],
      policyStartDate: [this.dataForEdit ? new Date(this.dataForEdit.policyStartDate) : null, [Validators.required]],
      policyExpiryDate: [this.dataForEdit ? new Date(this.dataForEdit.policyExpiryDate) : null, [Validators.required]],
      copay: [(this.dataForEdit ? this.dataForEdit.copay : null)],
      copayType: [this.dataForEdit ? this.dataForEdit.copayRupeesOrPercent + '' : null],
      cumulativeBonus: [this.dataForEdit ? this.dataForEdit.cumulativeBonus : null],
      bonusType: [this.dataForEdit ? this.dataForEdit.cumulativeBonusRupeesOrPercent + '' : null],
      exclusion: [this.dataForEdit ? this.dataForEdit.exclusion : null],
      inceptionDate: [this.dataForEdit ? new Date(this.dataForEdit.policyInceptionDate) : null],
      tpaName: [this.dataForEdit ? this.dataForEdit.tpaName : null],
      advisorName: [this.dataForEdit ? this.dataForEdit.advisorName : null],
      serviceBranch: [this.dataForEdit ? this.dataForEdit.serviceBranch : null],
      bankAccount: [this.dataForEdit ? parseInt(this.dataForEdit.linkedBankAccount): null],
      additionalCovers: [(this.dataForEdit) ? this.addOns.addOnId + '' : null],
      coversAmount: [(this.dataForEdit) ? this.addOns.addOnSumInsured : null],
      nominees: this.nominees,
      getNomineeName: this.fb.array([this.fb.group({
        name: [''],
        sharePercentage: [0],
        familyMemberId: [0],
        id: [0]
      })]),
      InsuredMemberForm: this.fb.array([this.fb.group({
        insuredMembers: ['', [Validators.required]],
        sumAssured: [null, [Validators.required]],
        id: null,
        familyMemberId: [''],
        relationshipId: ['']
      })]),
      // addBankAccount: this.fb.array([this.fb.group({
      //   newBankAccount: [''],
      // })])
    })
    // ==============owner-nominee Data ========================\\
    /***owner***/
    if (this.healthInsuranceForm.value.getCoOwnerName.length == 1) {
      this.getCoOwner.controls['0'].get('share').setValue('100');
    }
    // this.addBankAccount.removeAt(0);

    // if (this.dataForEdit && this.dataForEdit.ownerList) {
    //   this.getCoOwner.removeAt(0);
    //   this.dataForEdit.ownerList.forEach(element => {
    //     this.addNewCoOwner(element);
    //   });
    // }

    if (this.dataForEdit) {
      this.getCoOwner.removeAt(0);
      const data = {
        name: this.dataForEdit.policyHolderName,
        familyMemberId: this.dataForEdit.policyHolderId
      }
      this.addNewCoOwner(data);
    }

    /***owner***/

    /***nominee***/
    if (this.dataForEdit) {
      this.getNominee.removeAt(0);
      this.dataForEdit.nominees.forEach(element => {
        this.addNewNominee(element);
      });
    }
    /***nominee***/
    if (this.dataForEdit) {
      this.insuredMembersForm.removeAt(0);
      this.dataForEdit.insuredMembers.forEach(element => {
        this.addTransaction(element);
      });
    }


    this.ownerData = { Fmember: this.nomineesListFM, controleData: this.healthInsuranceForm }
    this.bankAccountDetails = { accountList: this.accountList, controleData: this.healthInsuranceForm }

    // this.finalCashFlowData = [];
    // ==============owner-nominee Data ========================\\ 
    // this.DOB = data.dateOfBirth
    // this.ownerData = this.healthInsuranceForm.controls;
    // this.familyMemberId = data.familyMemberId;
  }
  ngOnInit() {
  }

  getFamilyData(value, data) {

    data.forEach(element => {
      for (let e in this.insuredMembersForm.controls) {
        let name = this.insuredMembersForm.controls[e].get('insuredMembers')
        if (element.userName == name.value) {
          this.insuredMembersForm.controls[e].get('insuredMembers').setValue(element.userName);
          this.insuredMembersForm.controls[e].get('familyMemberId').setValue(element.id);
          this.insuredMembersForm.controls[e].get('relationshipId').setValue(element.relationshipId);
        }
      }

    });


  }

  addTransaction(data) {
    this.insuredMembersForm.push(this.fb.group({
      insuredMembers: [data ? data.name : ''],
      sumAssured: [data ? data.sumInsured : ''],
      id: [data ? data.id : ''],
      relationshipId: [data ? data.relationshipId : ''],
      familyMemberId: [data ? data.familyMemberId : '']
    }));
  }

  removeTransaction(item) {
    let finalMemberList = this.healthInsuranceForm.get('InsuredMemberForm') as FormArray
    if (finalMemberList.length > 1) {
      this.insuredMembersForm.removeAt(item);

    }
  }
  // addNewAccount(data) {
  //   this.addBankAccount.push(this.fb.group({
  //     newBankAccount: [data ? data.name : ''],
  //   }));
  // }

  // RemoveNewAccount(item) {
  //     this.addBankAccount.removeAt(item);
  // }
  /***owner***/

  openOptionField() {
    (this.addMoreFlag) ? this.addMoreFlag = false : this.addMoreFlag = true;
  }
  getFamilyMemberList() {
    const obj = {
      advisorId: this.advisorId,
      clientId: this.clientId,
    };
    this.customerService.getListOfFamilyByClient(obj).subscribe(
      data => this.getFamilyMemberListRes(data)
    );
  }
  getFamilyMemberListRes(data) {
    console.log(data);
    this.FamilyMember = data.familyMembersList;
    this.ProposerData = Object.assign([], data.familyMembersList);
    console.log('Proposer data', this.ProposerData);
  }
  preventDefault(e) {
    e.preventDefault();
  }
  saveHealthInsurance() {
    let memberList = [];
    let finalMemberList = this.healthInsuranceForm.get('InsuredMemberForm') as FormArray
    finalMemberList.controls.forEach(element => {
      let obj =
      {
        familyMemberId: element.get('familyMemberId').value,
        sumInsured: element.get('sumAssured').value,
        relationshipId: element.get('relationshipId').value,
        insuredOrNominee: 1,
        id: (element.get('id').value) ? element.get('id').value : null
      }
      memberList.push(obj)
    })
    if (this.healthInsuranceForm.invalid) {
      this.healthInsuranceForm.markAllAsTouched();
    } else {
      const obj = {
        "clientId": this.clientId,
        "advisorId": this.advisorId,
        "policyHolderId": this.healthInsuranceForm.value.getCoOwnerName[0].familyMemberId,
        "policyStartDate": this.healthInsuranceForm.get('policyStartDate').value,
        "policyExpiryDate": this.healthInsuranceForm.get('policyExpiryDate').value,
        "cumulativeBonus": this.healthInsuranceForm.get('cumulativeBonus').value,
        "cumulativeBonusRupeesOrPercent": this.healthInsuranceForm.get('bonusType').value,
        "policyTypeId": this.healthInsuranceForm.get('PlanType').value,
        "deductibleSumInsured": this.healthInsuranceForm.get('deductibleAmt').value,
        "exclusion": this.healthInsuranceForm.get('exclusion').value,
        "copay": this.healthInsuranceForm.get('copay').value,
        "planName": this.healthInsuranceForm.get('planeName').value,
        "policyNumber": this.healthInsuranceForm.get('policyNum').value,
        "copayRupeesOrPercent": this.healthInsuranceForm.get('copayType').value,
        "tpaName": this.healthInsuranceForm.get('tpaName').value,
        "advisorName": this.healthInsuranceForm.get('advisorName').value,
        "serviceBranch": this.healthInsuranceForm.get('serviceBranch').value,
        "linkedBankAccount": this.healthInsuranceForm.get('bankAccount').value,
        "insurerName": this.healthInsuranceForm.get('insurerName').value,
        "policyInceptionDate": this.healthInsuranceForm.get('inceptionDate').value,
        "insuranceSubTypeId": this.inputData.insuranceSubTypeId,
        "premiumAmount": this.healthInsuranceForm.get('premium').value,
        "id":(this.id) ? this.id : null,
        "addOns": [],
        insuredMembers: memberList,
        nominees: this.healthInsuranceForm.value.getNomineeName,
      }
      if(this.healthInsuranceForm.get('additionalCovers').value && this.healthInsuranceForm.get('coversAmount').value){
        obj.addOns =[{"addOnId": (this.healthInsuranceForm.get('additionalCovers').value),
        "addOnSumInsured": this.healthInsuranceForm.get('coversAmount').value}]
      }
      if (obj.nominees.length > 0) {
        obj.nominees.forEach((element, index) => {
          if (element.name == '') {
            this.removeNewNominee(index);
          }
        });
        obj.nominees = this.healthInsuranceForm.value.getNomineeName;
        obj.nominees.forEach(element => {
          if (element.sharePercentage) {
            element.sumInsured = element.sharePercentage;
          }
          element.insuredOrNominee = 2
        });
      } else {
        obj.nominees = [];
      }
      console.log(obj);



      if (this.dataForEdit) {
        this.customerService.editGeneralInsuranceData(obj).subscribe(
          data => {
            console.log(data);
            this.eventService.openSnackBar("Updated successfully!", 'dismiss');
            const insuranceData =
            {
              insuranceTypeId: this.inputData.insuranceTypeId,
              insuranceSubTypeId: this.inputData.insuranceSubTypeId
            }
            this.close(insuranceData)
          }
        );
      } else {
        this.customerService.addGeneralInsurance(obj).subscribe(
          data => {
            console.log(data);
            this.eventService.openSnackBar("Added successfully!", 'dismiss');
            const insuranceData =
            {
              insuranceTypeId: this.inputData.insuranceTypeId,
              insuranceSubTypeId: this.inputData.insuranceSubTypeId
            }
            this.close(insuranceData)
          }
        );
      }
    }
  }
  close(data) {
    this.addMoreFlag = false;
    this.subInjectService.changeNewRightSliderState({ state: 'close', data });
  }

}
