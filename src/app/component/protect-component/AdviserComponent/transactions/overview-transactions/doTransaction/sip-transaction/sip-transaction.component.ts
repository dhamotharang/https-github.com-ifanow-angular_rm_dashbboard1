import { Component, OnInit, Input } from '@angular/core';
import { SubscriptionInject } from '../../../../Subscriptions/subscription-inject.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationTransactionComponent } from '../confirmation-transaction/confirmation-transaction.component';
import { UtilService } from 'src/app/services/util.service';
import { OnlineTransactionService } from '../../../online-transaction.service';
import { ProcessTransactionService } from '../process-transaction.service';

@Component({
  selector: 'app-sip-transaction',
  templateUrl: './sip-transaction.component.html',
  styleUrls: ['./sip-transaction.component.scss']
})
export class SipTransactionComponent implements OnInit {

  confirmTrasaction: boolean;
  dataSource: any;
  ownerData: any;
  folioSelection: [2]
  schemeSelection: [2]
  sipTransaction: any;
  inputData: any;
  selectedFamilyMember: any;
  isViewInitCalled = false;
  transactionType: any;
  schemeDetails: any;
  transactionSummary: {};
  selectScheme = 2;
  schemeList: any;
  scheme: any;
  navOfSelectedScheme: any;
  maiSchemeList: any;
  reInvestmentOpt = [];
  getDataSummary: any;
  folioList: any;
  folioDetails: any;
  ExistingOrNew: any;
  sipFrequency: any;
  dateDisplay: any;
  sipDate: any;
  dates: any;
  showUnits = false;
  mandateDetails: any;
  frequency: any;

  constructor(private subInjectService: SubscriptionInject, private onlineTransact: OnlineTransactionService,
    private processTransaction: ProcessTransactionService, private fb: FormBuilder) { }
  @Input()
  set data(data) {
    this.inputData = data;
    this.transactionType = data.transactionType
    this.selectedFamilyMember = data.selectedFamilyMember
    console.log('This is Input data of FixedDepositComponent ', data);

    if (this.isViewInitCalled) {
      this.getdataForm('');
    }
  }

  get data() {
    return this.inputData;
  }

  ngOnInit() {
    this.getdataForm(this.inputData)
    this.transactionSummary = { selectedFamilyMember: this.inputData.selectedFamilyMember }
  }
  onAddTransaction(value, data) {
    this.confirmTrasaction = true
    const fragmentData = {
      flag: 'addNsc',
      data,
      id: 1,
      state: 'open65',
      componentName: ConfirmationTransactionComponent
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          if (UtilService.isRefreshRequired(sideBarData)) {
            // this.getNscSchemedata();
            console.log('this is sidebardata in subs subs 3 ani: ', sideBarData);
          }
          rightSideDataSub.unsubscribe();
        }

      }
    );
  }
  enteredAmount(value) {
    this.transactionSummary = { enteredAmount: value }
  }
  selectExistingOrNew(value) {
    this.ExistingOrNew = value
  }
  selectSchemeOption(value) {
    console.log('value selction scheme', value)
    this.selectScheme = value
  }
  getSchemeList(value) {
    let obj = {
      searchQuery: value,
      bseOrderType: 'SIP',
      aggregatorType: this.getDataSummary.defaultClient.aggregatorType,
      advisorId: 414,
      tpUserCredentialId: this.getDataSummary.defaultClient.tpUserCredentialId,
      familyMemberId: this.getDataSummary.defaultClient.familyMemberId,
      clientId: this.getDataSummary.defaultClient.clientId,
    }
    if (this.selectScheme == 2 && value.length > 2) {
      this.onlineTransact.getNewSchemes(obj).subscribe(
        data => this.getNewSchemesRes(data)
      );
    } else {
      this.onlineTransact.getExistingSchemes(obj).subscribe(
        data => this.getExistingSchemesRes(data)
      );
    }
  }
  getNewSchemesRes(data) {
    console.log('new schemes', data)
    this.schemeList = data
  }
  getExistingSchemesRes(data) {
    this.schemeList = data
  }
  getDefaultDetails(data) {
    console.log('get defaul here yupeeee', data)
    this.getDataSummary = data
  }
  selectedScheme(scheme) {
    this.scheme = scheme
    this.transactionSummary = { schemeName: scheme.schemeName }
    this.navOfSelectedScheme = scheme.nav
    let obj1 = {
      mutualFundSchemeMasterId: scheme.mutualFundSchemeMasterId,
      aggregatorType: 2,
      orderType: 'SIP',
      userAccountType: 1,
    }
    this.onlineTransact.getSchemeDetails(obj1).subscribe(
      data => this.getSchemeDetailsRes(data)
    );
  }
  getSchemeDetailsRes(data) {
    console.log('getSchemeDetailsRes == ', data)
    this.maiSchemeList = data
    this.schemeDetails = data[0]
    this.schemeDetails.selectedFamilyMember = this.selectedFamilyMember;
    if (data.length > 1) {
      this.reInvestmentOpt = data
      console.log('reinvestment', this.reInvestmentOpt)
    } if (data.length == 1) {
      this.reInvestmentOpt = []
    }
    this.getAmcWiseFolio()
    this.getMandateDetails()
    this.getFrequency()
  }
  getFrequency() {
    let obj = {
      isin: this.schemeDetails.isin,
    }
    this.onlineTransact.getSipFrequency(obj).subscribe(
      data => this.getSipFrequencyRes(data)
    );
  }
  getSipFrequencyRes(data) {
    console.log('isin ----', data)
    this.sipFrequency = data
    this.sipFrequency = data.filter(function (element) {
      return element.sipFrequency
    })
  }
  selectedFrequency(getFrerq) {
    this.frequency = getFrerq.sipFrequency
    this.dateArray(getFrerq.sipDates)
  }
  dateArray(sipDates) {
    this.dates = sipDates.split(",")
    this.dateDisplay = this.processTransaction.getDateByArray(this.dates, true)
    console.log('dateDisplay = ', this.dateDisplay)
  }
  getMandateDetails() {
    let obj1 = {
      advisorId: this.getDataSummary.defaultClient.advisorId,
      clientCode: this.getDataSummary.defaultClient.clientCode,
      tpUserCredentialId: this.getDataSummary.defaultClient.tpUserCredentialId,
    }
    this.onlineTransact.getMandateDetails(obj1).subscribe(
      data => this.getMandateDetailsRes(data)
    );
  }
  getMandateDetailsRes(data) {
    console.log('mandate details :', data)
    this.mandateDetails = data
  }
  getAmcWiseFolio() {
    let obj1 = {
      amcId: this.scheme.amcId,
      advisorId: this.getDataSummary.defaultClient.advisorId,
      familyMemberId: this.getDataSummary.defaultClient.familyMemberId,
      clientId: this.getDataSummary.defaultClient.clientId,
    }
    this.onlineTransact.getFoliosAmcWise(obj1).subscribe(
      data => this.getFoliosAmcWiseRes(data)
    );
  }
  getFoliosAmcWiseRes(data) {
    console.log('getFoliosAmcWiseRes', data)
    this.folioList = data
  }
  selectedFolio(folio) {
    this.folioDetails = folio
  }
  reinvest(scheme) {
    this.schemeDetails = scheme
    this.transactionSummary = {
      schemeName: scheme.schemeName
    }
    console.log('schemeDetails == ', this.schemeDetails)
  }
  close() {
    this.subInjectService.changeNewRightSliderState({ state: 'close' });
  }
  getdataForm(data) {
    if (!data) {
      data = {};
    }
    if (this.dataSource) {
      data = this.dataSource;
    }
    this.sipTransaction = this.fb.group({
      ownerName: [(!data) ? '' : data.ownerName, [Validators.required]],
      transactionType: [(!data) ? '' : data.transactionType, [Validators.required]],
      bankAccountSelection: [(!data) ? '' : data.bankAccountSelection, [Validators.required]],
      schemeSelection: ['2'],
      investor: [(!data) ? '' : data.investor, [Validators.required]],
      folioSelection: ['2'],
      employeeContry: [(!data) ? '' : data.employeeContry, [Validators.required]],
      frequency: [(!data) ? '' : data.frequency, [Validators.required]],
      modeOfPaymentSelection: ['1'],
      selectInvestor: [(!data) ? '' : data.investmentAccountSelection, [Validators.required]],
      date: [(!data) ? '' : data.investmentAccountSelection, [Validators.required]],
      tenure: [(!data) ? '' : data.investmentAccountSelection, [Validators.required]],
      installment: [(!data) ? '' : data.investmentAccountSelection, [Validators.required]],
    });

    this.ownerData = this.sipTransaction.controls;
  }

  getFormControl(): any {
    return this.sipTransaction.controls;
  }
  sip() {
    let obj = {
      productDbId: this.schemeDetails.id,
      mutualFundSchemeMasterId: this.scheme.mutualFundSchemeMasterId,
      productCode: this.schemeDetails.schemeCode,
      isin: this.schemeDetails.isin,
      folioNo: (this.folioDetails == undefined) ? null : this.folioDetails.folioNumber,
      tpUserCredentialId: this.getDataSummary.defaultClient.tpUserCredentialId,
      tpSubBrokerCredentialId: this.getDataSummary.defaultCredential.tpSubBrokerCredentialId,
      familyMemberId: this.getDataSummary.defaultClient.familyMemberId,
      adminAdvisorId: this.getDataSummary.defaultClient.advisorId,
      clientId: this.getDataSummary.defaultClient.clientId,
      startDate: Number(new Date(this.sipTransaction.controls.date.value.replace(/"/g, ""))),
      frequencyType: this.sipTransaction.controls.frequency.value.toUpperCase(),
      //endDate :sipTransaction.sip.scheme.,
      noOfInstallments: this.sipTransaction.controls.installment.value,
      orderType: this.mandateDetails[0].mandateType,
      buySell: 'PURCHASE',
      transCode: 'NEW',
      buySellType: "FRESH",
      dividendReinvestmentFlag: this.schemeDetails.dividendReinvestmentFlag,
      amountType: 'Amount',
      clientCode: this.getDataSummary.defaultClient.clientCode,
      orderVal: this.sipTransaction.controls.employeeContry.value,
      euin: this.getDataSummary.defaultCredential.euin,
      xSipMandateId: this.mandateDetails[0].mandateId,
      schemeCd: this.schemeDetails.schemeCode,
      transMode: 'PHYSICAL',
      bseDPTransType: 'PHYSICAL',
      // teamMemberSessionId: sipTransaction.localStorage.mm.mainDetail.userDetails.teamMemberSessionId,
    }
    console.log('sip json',obj)
    if( this.frequency == 'MONTHLY' && this.sipTransaction.controls.tenure.value == 2){
      obj.noOfInstallments = obj.noOfInstallments*12
     }else if(this.frequency == 'QUATERLY' && this.sipTransaction.controls.tenure.value == 2){
       obj.noOfInstallments =  obj.noOfInstallments*4
     }else if(this.frequency == 'WEEKLY' && this.sipTransaction.controls.tenure.value == 2){
       obj.noOfInstallments =  obj.noOfInstallments*52
     }else{
       obj.noOfInstallments =  this.sipTransaction.controls.installment.value
     }
     this.onlineTransact.sipBSE(obj).subscribe(
      data => this.sipBSERes(data)
    );
  }
  sipBSERes(data){
    console.log('sip',data)
  }

}
