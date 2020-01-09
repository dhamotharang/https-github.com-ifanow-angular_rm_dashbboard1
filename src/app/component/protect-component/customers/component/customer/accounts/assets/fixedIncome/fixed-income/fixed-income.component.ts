import { RecuringDepositComponent } from './../recuring-deposit/recuring-deposit.component';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { EventService } from 'src/app/Data-service/event.service';
import { AuthService } from 'src/app/auth-service/authService';
import { CustomerService } from '../../../../customer.service';
import { ConfirmDialogComponent } from 'src/app/component/protect-component/common-component/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { DetailedViewFixedDepositComponent } from '../fixed-deposit/detailed-view-fixed-deposit/detailed-view-fixed-deposit.component';
import { FixedDepositComponent } from '../fixed-deposit/fixed-deposit.component';
import { DetailedViewRecuringDepositComponent } from '../recuring-deposit/detailed-view-recuring-deposit/detailed-view-recuring-deposit.component';
import { DetailedViewBondsComponent } from '../bonds/detailed-view-bonds/detailed-view-bonds.component';
import { BondsComponent } from '../bonds/bonds.component';
import { UtilService } from 'src/app/services/util.service';
import { FormatNumberDirective } from 'src/app/format-number.directive';
import { ExcelService } from '../../../../excel.service';
import { MathUtilService } from "../../../../../../../../../services/math-util.service";


@Component({
  selector: 'app-fixed-income',
  templateUrl: './fixed-income.component.html',
  styleUrls: ['./fixed-income.component.scss']
})
export class FixedIncomeComponent implements OnInit {
  isLoading = false;
  showRequring: any;
  advisorId: any;
  dataSourceRecurring: any;
  dataSourceBond: any;
  clientId: any;
  sumAmountInvested: any;
  sumCurrentValue: any;
  sumMaturityValue: any;
  totalCurrentValue: any;
  totalMarketValue: any;
  sumAmountInvestedB: any;
  sumCouponAmount: any;
  sumCurrentValueB: any;

  @ViewChild('fixedIncomeTableSort', { static: false }) fixedIncomeTableSort: MatSort;
  @ViewChild('recurringDepositTable', { static: false }) recurringDepositTableSort: MatSort;
  @ViewChild('bondListTable', { static: false }) bondListTableSort: MatSort;
  @ViewChildren(FormatNumberDirective) formatNumber;
  excelData: any[];
  footer = [];
  data: Array<any> = [{}, {}, {}];
  dataSourceFixed = new MatTableDataSource(this.data);
  hidePdf: boolean;
  noData: string;


  constructor(private excelSer: ExcelService, private subInjectService: SubscriptionInject,
    private customerService: CustomerService, private eventService: EventService,
    public util: UtilService, public dialog: MatDialog) {
  }

  viewMode;
  displayedColumns4 = ['no', 'owner', 'type', 'cvalue', 'rate', 'amt', 'mdate', 'mvalue', 'number', 'desc', 'status', 'icons'];
  datasource4 = ELEMENT_DATA4;
  displayedColumns5 = ['no', 'owner', 'cvalue', 'rate', 'amt', 'mdate', 'number', 'desc', 'status', 'icons'];
  datasource5 = ELEMENT_DATA5;
  displayedColumns6 = ['no', 'owner', 'cvalue', 'camt', 'amt', 'cdate', 'rate', 'mvalue', 'tenure', 'type', 'desc', 'status', 'icons'];
  datasource6 = ELEMENT_DATA6;
  filterMode;
  dataSourceFixedFiltered;
  isFixedIncomeFiltered = false;

  ngOnInit() {
    this.showRequring = '1';
    this.hidePdf = true;
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();

    this.getFixedDepositList();
    // this.dataSourceFixed = new MatTableDataSource(this.data);
  }

  Close() {

  }

  async ExportTOExcel(value) {
    this.excelData = [];
    let data = [];
    var headerData, header, footerData;
    if (value == 'Fixed Deposit') {
      headerData = [{ width: 20, key: 'Owner' },
      { width: 20, key: 'Type of FD' },
      { width: 25, key: 'Current value' },
      { width: 25, key: 'Rate' },
      { width: 18, key: 'Amount invested' },
      { width: 18, key: 'Maturity date' },
      { width: 18, key: 'Maturity value' },
      { width: 18, key: 'FD number' },
      { width: 15, key: 'Description' },
      { width: 10, key: 'Status' },];
      header = ['Owner', 'Type of FD', 'Current value', 'Rate', 'Amount invested',
        'Maturity date', 'FD number', 'Description', 'Status'];
      this.dataSourceFixed.filteredData.forEach(element => {
        data = [element.ownerName, MathUtilService.formatAndRoundOffNumber(element.fdType),
        MathUtilService.formatAndRoundOffNumber(element.currentValue),
        MathUtilService.formatAndRoundOffNumber(element.interestRate),
        new Date(element.maturityDate), MathUtilService.formatAndRoundOffNumber(element.maturityValue),
        element.fdNumber, element.description, element.status];
        this.excelData.push(Object.assign(data));
      });
      footerData = ['Total', '',
        MathUtilService.formatAndRoundOffNumber(this.sumCurrentValue), '',
        MathUtilService.formatAndRoundOffNumber(this.sumAmountInvested), '',
        MathUtilService.formatAndRoundOffNumber(this.sumMaturityValue), '', '', '',];
      this.footer.push(Object.assign(footerData));
    } else if (value == 'Fixed Reccuring') {
      headerData = [
        { width: 20, key: 'Owner' },
        { width: 20, key: 'Current value' },
        { width: 25, key: 'Rate' },
        { width: 25, key: 'Monthly contribution' },
        { width: 18, key: 'Maturity date' },
        { width: 18, key: 'RD number' },
        { width: 15, key: 'Description' },
        { width: 10, key: 'Status' },
      ];
      header = ['Owner', 'Current value', 'Rate', 'Monthly contribution',
        'Maturity date', 'RD number', 'Description', 'Status'];
      this.dataSourceRecurring.filteredData.forEach(element => {
        data = [element.ownerName, MathUtilService.formatAndRoundOffNumber(element.currentValue),
        (element.interestRate), MathUtilService.formatAndRoundOffNumber(element.monthlyContribution),
        new Date(element.maturityDate), (element.rdNumber), element.description, element.status];
        this.excelData.push(Object.assign(data));
      });
      footerData = ['Total',
        MathUtilService.formatAndRoundOffNumber(this.totalCurrentValue), '', '',
        MathUtilService.formatAndRoundOffNumber(this.totalMarketValue), '', '', ''];
      this.footer.push(Object.assign(footerData));
    } else {
      headerData = [{ width: 20, key: 'Owner' },
      { width: 20, key: 'Current value' },
      { width: 25, key: 'Coupon amount' },
      { width: 18, key: 'Amount invested' },
      { width: 18, key: 'Commencement date' },
      { width: 18, key: 'Rate' },
      { width: 18, key: 'Maturity value' },
      { width: 18, key: 'Tenure' },
      { width: 18, key: 'Type' },
      { width: 15, key: 'Description' },
      { width: 10, key: 'Status' },];
      header = ['Owner', 'Current value', 'Coupon amount', 'Amount invested', 'Commencement date',
        'Rate', 'Maturity value', 'Tenure', 'Type', 'Description', 'Status'];
      this.dataSourceBond.filteredData.forEach(element => {
        data = [element.ownerName, MathUtilService.formatAndRoundOffNumber(element.currentValue),
        MathUtilService.formatAndRoundOffNumber(element.couponAmount), (element.amountInvested),
        new Date(element.commencementDate),
        (element.rate), (element.maturityValue), (element.tenure), ((element.type == 1) ? 'Tax free' : 'Non tax free'), element.description, element.status];
        this.excelData.push(Object.assign(data));
      });
      footerData = ['Total', MathUtilService.formatAndRoundOffNumber(this.sumCurrentValueB),
        MathUtilService.formatAndRoundOffNumber(this.sumCouponAmount),
        MathUtilService.formatAndRoundOffNumber(this.sumAmountInvestedB), '', '', '', '', '', '', ''];
      this.footer.push(Object.assign(footerData));

    }
    ExcelService.exportExcel(headerData, header, this.excelData, this.footer, value);
  }

  filterFixedIncome(key: string, value: string) {

    const obj = {
      clientId: this.clientId,
      advisorId: this.advisorId
    };
    this.customerService.getFixedDeposit(obj).subscribe(
      data => {
        data = data.fixedDepositList.filter(function (item) {
          return item[`${key}`] === value;
        });
        console.log('this is filtered data ------------>', data);
        this.isFixedIncomeFiltered = true;
        this.dataSourceFixed.data = data;
        // this.dataSourceFixed = new MatTableDataSource(data);
        this.dataSourceFixed.sort = this.fixedIncomeTableSort;
        console.log('sorted ------------>', this.dataSourceFixed);
      }
    );
  }

  changeRecurringFilterMode(value) {
    console.log('this is filter data', value);
    this.dataSourceRecurring.filter = value.trim().toLowerCase();
  }

  changeFixedIncomeFilterMode(value) {
    console.log('this is filter data', value);
    this.dataSourceFixed.filter = value.trim().toLowerCase();
  }

  getfixedIncomeData(value) {
    console.log('value++++++', value);
    this.showRequring = value;


    if (value == '2') {
      this.dataSourceRecurring = new MatTableDataSource(this.data);
      this.getRecurringDepositList();
    } else if (value == '3') {
      this.dataSourceBond = new MatTableDataSource(this.data);
      this.getBondsList();
    } else {
      this.dataSourceFixed = new MatTableDataSource(this.data);
      this.getFixedDepositList();
    }

  }

  getFixedDepositList() {
    this.isLoading = true;
    const obj = {
      clientId: this.clientId,
      advisorId: this.advisorId
    };
    this.dataSourceFixed.data = [{}, {}, {}];
    this.customerService.getFixedDeposit(obj).subscribe(
      data => this.getFixedDepositRes(data), (error) => {
        this.eventService.openSnackBar('Something went worng!', 'dismiss');
        this.dataSourceFixed.data = [];
        this.isLoading = false;
      }
    );
  }

  getFixedDepositRes(data) {
    this.isLoading = false;
    console.log('getFixedDepositRes ********** ', data);

    if (data.fixedDepositList) {
      this.dataSourceFixed.data = data.fixedDepositList;
      this.dataSourceFixed.sort = this.fixedIncomeTableSort;
      console.log('soted &&&&&&&&&', this.dataSourceFixed);
      UtilService.checkStatusId(this.dataSourceFixed.filteredData);
      this.sumCurrentValue = 0;
      this.dataSourceFixed.filteredData.forEach((o) => {
        console.log('1128313618361836183618316836&&&&&&&&&', this.sumCurrentValue);

        if (o.nomineePercentageShare) {
          this.sumCurrentValue += o.nomineePercentageShare;
        }

      });
      console.log('&&&&&&&&&', this.sumCurrentValue);
      this.sumAmountInvested = data.sumAmountInvested;
      this.sumCurrentValue = data.sumCurrentValue;
      this.sumMaturityValue = data.sumMaturityValue;
    } else {
      this.noData = 'No scheme found';
      this.dataSourceFixed.data = [];
    }

  }

  getRecurringDepositList() {
    this.isLoading = true;
    const obj = {
      clientId: this.clientId,
      advisorId: this.advisorId
    };
    this.dataSourceRecurring.data = [{}, {}, {}];
    this.customerService.getRecurringDeposit(obj).subscribe(
      data => this.getRecurringDepositRes(data), (error) => {
        this.eventService.openSnackBar('Somthing went worng!', 'dismiss');
        this.dataSourceRecurring.data = [];
        this.isLoading = false;
      }
    );
  }


  getRecurringDepositRes(data) {
    if (data == undefined) {
      this.noData = 'No scheme found';
      this.dataSourceRecurring.data = [];
    }
    this.isLoading = false;
    console.log('FixedIncomeComponent getRecuringDepositRes data *** ', data);
    if (data == undefined) {
      this.noData = 'No scheme found';
      this.dataSourceRecurring.data = [];
    }
    else if (data.recurringDeposits) {
      this.dataSourceRecurring.data = data.recurringDeposits;
      this.dataSourceRecurring.sort = this.recurringDepositTableSort;
      UtilService.checkStatusId(this.dataSourceRecurring.filteredData);
      this.totalCurrentValue = data.totalCurrentValue;
      this.totalMarketValue = data.totalMarketValue;
    } else {
      this.noData = 'No scheme found';
      this.dataSourceRecurring.data = [];
    }
  }

  getBondsList() {
    this.isLoading = true;
    const obj = {
      clientId: this.clientId,
      advisorId: this.advisorId
    };
    this.dataSourceBond.data = [{}, {}, {}];
    this.customerService.getBonds(obj).subscribe(
      data => this.getBondsRes(data), (error) => {
        this.eventService.openSnackBar('Something went worng!', 'dismiss');
        this.dataSourceBond.data = [];
        this.isLoading = false;
      }
    );
  }

  getBondsRes(data) {
    this.isLoading = false;
    console.log('getBondsRes ******** ', data);

    if (data.bondList) {
      this.dataSourceBond.data = data.bondList;
      this.dataSourceBond.sort = this.bondListTableSort;
      UtilService.checkStatusId(this.dataSourceBond.filteredData);
      this.sumAmountInvestedB = data.sumAmountInvested;
      this.sumCouponAmount = data.sumCouponAmount;
      this.sumCurrentValueB = data.sumCurrentValue;
    } else {
      this.noData = 'No scheme found';
      this.dataSourceBond.data = [];
    }
  }

  deleteModal(value, data) {
    const dialogData = {
      data: value,
      header: 'DELETE',
      body: 'Are you sure you want to delete?',
      body2: 'This cannot be undone',
      btnYes: 'CANCEL',
      btnNo: 'DELETE',
      positiveMethod: () => {
        if (value == 'FIXED DEPOSITE') {
          this.customerService.deleteFixedDeposite(data.id).subscribe(
            data => {
              this.eventService.openSnackBar('Fixed deposite is deleted', 'dismiss');
              dialogRef.close();
              this.getFixedDepositList();
            },
            err => this.eventService.openSnackBar(err)
          );
        } else if (value == 'RECURRING DEPOSITE') {
          this.customerService.deleteRecurringDeposite(data.id).subscribe(
            data => {
              this.eventService.openSnackBar('Recurring deposite is deleted', 'dismiss');
              dialogRef.close();
              this.getRecurringDepositList();
            },
            err => this.eventService.openSnackBar(err)
          );
        } else {
          this.customerService.deleteBond(data.id).subscribe(
            data => {
              this.eventService.openSnackBar('Bond is deleted', 'dismiss');
              dialogRef.close();
              this.getBondsList();
            },
            err => this.eventService.openSnackBar(err)
          );
        }
      },
      negativeMethod: () => {
        console.log('2222222222222222222222222222222222222');
      }
    };
    console.log(dialogData + '11111111111111');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
      autoFocus: false,

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openPortfolioSummary(value, data) {
    const fragmentData = {
      flag: value,
      data,
      id: 1,
      state: 'open',
      componentName: FixedDepositComponent
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        this.getFixedDepositList();
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
          rightSideDataSub.unsubscribe();

        }
      }
    );
  }

  openDetailedFixedDeposit(value, data) {
    const fragmentData = {
      flag: value,
      data,
      id: 1,
      state: 'open35',
      componentName: DetailedViewFixedDepositComponent
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
          rightSideDataSub.unsubscribe();

        }
      }
    );
  }

  detailedViewRecurringDeposit(data) {
    const fragmentData = {
      flag: 'RECURRING_DEPOSITE',
      data,
      id: 1,
      state: 'open35',
      componentName: DetailedViewRecuringDepositComponent
    };
    this.subInjectService.changeNewRightSliderState(fragmentData);
  }

  openAddRecurringDeposit(data) {
    const fragmentData = {
      flag: 'addRecuringDeposit',
      data,
      id: 1,
      state: 'open',
      componentName: RecuringDepositComponent
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        this.getRecurringDepositList();
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
          rightSideDataSub.unsubscribe();
        }
      }
    );
  }

  openBonds(data) {
    const fragmentData = {
      flag: 'BondsComponent',
      data,
      id: 1,
      state: 'open',
      componentName: BondsComponent
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        this.getBondsList();
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
          rightSideDataSub.unsubscribe();

        }
      }
    );
  }

  detailedViewBonds(data) {
    const fragmentData = {
      flag: 'DetailedViewBondsComponent',
      data,
      id: 1,
      state: 'open35',
      componentName: DetailedViewBondsComponent
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
          rightSideDataSub.unsubscribe();

        }
      }
    );
  }
}

export interface PeriodicElement4 {
  no: string;
  owner: string;
  type: string;
  cdate: string;
  rate: string;
  amt: string;
  mdate: string;
  mvalue: string;
  number: string;
  desc: string;
  status: string;
}

const ELEMENT_DATA4: PeriodicElement4[] = [
  {
    no: '1.', owner: 'Ronak Hasmukh Hindocha', type: 'Bank FD',
    cdate: '60,000', rate: '8.40%', amt: '1,00,000', mdate: '18/09/2019', mvalue: '1,00,000',
    number: '980787870909', desc: 'ICICI FD', status: 'LIVE'
  },
  {
    no: '2.', owner: 'Rupa Ronak Hindocha', type: 'Bank FD',
    cdate: '60,000', rate: '8.40%', amt: '1,00,000', mdate: '18/09/2019', mvalue: '1,00,000',
    number: '980787870909', desc: 'ICICI FD', status: 'LIVE'
  },
  {
    no: '3.', owner: 'Ronak Hasmukh Hindocha', type: 'Bank FD',
    cdate: '60,000', rate: '8.40%', amt: '1,00,000', mdate: '18/09/2019', mvalue: '1,00,000',
    number: '980787870909', desc: 'ICICI FD', status: 'LIVE'
  },
  {
    no: '4', owner: 'Total', type: '',
    cdate: '1,28,925', rate: '8.40%', amt: '1,50,000', mdate: '', mvalue: '1,50,000',
    number: '', desc: '', status: ''
  }, {
    no: '4', owner: 'Total', type: '',
    cdate: '1,28,925', rate: '8.40%', amt: '1,50,000', mdate: '', mvalue: '1,50,000',
    number: '', desc: '', status: ''
  }, {
    no: '4', owner: 'Total', type: '',
    cdate: '1,28,925', rate: '8.40%', amt: '1,50,000', mdate: '', mvalue: '1,50,000',
    number: '', desc: '', status: ''
  },


];

export interface PeriodicElement5 {
  no: string;
  owner: string;
  cvalue: string;
  rate: string;
  amt: string;
  mdate: string;
  number: string;
  desc: string;
  status: string;
}

const ELEMENT_DATA5: PeriodicElement5[] = [
  {
    no: '1.', owner: 'Ronak Hasmukh Hindocha',
    cvalue: '60,000', rate: '8.40%', amt: '1,00,000', mdate: '18/09/2019',
    number: '980787870909', desc: 'ICICI FD', status: 'LIVE'
  },
  {
    no: '2.', owner: 'Rupa Ronak Hindocha',
    cvalue: '60,000', rate: '8.40%', amt: '1,00,000', mdate: '18/09/2019',
    number: '980787870909', desc: 'ICICI FD', status: 'LIVE'
  },
  {
    no: '3.', owner: 'Ronak Hasmukh Hindocha',
    cvalue: '60,000', rate: '8.40%', amt: '1,00,000', mdate: '18/09/2019',
    number: '980787870909', desc: 'ICICI FD', status: 'LIVE'
  },
  {
    no: '', owner: 'Total',
    cvalue: '1,28,925', rate: '8.40%', amt: '1,50,000', mdate: '',
    number: '', desc: '', status: ''
  },


];

export interface PeriodicElement6 {
  no: string;
  owner: string;
  cvalue: string;
  camt: string;
  amt: string;
  cdate: string;
  rate: string;
  mvalue: string;
  tenure: string;
  type: string;
  desc: string;
  status: string;
}

const ELEMENT_DATA6: PeriodicElement6[] = [
  {
    no: '1.',
    owner: 'Ronak Hasmukh Hindocha',
    cvalue: '60,000',
    camt: '1,00,000',
    amt: '1,00,000',
    cdate: '18/09/2019',
    rate: '8.40%',
    mvalue: '18/09/2019',
    tenure: '12',
    type: 'Tax free',
    desc: 'ICICI FD',
    status: 'LIVE'
  },
  {
    no: '2.',
    owner: 'Rupa Ronak Hindocha',
    cvalue: '60,000',
    camt: '1,00,000',
    amt: '1,00,000',
    cdate: '18/09/2019',
    rate: '8.40%',
    mvalue: '18/09/2019',
    tenure: '12',
    type: 'Tax free',
    desc: 'ICICI FD',
    status: 'LIVE'
  },
  {
    no: '', owner: 'Total',
    cvalue: '1,28,925', camt: '1,50,000', amt: '1,50,000', cdate: '', rate: '', mvalue: '', tenure: '', type: '',
    desc: '', status: ''
  },


];
