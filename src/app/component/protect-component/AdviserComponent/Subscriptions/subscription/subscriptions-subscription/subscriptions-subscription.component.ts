import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/Data-service/event.service';
import { SubscriptionInject } from '../../subscription-inject.service';
import { MatDialog, MAT_DATE_FORMATS } from '@angular/material';
import { DeleteSubscriptionComponent } from '../common-subscription-component/delete-subscription/delete-subscription.component';
import { SubscriptionService } from '../../subscription.service';
import { ConfirmDialogComponent } from 'src/app/component/protect-component/common-component/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../../../../../auth-service/authService';
import * as _ from 'lodash';
import { EnumServiceService } from '../../../../../../services/enum-service.service';
import { UtilService } from '../../../../../../services/util.service';
import { DatePipe } from '@angular/common';
import { MY_FORMATS2 } from 'src/app/constants/date-format.constant';
import { FixedFeeComponent } from '../common-subscription-component/fixed-fee/fixed-fee.component';
import { VariableFeeComponent } from '../common-subscription-component/variable-fee/variable-fee.component';
import { CreateSubscriptionComponent } from '../common-subscription-component/create-subscription/create-subscription.component';
import { BillerSettingsComponent } from '../common-subscription-component/biller-settings/biller-settings.component';
import { InvoiceHistoryComponent } from '../common-subscription-component/invoice-history/invoice-history.component';
import { ChangePayeeComponent } from '../common-subscription-component/change-payee/change-payee.component';

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'LL',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };
// export const APP_DATE_FORMATS = {
//   parse: {
//     dateInput: {month: 'short', year: 'numeric', day: 'numeric'},
//   },
//   display: {
//     dateInput: 'input',
//     monthYearLabel: {year: 'numeric', month: 'numeric'},
//     dateA11yLabel: {
//       year: 'numeric', month: 'long', day: 'numeric'
//     },
//     monthYearA11yLabel: {year: 'numeric', month: 'long'},
//   }
// };


export interface PeriodicElement {
  client: string;
  service: string;
  amt: string;
  sub: string;
  status: string;
  activation: string;
  lastbilling: string;
  nextbilling: string;
  feemode: string;
}

@Component({
  selector: 'app-subscriptions-subscription',
  templateUrl: './subscriptions-subscription.component.html',
  styleUrls: ['./subscriptions-subscription.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },
    // { provide: MAT_DATE_LOCALE, useValue: 'en' },
    [DatePipe],
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2 },
  ],
})
export class SubscriptionsSubscriptionComponent implements OnInit {

  displayedColumns: string[] = ['client', 'service', 'amt', 'sub', 'status', 'activation',
    'lastbilling', 'nextbilling', 'feemode', 'icons'];

  subscriptionValue: any;
  @Input() upperData;
  advisorId;
  dataSource = [{}, {}, {}];
  DataToSend;
  isLoading = false;
  chips = [
    { name: 'LIVE', value: 2 },
    { name: 'FUTURE', value: 3 },
    { name: 'NOT STARTED', value: 1 },
    { name: 'CANCELLED', value: 4 }
  ];
  dateChips = [
    { name: 'Activation date', value: 1 },
    { name: 'Last billing date', value: 2 },
    { name: 'Next billing date', value: 3 }
  ];
  filterStatus = [];
  filterDate = [];
  statusIdList = [];
  // sendData: any[];
  senddataTo: any;
  showFilter = false;
  selectedStatusFilter;
  selectedDateFilter;
  dataTocheck: boolean;
  live: boolean;
  notStarted: boolean;
  future: boolean;
  feeCollectionMode: any;
  getDate: any;
  getDate2: string;
  selectedDateRange = { begin: new Date(), end: new Date() };
  noData: string;

  constructor(public dialog: MatDialog, public subInjectService: SubscriptionInject,
    private eventService: EventService, private subService: SubscriptionService,
    public enumService: EnumServiceService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.feeCollectionMode = this.enumService.getFeeCollectionModeData();
    // console.log("feeeee...",this.feeCollectionMode);
    this.getSummaryDataAdvisor();
    console.log('upperData', this.upperData);
  }

  getSummaryDataAdvisor() {
    const obj = {
      advisorId: this.advisorId,
      clientId: 0,
      flag: 0,
      dateType: 0,
      limit: 10,
      offset: 0,
      order: 0,
    };
    this.isLoading = true;
    this.subService.getSubSummary(obj).subscribe(
      data => this.getSubSummaryRes(data)
    );
  }

  getSubSummaryRes(data) {
    this.isLoading = false;
    if (data) {
      this.dataSource = data;
      this.DataToSend = data;
    } else {
      // console.log(data);
      this.noData = 'No Data Found';
    }
  }

  openPlanSlider(value, state, data) {
    let componentName;
    (value == 'billerSettings') ? componentName = BillerSettingsComponent : (value == 'changePayee') ? componentName = ChangePayeeComponent :
      (value == "SUBSCRIPTIONS") ? componentName = InvoiceHistoryComponent : (data.subscriptionPricing.feeTypeId == 1) ?
        data.subFlag = 'createSubFixed' : data.subFlag = 'createSubVariable';
    if (data.subFlag) { componentName = CreateSubscriptionComponent }
    data.isCreateSub = false;
    data.isSaveBtn = false;
    const fragmentData = {
      flag: value,
      data,
      id: 1,
      state: 'open',
      componentName: componentName
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
          rightSideDataSub.unsubscribe();
          this.getSummaryDataAdvisor();
        }
      }
    );

  }

  openFeeEditor(data) {
    let feeMode;
    data.isCreateSub = true;
    (data.subscriptionPricing.feeTypeId == 1) ? feeMode = FixedFeeComponent : feeMode = VariableFeeComponent;
    const fragmentData = {
      // flag: feeMode,
      data,
      id: 1,
      state: 'open',
      componentName: feeMode
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
          rightSideDataSub.unsubscribe();
          this.getSummaryDataAdvisor();
        }
      }
    );

  }

  deleteModal(value, subData) {
    const dialogData = {
      data: value,
      header: 'DELETE',
      body: 'Are you sure you want to delete the document GD?',
      body2: 'This cannot be undone',
      btnYes: 'CANCEL',
      btnNo: 'DELETE',
      positiveMethod: () => {
        const obj = {
          advisorId: this.advisorId,
          id: subData.id
        };
        this.subService.deleteSubscriptionData(obj).subscribe(
          data => {
            this.deletedData(data);
            dialogRef.close();
          }
        );

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

  showFilters(showFilter) {
    if (showFilter == true) {
      this.showFilter = false;
    } else {
      this.showFilter = true;
    }
    console.log('this.filterStatus: ', this.filterStatus);
    console.log('this.filterDate: ', this.filterDate);

  }

  addFilters(addFilters) {
    console.log('addFilters', addFilters);
    if (!_.includes(this.filterStatus, addFilters)) {
      this.filterStatus.push(addFilters);
      console.log(this.filterStatus)
    } else {
      // _.remove(this.filterStatus, this.senddataTo);
    }
    this.callFilter();
  }

  filterSubscriptionRes(data) {
    console.log('filterSubscriptionRes', data);
    if (data == undefined) {
      this.noData = 'No Data Found';
      this.dataSource = [];
    } else {
      this.dataSource = data;
    }
    // this.getSubSummaryRes(data);
  }

  addFiltersDate(dateFilter) {
    this.filterDate = []
    if (this.filterDate.length >= 1) {
      this.filterDate = []
    }
    this.filterDate.push((dateFilter == "1: Object") ? 1 : (dateFilter == "2: Object") ? 2 : 3);
    console.log('addFilters', dateFilter);
    const beginDate = new Date();
    beginDate.setMonth(beginDate.getMonth() - 1);
    UtilService.getStartOfTheDay(beginDate);

    const endDate = new Date();
    UtilService.getStartOfTheDay(endDate);

    this.selectedDateRange = { begin: beginDate, end: endDate };
    this.callFilter();
  }

  removeDate(item) {
    this.filterDate.splice(item, 1);
    this.callFilter();
  }

  remove(item) {
    this.filterStatus.splice(item, 1);
    this.callFilter();

  }

  orgValueChange(selectedDateRange) {
    const beginDate = new Date();
    beginDate.setMonth(beginDate.getMonth() - 1);
    UtilService.getStartOfTheDay(beginDate);

    const endDate = new Date();
    UtilService.getStartOfTheDay(endDate)
    this.selectedDateRange = { begin: selectedDateRange.begin, end: selectedDateRange.end };
    this.callFilter()
  }

  orgValueChange2(value) {
    console.log(value);
    this.getDate2 = this.datePipe.transform(value, 'yyyy-MM-dd');
    this.callFilter();

  }

  callFilter() {
    if (this.filterStatus && this.filterStatus.length > 0) {
      this.statusIdList = [];
      this.filterStatus.forEach(singleFilter => {
        this.statusIdList.push(singleFilter.value);
      });
    } else {
      this.statusIdList = [];
    }
    // this.statusIdList = (this.sendData == undefined) ? [] : this.sendData;
    const obj = {
      advisorId: this.advisorId,
      limit: -1,
      offset: 0,
      fromDate: (this.filterDate.length > 0) ? this.datePipe.transform(this.selectedDateRange.begin, 'yyyy-MM-dd') : null,
      toDate: (this.filterDate.length > 0) ? this.datePipe.transform(this.selectedDateRange.end, 'yyyy-MM-dd') : null,
      statusIdList: this.statusIdList,
      dateType: (this.filterDate.length == 0) ? 0 : this.filterDate,
    };
    console.log('this.callFilter req obj : ', obj);
    if (obj.statusIdList.length == 0 && obj.fromDate == null) {
      this.getSummaryDataAdvisor();
    } else {
      this.subService.filterSubscription(obj).subscribe(
        data => this.filterSubscriptionRes(data)
      );
    }
  }

  delete(data, value) {
    const Fragmentdata = {
      flag: data,
      subData: value
    };
    if (data === 'cancelSubscription') {
      const dialogRef = this.dialog.open(DeleteSubscriptionComponent, {
        width: '50%',
        // height:'40%',
        data: Fragmentdata,
        autoFocus: false,
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  deletedData(data) {
    if (data) {
      this.eventService.changeUpperSliderState({ state: 'close' });
      this.eventService.openSnackBar('Deleted successfully!', 'dismiss');
    }
  }
}
