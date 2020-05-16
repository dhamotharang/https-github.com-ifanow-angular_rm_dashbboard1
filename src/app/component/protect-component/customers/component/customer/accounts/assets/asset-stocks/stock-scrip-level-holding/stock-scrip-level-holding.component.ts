import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {SubscriptionInject} from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import {CustomerService} from '../../../../customer.service';
import {EventService} from 'src/app/Data-service/event.service';
import {MatDialog} from '@angular/material';
import {AuthService} from 'src/app/auth-service/authService';

@Component({
  selector: 'app-stock-scrip-level-holding',
  templateUrl: './stock-scrip-level-holding.component.html',
  styleUrls: ['./stock-scrip-level-holding.component.scss']
})
export class StockScripLevelHoldingComponent implements OnInit {
  scipLevelHoldingForm: any;
  ownerData: any;
  advisorId: any;
  clientId: any;
  portfolioList: any;
  scripList: any;
  ownerName: any;
  familyMemberId: any;
  familyWisePortfolio = [];
  editApiData: any;
  ownerInfo: any;
  portfolioData: any;
  scripForm: any;
  maxDate= new Date();
  portfolioFieldData: { familyMemberId: any; };
    nomineesListFM: any = [];
  nomineesList: any[] = [];

  checkValid:boolean= false;
  callMethod: { methodName: string; ParamValue: any; };

  constructor(public dialog: MatDialog, private eventService: EventService, private fb: FormBuilder, private subInjectService: SubscriptionInject, private cusService: CustomerService) { }

  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
  }
  set data(data) {
    this.getFormData(data);
  }

 
  getPortfolioData(data) {
    console.log("", data)
    this.portfolioData = data;
    this.scipLevelHoldingForm.get('portfolioName').setValue(data.portfolioName)
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
  //  disControl : type
  }

  
setTimeout(() => {
  this.portfolioFieldData= {
    familyMemberId: this.scipLevelHoldingForm.value.getCoOwnerName[0].familyMemberId
  }
}, 500);
}

displayControler(con) {
  console.log('value selected', con);
  if(con.owner != null && con.owner){
    this.scipLevelHoldingForm.controls.getCoOwnerName = con.owner;
  }
  if(con.nominee != null && con.nominee){
    this.scipLevelHoldingForm.controls.getNomineeName = con.nominee;
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
  return this.scipLevelHoldingForm.get('getCoOwnerName') as FormArray;
}

addNewCoOwner(data) {
  this.getCoOwner.push(this.fb.group({
    name: [data ? data.name : '', [Validators.required]], share: [data ? String(data.share) : '', [Validators.required]], familyMemberId: [data ? data.familyMemberId : 0], id: [data ? data.id : 0],isClient: [data ? data.isClient : 0]
  }));
  if (data) {
    setTimeout(() => {
     this.disabledMember(null,null);
    }, 1300);
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
 
}

removeCoOwner(item) {
  this.getCoOwner.removeAt(item);
  if (this.scipLevelHoldingForm.value.getCoOwnerName.length == 1) {
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
  return this.scipLevelHoldingForm.get('getNomineeName') as FormArray;
}

removeNewNominee(item) {
this.disabledMember(null, null);
  this.getNominee.removeAt(item);
  if (this.scipLevelHoldingForm.value.getNomineeName.length == 1) {
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
}



addNewNominee(data) {
  this.getNominee.push(this.fb.group({
    name: [data ? data.name : ''], sharePercentage: [data ? String(data.sharePercentage) : 0], familyMemberId: [data ? data.familyMemberId : 0], id: [data ? data.id : 0],isClient: [data ? data.isClient : 0]
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
   
  
}
/***nominee***/ 
// ===================owner-nominee directive=====================//
  selectedScript:any=[];
  getFormData(data) {
    if (data == null) {
      data = {};
      this.addHoldings();
      // this.ownerName = '';
    }
    else {

      this.editApiData = data;
      this.familyMemberId = data.familyMemberId;
      this.ownerName = data.ownerName;
     
      // this.scipLevelHoldingForm.get('ownerName').setValue(this.ownerName)
    }
    this.scipLevelHoldingForm = this.fb.group({
      getCoOwnerName: this.fb.array([this.fb.group({
        name: ['', [Validators.required]],
        share: ['', [Validators.required]],
        familyMemberId: 0,
        id: 0,
        isClient:0
      })]),
      getNomineeName: this.fb.array([this.fb.group({
        name: [''],
        sharePercentage: [0],
        familyMemberId: [0],
        id: [0]
      })]),
      portfolioName: [data.portfolioName, [Validators.required]]
    })
    if (data.transactionorHoldingSummaryList) {
      data.transactionorHoldingSummaryList.forEach(element => {
        let singleScripData = this.fb.group({
          scripName: [element.scripName, [Validators.required]],
          holdings: [element.quantity, [Validators.required]],
          holdingAsOn: [new Date(element.holdingOrTransactionDate), [Validators.required]],
          investedAmt: [element.investedOrTransactionAmount, [Validators.required]],
          id: [element.id]
        })

        
        this.HoldingArray.push(singleScripData);
      });
    }
    this.familyMemberId = data.familyMemberId;
    

    // ==============owner-nominee Data ========================\\
    /***owner***/
    if (this.scipLevelHoldingForm.value.getCoOwnerName.length == 1) {
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
    if (data.nomineeList) {
      this.getNominee.removeAt(0);
      data.nomineeList.forEach(element => {
        this.addNewNominee(element);
      });
    }
    /***nominee***/

    this.ownerData = { Fmember: this.nomineesListFM, controleData: this.scipLevelHoldingForm }
    // ==============owner-nominee Data ========================\\
    // this.ownerData = this.scipLevelHoldingForm.controls;
  }
  holdingListForm = this.fb.group({
    holdingListArray: new FormArray([])
  })
  get HoldingList() { return this.holdingListForm.controls };
  get HoldingArray() { return this.HoldingList.holdingListArray as FormArray };

    addHoldings() {
    let singleForm = this.fb.group({
      scripName: [, [Validators.required]],
      holdings: [, [Validators.required]],
      holdingAsOn: [, [Validators.required]],
      investedAmt: [, [Validators.required]],
      id: []
    });
    this.HoldingArray.push(singleForm);
  }
  removeHoldings(index) {
    (this.HoldingArray.length == 1) ? console.log("cannot remove") : this.HoldingArray.removeAt(index)
  }

  saveSchemeHolding() {
    // if (this.ownerData == undefined) {
    //   return;
    // }
    if (this.scipLevelHoldingForm.invalid || this.HoldingArray.invalid) {
      this.checkValid = true;
      this.scipLevelHoldingForm.get('portfolioName').markAsTouched();
      this.scipLevelHoldingForm.get('ownerName').markAsTouched();
      this.HoldingArray.controls.forEach(element => {
        element.get('holdingAsOn').markAsTouched();
        element.get('holdings').markAsTouched();
        element.get('investedAmt').markAsTouched();
        element.get('scripName').markAsTouched();
      })
    }
    else{
      // if (this.editApiData) {
      //   let finalStocks = []
      //   this.HoldingArray.controls.forEach(element => {
      //     let singleList = {
  
      //       "id": element.get('id').value,
      //       "stockId": this.editApiData.id,
      //       "holdingOrTransaction": 1,
      //       "transactionTypeOrScripNameId": element.get('scripName').value.id,
      //       "quantity": element.get('holdings').value,
      //       "holdingOrTransactionDate": element.get('holdingAsOn').value,
      //       "investedOrTransactionAmount": element.get('investedAmt').value
      //     }
      //     finalStocks.push(singleList);
      //   });
      //   let obj = {
      //     "stockList": [
      //       {
      //         "transactionorHoldingSummaryList": finalStocks
      //       }
      //     ]
      //   }
      //   this.cusService.editScriplevelHoldingAndTransaction(obj).subscribe(
      //     data => {
      //       console.log(data);
      //       this.Close();
      //     },
      //     error => this.eventService.showErrorMessage(error)
      //   )
  
      // }
      // else {
        let finalStocks = [];
        this.HoldingArray.controls.forEach(element => {
          let obj = {
            "scripNameId": this.scripData?this.scripData.id:element.value.scripNameId,
            "currentMarketValue": 0,
            "stockType": 2,
            "amountInvested": 0,
            "valueAsOn": null,
            "transactionorHoldingSummaryList": [
              {
                "holdingOrTransaction": 1,
                "quantity": element.get('holdings').value,
                "transactionTypeOrScripNameId":this.scripData?this.scripData.id:element.value.scripNameId,
                "holdingOrTransactionDate": element.get('holdingAsOn').value,
                "investedOrTransactionAmount": element.get('investedAmt').value,
                
              }
            ]
          }

           if (this.editApiData) {
             obj['id'] = this.editApiData.id;
             obj.transactionorHoldingSummaryList[0]['id'] = element.get('id').value;
           }

          finalStocks.push(obj)
        })
        const obj =
        {
          "id": this.editApiData?this.editApiData.portfolioId : this.portfolioData.id,
          "clientId": this.clientId,
          "advisorId": this.advisorId,
          "familyMemberId": this.scipLevelHoldingForm.value.getCoOwnerName[0].familyMemberId,
          "ownerList": this.scipLevelHoldingForm.value.getCoOwnerName,
          "portfolioName": this.scipLevelHoldingForm.value.portfolioName,
          "stockList": finalStocks,
        }

        if (this.editApiData) {
          this.cusService.editStockData(obj).subscribe(
            data => {
              console.log(data);
              this.Close();
            },
            error => this.eventService.showErrorMessage(error)
          )
        }
        else{
          console.log(obj)
          this.cusService.addAssetStocks(obj).subscribe(
            data => {
              console.log(data);
              this.Close();
            },
            error => this.eventService.showErrorMessage(error)
          )
        }
      // }
    }
  }

  scripDataList:any=[];
  getScriptList(data){
    this.scripDataList = data;
  }

  scripData:any;
  getScript(data){
    this.scripData = data;
  }
  Close() {
    this.subInjectService.changeNewRightSliderState({ state: 'close' });
  }
}
