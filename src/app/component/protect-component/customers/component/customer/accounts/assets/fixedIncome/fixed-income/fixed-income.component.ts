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
  dataSource: any = new MatTableDataSource();;
  clientId: any;
  sumAmountInvested: any;
  sumCurrentValue: any;
  sumMaturityValue: any;
  totalCurrentValue = 0;
  totalMarketValue = 0;
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
  hidePdf: boolean;
  noData: string;
  fixedDepositList: any;


  constructor(private excelSer: ExcelService, private subInjectService: SubscriptionInject,
    private customerService: CustomerService, private eventService: EventService,
    public util: UtilService, public dialog: MatDialog) {
  }

  viewMode;
  displayedColumns4 = ['no', 'owner', 'type', 'cvalue', 'rate', 'amt', 'mdate', 'mvalue', 'number', 'desc', 'status', 'icons'];
  displayedColumns5 = ['no', 'owner', 'cvalue', 'rate', 'amt', 'mdate', 'number', 'desc', 'status', 'icons'];
  displayedColumns6 = ['no', 'owner', 'cvalue', 'camt', 'amt', 'cdate', 'rate', 'mvalue', 'tenure', 'type', 'desc', 'status', 'icons'];
  filterMode;
  dataSourceFixedFiltered;
  isFixedIncomeFiltered = false;

  ngOnInit() {
    this.showRequring = '1';
    this.hidePdf = true;
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();

    this.getFixedDepositList();
    // this.dataSource = new MatTableDataSource(this.data);
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
      this.dataSource.filteredData.forEach(element => {
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
      this.dataSource.filteredData.forEach(element => {
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
      this.dataSource.filteredData.forEach(element => {
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

  filterFixedIncome(key: string, value: any) {
    let dataFiltered;
    dataFiltered = this.fixedDepositList.filter(function (item) {
      return item[key] === value;
    });

    this.isFixedIncomeFiltered = true;
    this.dataSource.data = dataFiltered;
    // this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.fixedIncomeTableSort;
    // const obj = {
    //   clientId: this.clientId,
    //   advisorId: this.advisorId
    // };
    // this.customerService.getFixedDeposit(obj).subscribe(
    //   data => {
    //     console.log(data.fixedDepositList);
    //     let dataFiltered = data.fixedDepositList.filter(function (item) {
    //       console.log("this is filtering values::::::::", item, item[key], value);
    //       return item[key] === value;
    //     });
    //     // let dataFiltered = data.fixedDepositList.filter(function (item) {
    //     //   if (item[`${key}`] === value) {
    //     //     return item;
    //     //   };
    //     // });
    //     console.log('this is filtered data ------------>', dataFiltered);

    //     console.log('sorted ------------>', this.dataSource);
    //   }
    // );
  }

  changeRecurringFilterMode(value) {
    console.log('this is filter data', value);
    this.dataSource.filter = value.trim().toLowerCase();
  }

  changeFixedIncomeFilterMode(value) {
    console.log('this is filter data', value);
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getfixedIncomeData(value) {
    console.log('value++++++', value);
    this.showRequring = value;

    this.isLoading = true;
    this.dataSource.data = [{}, {}, {}];
    if (value == '2') {
      this.getRecurringDepositList();
    } else if (value == '3') {
      this.getBondsList();
    } else {
      this.getFixedDepositList();
    }

  }

  getFixedDepositList() {
    this.isLoading = true;
    const obj = {
      clientId: this.clientId,
      advisorId: this.advisorId
    };
    this.dataSource.data = [{}, {}, {}];
    this.customerService.getFixedDeposit(obj).subscribe(
      data => this.getFixedDepositRes(data), (error) => {
        this.eventService.showErrorMessage(error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }

  getFixedDepositRes(data) {
    this.isLoading = false;

    console.log('getFixedDepositRes ********** ', data);
    if (data == undefined) {
      this.noData = "No scheme found";
      this.dataSource.data = [];
    } else if (data.fixedDepositList) {
      this.fixedDepositList = data.fixedDepositList;
      this.dataSource.data = data.fixedDepositList;
      this.dataSource.sort = this.fixedIncomeTableSort;
      console.log('soted &&&&&&&&&', this.dataSource);
      UtilService.checkStatusId(this.dataSource.filteredData);
      this.sumCurrentValue = 0;
      this.dataSource.filteredData.forEach((o) => {
        if (o.nomineePercentageShare) {
          this.sumCurrentValue += o.nomineePercentageShare;
        }

      });
      console.log('sumCurrentValue', this.sumCurrentValue);
      this.sumAmountInvested = data.sumAmountInvested;
      this.sumCurrentValue = data.sumCurrentValue;
      this.sumMaturityValue = data.sumMaturityValue;
    } else {
      this.noData = 'No scheme found';
      this.dataSource.data = [];
    }

  }

  getRecurringDepositList() {
    this.isLoading = true;
    const obj = {
      clientId: this.clientId,
      advisorId: this.advisorId
    };
    this.dataSource.data = [{}, {}, {}];
    this.customerService.getRecurringDeposit(obj).subscribe(
      data => this.getRecurringDepositRes(data), (error) => {
        this.eventService.showErrorMessage(error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }


  getRecurringDepositRes(data) {
    this.isLoading = false;
    if (data == undefined) {
      this.noData = 'No scheme found';
      this.dataSource.data = [];
    }
    else if (data.recurringDeposits) {
      console.log('FixedIncomeComponent getRecuringDepositRes data *** ', data);
      this.dataSource.data = data.recurringDeposits;
      this.dataSource.sort = this.recurringDepositTableSort;
      UtilService.checkStatusId(this.dataSource.filteredData);
      data.recurringDeposits.forEach(element => {
        this.totalCurrentValue += element.currentValue
        this.totalMarketValue += element.monthlyContribution
      });
    } else {
      this.noData = 'No scheme found';
      this.dataSource.data = [];
    }
  }

  getBondsList() {
    this.isLoading = true;
    const obj = {
      clientId: this.clientId,
      advisorId: this.advisorId
    };
    this.dataSource.data = [{}, {}, {}];
    this.customerService.getBonds(obj).subscribe(
      data => this.getBondsRes(data), (error) => {
        this.eventService.showErrorMessage(error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }

  getBondsRes(data) {
    this.isLoading = false;
    if (data == undefined) {
      this.noData = 'No scheme found';
      this.dataSource.data = [];
    } else if (data.bondList) {
      console.log('getBondsRes ******** ', data);
      this.dataSource.data = data.bondList;
      this.dataSource.sort = this.bondListTableSort;
      UtilService.checkStatusId(this.dataSource.filteredData);
      this.sumAmountInvestedB = data.sumAmountInvested;
      this.sumCouponAmount = data.sumCouponAmount;
      this.sumCurrentValueB = data.sumCurrentValue;
    } else {
      this.noData = 'No scheme found';
      this.dataSource.data = [];
    }
  }

  deleteModal(value, data) {
    const dialogData = {
      data: value,
      header: 'DELETE',
      body: 'Are you sure you want to delete?',
      body2: 'This cannot be undone.',
      btnYes: 'CANCEL',
      btnNo: 'DELETE',
      positiveMethod: () => {
        if (value == 'FIXED DEPOSIT') {
          this.customerService.deleteFixedDeposite(data.id).subscribe(
            data => {
              this.eventService.openSnackBar('Fixed deposit is deleted', 'Dismiss');
              dialogRef.close();
              this.getFixedDepositList();
            },
            error => this.eventService.showErrorMessage(error)
          );
        } else if (value == 'RECURRING DEPOSIT') {
          this.customerService.deleteRecurringDeposite(data.id).subscribe(
            data => {
              this.eventService.openSnackBar('Recurring deposit is deleted', 'Dismiss');
              dialogRef.close();
              this.getRecurringDepositList();
            },
            error => this.eventService.showErrorMessage(error)
          );
        } else {
          this.customerService.deleteBond(data.id).subscribe(
            data => {
              dialogRef.close();
              this.getBondsList();
            },
            error => this.eventService.showErrorMessage(error)
          );
        }
        this.eventService.openSnackBar("Deleted successfully!", "Dismiss");
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
    let popupHeaderText = !!data ? 'Edit Fixed deposit' : 'Add Fixed deposit';
    const fragmentData = {
      flag: value,
      data,
      id: 1,
      state: 'open',
      componentName: FixedDepositComponent,
      popupHeaderText: popupHeaderText,
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          if (UtilService.isRefreshRequired(sideBarData)) {
            this.getFixedDepositList();
            console.log('this is sidebardata in subs subs 3 ani: ', sideBarData);

          }
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

        if (UtilService.isRefreshRequired(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);

        }
        rightSideDataSub.unsubscribe();
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
    let popupHeaderText = !!data ? 'Edit Recurring deposit' : 'Add Recurring deposit';
    const fragmentData = {
      flag: 'addRecuringDeposit',
      data,
      id: 1,
      state: 'open',
      componentName: RecuringDepositComponent,
      popupHeaderText: popupHeaderText,
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          if (UtilService.isRefreshRequired(sideBarData)) {
            this.getRecurringDepositList();
            console.log('this is sidebardata in subs subs 3 ani: ', sideBarData);

          }
          rightSideDataSub.unsubscribe();
        }
      }
    );
  }

  openBonds(data) {
    let popupHeaderText = !!data ? 'Edit Bond' : 'Add Bond';
    const fragmentData = {
      flag: 'BondsComponent',
      data,
      id: 1,
      state: 'open',
      componentName: BondsComponent,
      popupHeaderText: popupHeaderText,
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          if (UtilService.isRefreshRequired(sideBarData)) {
            this.getBondsList();
            console.log('this is sidebardata in subs subs 3 ani: ', sideBarData);

          }
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
        if (UtilService.isRefreshRequired(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);

        }
        rightSideDataSub.unsubscribe();
      }
    );
  }
}


