import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SubscriptionInject} from '../../../../Subscriptions/subscription-inject.service';
import {OnlineTransactionService} from '../../../online-transaction.service';
import {EventService} from 'src/app/Data-service/event.service';
import {ProcessTransactionService} from '../process-transaction.service';
import {MatProgressButtonOptions} from 'src/app/common/progress-button/progress-button.component';
import {AuthService} from 'src/app/auth-service/authService';
import {ValidatorType} from 'src/app/services/util.service';

@Component({
  selector: 'app-switch-transaction',
  templateUrl: './switch-transaction.component.html',
  styleUrls: ['./switch-transaction.component.scss']
})
export class SwitchTransactionComponent implements OnInit {
  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'SAVE & PROCEED',
    buttonColor: 'accent',
    barColor: 'accent',
    raised: true,
    stroked: false,
    mode: 'determinate',
    value: 10,
    disabled: false,
    fullWidth: false,
    // buttonIcon: {
    //   fontIcon: 'favorite'
    // }
  };
  confirmTrasaction: boolean;
  switchTransaction: any;
  dataSource: any;
  ownerData: any;
  selectedFamilyMember: any;
  inputData: any;
  isViewInitCalled = false;
  transactionType: any;
  selectScheme = 2;
  navOfSelectedScheme: any;
  transactionSummary: {};
  schemeDetails: any;
  maiSchemeList: any;
  reInvestmentOpt = [];
  schemeList: any;
  showUnits = false;
  getDataSummary: any;
  showSpinner = false;
  scheme: any;
  folioList: any;
  folioDetails: any;
  schemeTransfer: any;
  schemeDetailsTransfer: any;
  schemeListTransfer: any;
  showSpinnerFolio = false;
  showSpinnerTran = false;
  currentValue: number;
  multiTransact = false;
  childTransactions = [];
  displayedColumns: string[] = ['no', 'folio', 'ownerName', 'amount', 'icons'];

  advisorId: any;
  isEdit = false;
  editedId: any;
  id = 0;
  navOfSelectedSchemeSwitchIn: any;
  validatorType = ValidatorType;
  showSpinnerEx: boolean = false;


  constructor(private subInjectService: SubscriptionInject, private onlineTransact: OnlineTransactionService,
              private fb: FormBuilder, private eventService: EventService, private processTransaction: ProcessTransactionService) {
  }

  @Output() changedValue = new EventEmitter();

  @Input()
  set data(data) {
    this.advisorId = AuthService.getAdvisorId();
    this.inputData = data;
    this.transactionType = data.transactionType;
    this.selectedFamilyMember = data.selectedFamilyMember;
    console.log('This is Input data of FixedDepositComponent ', data);

    if (this.isViewInitCalled) {
      this.getdataForm('', false);
    }
  }

  get data() {
    return this.inputData;
  }

  ngOnInit() {
    this.transactionSummary = {};
    this.childTransactions = [];
    this.getdataForm(this.inputData, false);
    Object.assign(this.transactionSummary, {familyMemberId: this.inputData.familyMemberId});
    Object.assign(this.transactionSummary, {clientId: this.inputData.clientId});
    Object.assign(this.transactionSummary, {transactType: 'SWITCH'});
    Object.assign(this.transactionSummary, {allEdit: true});
    Object.assign(this.transactionSummary, {selectedFamilyMember: this.inputData.selectedFamilyMember});
    Object.assign(this.transactionSummary, {isMultiTransact: false});
  }

  backToTransact() {
    this.changedValue.emit('step-2');
  }

  getDefaultDetails(data) {
    console.log('get defaul here yupeeee', data);
    this.getDataSummary = data;
    Object.assign(this.transactionSummary, {aggregatorType: this.getDataSummary.defaultClient.aggregatorType});
    this.getSchemeList('')
    this.switchTransaction.controls.transferIn.reset();
  }

  getSchemeList(data) {
    // if (data.target.value == '') {
    //   this.scheme = undefined;
    //   this.schemeList = undefined;
    //   this.switchTransaction.controls.employeeContry.setValidators([Validators.min(0)]);
    //   this.switchTransaction.controls.employeeContry.setValue();
    //   this.schemeDetails.minimumPurchaseAmount = 0;
    //   this.showSpinner = false;
    //   return;
    // }
    this.getExistingSchemesRes([]);
    if (this.switchTransaction.get('schemeSwitch').invalid) {
      // this.showSpinner = false;
      Object.assign(this.transactionSummary, {schemeName: ''});
      Object.assign(this.transactionSummary, {folioNumber: ''});
      (this.schemeDetails) ? (this.schemeDetails.minimumPurchaseAmount = 0) : 0; // if scheme not present then min amt is 0
    }
    if (this.selectScheme == 2) {
      this.showSpinnerEx = true;
      const obj = {
        searchQuery: (data == '')?'':data.target.value,
        bseOrderType: 'SWITCH',
        aggregatorType: this.getDataSummary.defaultClient.aggregatorType,
        advisorId: this.advisorId,
        tpUserCredentialId: this.getDataSummary.defaultClient.tpUserCredentialId,
        familyMemberId: this.getDataSummary.defaultClient.familyMemberId,
        clientId: this.getDataSummary.defaultClient.clientId,
        userAccountType: this.getDataSummary.defaultCredential.accountType,
        holdingType: this.getDataSummary.defaultClient.holdingType,
        showOnlyNonZero: true,
        tpUserCredFamilyMappingId: this.getDataSummary.defaultClient.tpUserCredFamilyMappingId,
      };
      this.onlineTransact.getExistingSchemes(obj).subscribe(
        data => this.getExistingSchemesRes(data), (error) => {
          this.showSpinnerEx = false;
          this.switchTransaction.get('schemeSwitch').setErrors({setValue: error});
          this.switchTransaction.get('schemeSwitch').markAsTouched();
          (this.schemeDetails) ? (this.schemeDetails.minimumPurchaseAmount = 0) : 0; // if scheme not present then min amt is 0
          // this.eventService.showErrorMessage(error);
        }
      );
    } else {

    }
  }

  getExistingSchemesRes(data) {
    this.showSpinner = false;
    this.showSpinnerEx = false;
    this.schemeList = data;
  }

  onFolioChange(folio) {
    this.switchTransaction.controls.investmentAccountSelection.reset();
  }

  selectedFolio(folio) {
    this.folioDetails = folio;
    this.currentValue = this.processTransaction.calculateCurrentValue(this.navOfSelectedScheme, folio.balanceUnit);
    this.showUnits = true;
    Object.assign(this.transactionSummary, {folioNumber: folio.folioNumber});
    Object.assign(this.transactionSummary, {mutualFundId: folio.id});
    Object.assign(this.transactionSummary, {tpUserCredFamilyMappingId: this.getDataSummary.defaultClient.tpUserCredFamilyMappingId});
    this.transactionSummary = {...this.transactionSummary};
  }

  selectedScheme(scheme) {
    this.showSpinner = true;
    this.scheme = scheme;
    this.showUnits = true;
    Object.assign(this.transactionSummary, {schemeName: scheme.schemeName});
    this.navOfSelectedScheme = scheme.nav;
    const obj1 = {
      mutualFundSchemeMasterId: scheme.mutualFundSchemeMasterId,
      aggregatorType: this.getDataSummary.defaultClient.aggregatorType,
      orderType: 'SWITCH',
      userAccountType: this.getDataSummary.defaultCredential.accountType,
    };
    this.onlineTransact.getSchemeDetails(obj1).subscribe(
      data => this.getSchemeDetailsRes(data), (error) => {
        this.eventService.showErrorMessage(error);
      }
    );
  }

  getbankDetails(event) {
    console.log(event);
  }

  getSchemeDetailsRes(data) {
    this.showSpinner = false;
    console.log('getSchemeDetailsRes == ', data);
    this.maiSchemeList = data;
    this.schemeDetails = data[0];
    Object.assign(this.transactionSummary, {schemeName: this.schemeDetails.schemeName});

    this.schemeDetails.selectedFamilyMember = this.selectedFamilyMember;
    this.getSchemeWiseFolios();
  }

  reinvest(scheme) {
    // this.schemeDetails = scheme;
    this.schemeDetailsTransfer = scheme;

    Object.assign(this.transactionSummary, {schemeName: scheme.schemeName});
    console.log('schemeDetails == ', this.schemeDetails);
  }

  getSchemeWiseFolios() {
    this.showSpinnerFolio = true;
    const obj1 = {
      mutualFundSchemeMasterId: this.scheme.mutualFundSchemeMasterId,
      advisorId: this.getDataSummary.defaultClient.advisorId,
      familyMemberId: this.getDataSummary.defaultClient.familyMemberId,
      clientId: this.getDataSummary.defaultClient.clientId,
      userAccountType: this.getDataSummary.defaultCredential.accountType,
      holdingType: this.getDataSummary.defaultClient.holdingType,
      aggregatorType: this.getDataSummary.defaultClient.aggregatorType,
      showOnlyNonZero: true,
    };
    this.onlineTransact.getSchemeWiseFolios(obj1).subscribe(
      data => this.getSchemeWiseFoliosRes(data), (error) => {
        this.eventService.showErrorMessage(error);
      }
    );
  }

  getSchemeWiseFoliosRes(data) {
    this.showSpinnerFolio = false;
    console.log('res scheme folio', data);
    this.folioList = data;
    if (this.switchTransaction.get('investmentAccountSelection').valid) {
      Object.assign(this.transactionSummary, {folioNumber: this.folioList[0].folioNumber});
    }
  }

  close() {
    this.subInjectService.changeNewRightSliderState({state: 'close'});
  }

  selectedSchemeTransfer(schemeTransfer) {
    this.showSpinnerTran = true;
    this.schemeTransfer = schemeTransfer;
    Object.assign(this.transactionSummary, {schemeNameTranfer: schemeTransfer.schemeName});
    this.navOfSelectedSchemeSwitchIn = schemeTransfer.nav;
    const obj1 = {
      mutualFundSchemeMasterId: schemeTransfer.mutualFundSchemeMasterId,
      aggregatorType: this.getDataSummary.defaultClient.aggregatorType,
      orderType: 'SWITCH',
      userAccountType: this.getDataSummary.defaultCredential.accountType,
    };
    this.onlineTransact.getSchemeDetails(obj1).subscribe(
      data => this.getSchemeDetailsTranferRes(data), (error) => {
        this.eventService.showErrorMessage(error);
      }
    );
  }

  getSchemeDetailsTranferRes(data) {
    this.showSpinnerTran = false;
    // this.maiSchemeList = data
    this.schemeDetailsTransfer = data[0];
    if (data.length > 1) {
      this.reInvestmentOpt = data;
      console.log('reinvestment', this.reInvestmentOpt);
    } else if (data.length == 1) {
      this.reInvestmentOpt = [];
    }
  }

  getSchemeListTranfer(data) {
    if (data.target.value == '') {
      this.schemeTransfer = undefined;
      this.schemeListTransfer = undefined;
      return;
    }
    this.getNewSchemesRes([]);
    if (this.switchTransaction.get('transferIn').invalid) {
      this.showSpinnerTran = false;
      Object.assign(this.transactionSummary, {schemeNameTranfer: ''});
    }
    if (this.selectScheme == 2 && data.target.value.length > 2) {
      this.showSpinnerTran = true;
      const obj = {
        searchQuery: data.target.value,
        bseOrderType: 'SWITCH',
        amcId: this.scheme.amcId,
        aggregatorType: this.getDataSummary.defaultClient.aggregatorType,
        advisorId: this.advisorId,
        tpUserCredentialId: this.getDataSummary.defaultClient.tpUserCredentialId,
        familyMemberId: this.getDataSummary.defaultClient.familyMemberId,
        clientId: this.getDataSummary.defaultClient.clientId,
        userAccountType: this.getDataSummary.defaultCredential.accountType,
        holdingType: this.getDataSummary.defaultClient.holdingType,
        tpUserCredFamilyMappingId: this.getDataSummary.defaultClient.tpUserCredFamilyMappingId,
      };
      this.onlineTransact.getNewSchemes(obj).subscribe(
        data => this.getNewSchemesRes(data), (error) => {
          this.showSpinnerTran = false;
          this.switchTransaction.get('transferIn').setErrors({setValue: error.message});
          this.switchTransaction.get('transferIn').markAsTouched();
          // this.eventService.showErrorMessage(error);
        }
      );
    }
  }

  switchType(event) {
    console.log('switch transaction switchType: ', event.value);
    if (event.value == '3') {
      this.switchTransaction.controls.employeeContry.setValidators([]);
    } else if (event.value == '2') {
      this.switchTransaction.controls.employeeContry.setValidators([Validators.min(this.schemeDetails.minimumRedemptionQty)]);
    } else if (event.value == '1') {
      this.switchTransaction.controls.employeeContry.setValidators([Validators.min(this.schemeDetails.minimumPurchaseAmount)]);
    }
  }

  enteredAmount(value) {
    Object.assign(this.transactionSummary, {enteredAmount: value});
  }

  getNewSchemesRes(data) {
    this.showSpinnerTran = false;
    console.log('new schemes', data);
    this.schemeListTransfer = data;
  }

  getdataForm(data, isEdit) {
    if (isEdit == true) {
      this.isEdit = isEdit;
      this.editedId = data.id;
    }
    if (!data) {
      data = {};
    }
    if (this.dataSource) {
      data = this.dataSource;
    }
    this.switchTransaction = this.fb.group({
      ownerName: [(!data) ? '' : data.ownerName, [Validators.required]],
      transactionType: [(!data) ? '' : data.transactionType, [Validators.required]],
      bankAccountSelection: [(!data) ? '' : data.bankAccountSelection, [Validators.required]],
      schemeSelection: [(!data) ? '' : data.schemeSelection, [Validators.required]],
      reinvest: [(!data) ? '' : data.reinvest, [Validators.required]],
      employeeContry: [(!data) ? '' : data.orderVal, [Validators.required]],
      investmentAccountSelection: [(!data) ? '' : data.folioNo, [Validators.required]],
      modeOfPaymentSelection: [(!data) ? '' : data.modeOfPaymentSelection, [Validators.required]],
      folioSelection: [(!data) ? '' : data.investmentAccountSelection, [Validators.required]],
      selectInvestor: [(!data) ? '' : data.investmentAccountSelection, [Validators.required]],
      installment: [(!data) ? '' : data.employeeContry, [Validators.required]],
      tenure: [(!data) ? '' : data.employeeContry, [Validators.required]],
      schemeSwitch: [(!data) ? '' : data.schemeName, [Validators.required]],
      transferIn: [(!data) ? '' : data.transferIn, [Validators.required]],
      switchType: [(!data) ? '' : data.switchType, [Validators.required]],
    });

    this.ownerData = this.switchTransaction.controls;
    if (data.folioNo) {
      this.scheme.mutualFundSchemeMasterId = data.mutualFundSchemeMasterId;
      this.getSchemeWiseFolios();
    }
  }

  getFormControl(): any {
    return this.switchTransaction.controls;
  }

  switch() {
    if (this.reInvestmentOpt.length > 1 && this.switchTransaction.controls.reinvest.invalid) {
      this.switchTransaction.get('reinvest').markAsTouched();
    } else if (this.switchTransaction.get('folioSelection').value == 1) {
      if (this.switchTransaction.get('investmentAccountSelection').invalid) {
        this.switchTransaction.get('investmentAccountSelection').markAsTouched();
        return;
      }
    } else if (this.switchTransaction.get('switchType').value != 3 && this.switchTransaction.get('employeeContry').invalid) {
      this.switchTransaction.get('employeeContry').markAsTouched();
      return;
    } else if (this.switchTransaction.get('switchType').invalid) {
      this.switchTransaction.get('switchType').markAsTouched();
      return;
    } else {

      const obj = {

        productDbId: this.schemeDetails.id,
        clientName: this.selectedFamilyMember,
        holdingNature: this.getDataSummary.defaultClient.holdingType,
        toProductDbId: this.schemeDetailsTransfer.id,
        mutualFundSchemeMasterId: this.scheme.mutualFundSchemeMasterId,
        toMutualFundSchemeMasterId: this.schemeTransfer.mutualFundSchemeMasterId,
        productCode: this.schemeDetails.schemeCode,
        isin: this.schemeDetails.isin,
        folioNo: (this.folioDetails == undefined) ? null : this.folioDetails.folioNumber,
        tpUserCredentialId: this.getDataSummary.defaultClient.tpUserCredentialId,
        tpSubBrokerCredentialId: this.getDataSummary.euin.id,
        familyMemberId: this.getDataSummary.defaultClient.familyMemberId,
        adminAdvisorId: this.getDataSummary.defaultClient.advisorId,
        clientId: this.getDataSummary.defaultClient.clientId,
        toIsin: this.schemeDetailsTransfer.isin,
        schemeCd: this.schemeDetails.schemeCode,
        euin: this.getDataSummary.euin.euin,
        qty: (this.switchTransaction.controls.switchType.value == 1) ? 0 : (this.switchTransaction.controls.switchType.value == 3) ? this.schemeDetails.balance_units : this.switchTransaction.controls.employeeContry.value,
        allRedeem: (this.switchTransaction.controls.switchType.value == 3) ? true : false,
        orderType: 'SWITCH',
        buySell: 'SWITCH_OUT',
        transCode: 'NEW',
        buySellType: 'FRESH',
        amountType: (this.switchTransaction.controls.switchType.value == 1) ? 'Amount' : 'Unit',
        dividendReinvestmentFlag: this.schemeDetailsTransfer.dividendReinvestmentFlag,
        clientCode: this.getDataSummary.defaultClient.clientCode,
        orderVal: this.switchTransaction.controls.employeeContry.value,
        bseDPTransType: 'PHYSICAL',
        aggregatorType: this.getDataSummary.defaultClient.aggregatorType,
        childTransactions: [],
        isException : true,
      };

      console.log('switch', obj);
      if (this.multiTransact == true) {
        console.log('new purchase obj', this.childTransactions);
        this.AddMultiTransaction();
        obj.childTransactions = this.childTransactions;
      }
      this.barButtonOptions.active = true;
      this.onlineTransact.transactionBSE(obj).subscribe(
        data => this.switchBSERes(data), (error) => {
          this.eventService.showErrorMessage(error);
        }
      );
    }
  }

  switchBSERes(data) {
    this.barButtonOptions.active = false;
    console.log('switch res == ', data);
    if (data == undefined) {

    } else {
      this.processTransaction.onAddTransaction('confirm', this.transactionSummary);
      Object.assign(this.transactionSummary, {allEdit: false});
    }
  }

  AddMultiTransaction() {
    if (this.isEdit != true) {
      this.id++;
    }
    if (this.reInvestmentOpt.length > 1) {
      if (this.switchTransaction.get('reinvest').invalid) {
        this.switchTransaction.get('reinvest').markAsTouched();
      }
    } else if (this.switchTransaction.get('schemeSwitch').invalid) {
      this.switchTransaction.get('schemeSwitch').markAsTouched();
      return;
    } else if (this.switchTransaction.get('investmentAccountSelection').invalid) {
      this.switchTransaction.get('investmentAccountSelection').markAsTouched();
      return;
    } else if (this.switchTransaction.get('transferIn').invalid) {
      this.switchTransaction.get('transferIn').markAsTouched();
      return;
    } else if (this.switchTransaction.get('switchType').invalid) {
      this.switchTransaction.get('switchType').markAsTouched();
      return;
    } else if (this.switchTransaction.get('employeeContry').invalid) {
      this.switchTransaction.get('employeeContry').markAsTouched();
      return;
    } else {
      this.multiTransact = true;
      if (this.scheme != undefined && this.schemeDetails != undefined && this.switchTransaction != undefined) {
        const obj = {
          id: this.id,
          amc: this.scheme.amcId,
          mutualFundSchemeMasterId: this.scheme.mutualFundSchemeMasterId,
          productDbId: this.schemeDetails.id,
          amountType: (this.switchTransaction.controls.switchType.value == 1) ? 'Amount' : 'Unit',
          toProductDbId: this.schemeDetailsTransfer.id,
          qty: (this.switchTransaction.controls.switchType.value == 1) ? 0 : (this.switchTransaction.controls.switchType.value == 3) ? this.schemeDetails.balance_units : this.switchTransaction.controls.employeeContry.value,
          allRedeem: (this.switchTransaction.controls.switchType.value == 3) ? true : false,
          toIsin: this.schemeDetailsTransfer.isin,
          isin: this.schemeDetails.isin,
          folioNo: (this.folioDetails == undefined) ? null : this.folioDetails.folioNumber,
          productCode: this.schemeDetails.schemeCode,
          dividendReinvestmentFlag: this.schemeDetails.dividendReinvestmentFlag,
          orderVal: this.switchTransaction.controls.employeeContry.value,
          schemeName: this.scheme.schemeName,
          transferIn: this.switchTransaction.get('transferIn').value,
          switchType: this.switchTransaction.get('switchType').value

        };
        if (this.isEdit == true) {
          this.childTransactions.forEach(element => {
            if (element.id == this.editedId) {
              element.mutualFundSchemeMasterId = this.scheme.mutualFundSchemeMasterId;
              element.id = this.editedId;
              element.folioNo = this.switchTransaction.get('investmentAccountSelection').value;
              element.orderVal = this.switchTransaction.get('employeeContry').value;
              element.schemeName = this.switchTransaction.get('schemeSwitch').value;
              element.switchType = this.switchTransaction.get('switchType').value;
              element.modeOfPaymentSelection = this.switchTransaction.get('modeOfPaymentSelection').value;
            }
            console.log(element);
          });
          this.isEdit = false;
        } else {
          this.childTransactions.push(obj);
        }
        console.log(this.childTransactions);
        this.schemeList = [];
        this.showUnits = false;
        this.switchTransaction.controls.switchType.reset();
        this.switchTransaction.controls.employeeContry.reset();
        this.switchTransaction.controls.investmentAccountSelection.reset();
        this.switchTransaction.controls.schemeSwitch.reset();
        this.switchTransaction.controls.transferIn.reset();
      }
    }
  }
}
