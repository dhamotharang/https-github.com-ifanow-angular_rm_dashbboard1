import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SubscriptionService } from '../../subscription.service';
import { SubscriptionInject } from '../../subscription-inject.service';
import { EventService } from 'src/app/Data-service/event.service';
import { ConfirmDialogComponent } from 'src/app/component/protect-component/common-component/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from '../../../../../../auth-service/authService';
import { UtilService, ValidatorType } from '../../../../../../services/util.service';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  date: string;
  invoicenum: string;
  name: string;
  email: string;
  status: string;
  duedate: string;
  amt: string;
  balance: string;
  
}

@Component({
  selector: 'app-invoices-subscription',
  templateUrl: './invoices-subscription.component.html',
  styleUrls: ['./invoices-subscription.component.scss']
})
export class InvoicesSubscriptionComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  

  chips = [
    {name: 'UNPAID', value: 0},
    {name: 'PAID', value: 1},
    {name: 'OVERDUE', value: 2}
  ];
  dateChips = [
    { name: 'Date', value: 1 },
    { name: 'Due date', value: 2 },
  ];
  invoiceDesign: string;
  noData: string;


  filterStatus = [];
  filterDate = [];
  statusIdList = [];
  filterDataArr = [];
  selectedStatusFilter: any = "statusFilter";
  selectedDateFilter: any = "dateFilter";
  lastFilterDataId;
  statusIdLength = 0;
  showFilter = false;
  selectedDateRange: { begin: Date; end: Date; };

  data: Array<any> = [{}, {}, {}];
  dataSource = new MatTableDataSource(this.data);
  list: any[];
  maxDate = new Date();
  numValidator = ValidatorType.NUMBER_ONLY;

  getData: any = "";
  scrollCallData: boolean = true;
  scrollPosition;
  lastDataId;
  tableData = [];


  constructor(public dialog: MatDialog, public subInjectService: SubscriptionInject, private subService: SubscriptionService,
              private eventService: EventService, public subscription: SubscriptionService, private datePipe: DatePipe) {
    this.ngOnInit();
  }

  isLoading = false;
  subscriptionValue: any;
  invoiceSub: any;
  invoiceSubscription: string;
  invoiceClientData: any;
  dataCount: any;
  showEdit: boolean;
  showPdfInvoice;
  singleInvoiceData;
  // showLoader = true;
  advisorId;
  displayedColumns: string[] = ['checkbox', 'date', 'invoicenum', 'name', 'status', 'email', 'duedate', 'amt', 'balance'];
  @Input() invoiceValue;

  ngOnInit() {
    // this.dataSource = [{}, {}, {}];
    this.advisorId = AuthService.getAdvisorId();
    this.getInvoiceSubData(false);
    this.showEdit = false;
    this.invoiceSubscription = 'false';
    this.invoiceDesign = 'true';
    this.dataCount = 0;

  }

  scrollCall(scrollLoader) {
    let uisubs = document.getElementById('ui-subs');
    let wrapper = document.getElementById('wrapper');

    var contentheight = wrapper.offsetHeight;
    var yoffset = uisubs.scrollTop;
    var y = yoffset + window.innerHeight;
    // console.log(y >= contentheight && this.getData != undefined && this.scrollCallData, this.scrollCallData, "this.scrollCallData 123");
    console.log(this.getData != undefined, this.scrollCallData, "|| this.statusIdList.length > 0");

    if ((y >= contentheight && this.getData != undefined && this.scrollCallData)) {
      this.scrollCallData = false;
      if (this.scrollPosition == undefined) {
        this.scrollPosition = contentheight - yoffset;
      }
      else if (this.scrollPosition < contentheight) {
        this.scrollPosition = contentheight - window.innerHeight;
      }

      console.log(this.scrollPosition, "this.scrollPosition 123");


      if (this.statusIdList.length <= 0) {

        this.getInvoiceSubData(scrollLoader);
      } else {
        this.callFilter();
      }

    }
  }

  getInvoiceSubData(scrollLoader) {
    this.isLoading = true;
    const obj = {
      id: this.advisorId,
      // id: 2735, // pass here advisor id for Invoice advisor
      module: 1
    };
    this.dataSource.data = [{}, {}, {}];
    this.subscription.getInvoices(obj).subscribe(
      data => {
        this.getData = data;
        if (data != undefined) {
          this.lastDataId = data[data.length - 1].id;
          // obj.offset = this.lastDataId;
          // console.log(this.lastDataId, obj, "data check");
          if (this.tableData.length <= 0) {
            this.tableData = data;
          }
          else {
            this.tableData = this.tableData.concat(data);
            console.log(this.tableData, "this.tableData 123");
          }
        } else {
          this.isLoading = false;        }
        this.getInvoiceResponseData(this.tableData);
      }, (error) => {
        this.eventService.openSnackBar('Somthing went worng!', 'dismiss');
        this.dataSource.data = [];
        this.isLoading = false;
      } 
    );
  }

  addInvoice(edit) {

    this.invoiceSubscription = edit;
    // this.invoiceDesign = edit;
    console.log('edit', edit);
  }

  getInvoiceResponseData(data) {
    // this.isLoading = false;
    // if (data == undefined) {
    //   this.dataSource.data = [];
    //   this.noData = 'No Data Found';
    // } else {
    //   console.log(data);
    //   const ELEMENT_DATA = data;
    //   this.invoiceClientData = data;
    //   ELEMENT_DATA.forEach(item => item.selected = false);
    //   // this.dataSource = ELEMENT_DATA;
    //   this.dataSource.data = ELEMENT_DATA;
    //   this.dataSource.sort = this.sort;
    //   // this.showLoader = false;
    // }

    let uisubs = document.getElementById('ui-subs');
    this.isLoading = false;
    console.log('  : ', data);

    if (data && data.length > 0) {
      this.data = data;
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      uisubs.scrollTo(0, this.scrollPosition);
      console.log(uisubs.scrollTop, this.scrollPosition, "this.yoffset");

      this.scrollCallData = true;
      // this.DataToSend = data;
    } else {
      this.data = [];
      this.dataSource.data = data;
      // console.log(data);
      this.dataSource.data = [];
      const ELEMENT_DATA = data;
      // this.invoiceClientData = data;
      ELEMENT_DATA.forEach(item => item.selected = false);
      // this.dataSource = ELEMENT_DATA;
      // this.dataSource.data = ELEMENT_DATA;
      this.noData = 'No Data Found';
    }
  }

  // showInvoicePdf(value)
  // {
  //  this.subscription.getSingleInvoiceData(value.id).subscribe(
  //    data=>this.getSingleResponseInvoicePdf(data)
  //  )
  // this.showPdfInvoice=true;
  // }
  openInvoice(data, value, state) {
    if (this.isLoading) {
      return
    }
    this.invoiceSub = value;
    this.invoiceSubscription = 'true';
    this.eventService.sidebarData(value);
    // this.subscriptionValue = value
    // this.subInjectService.rightSideData(state);
    this.subInjectService.addSingleProfile(data);
    // const fragmentData = {
    //   flag: value,
    //   data:data,
    //   id: 1,
    //   state: 'open'
    // };
    // const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
    //   sideBarData => {
    //     console.log('this is sidebardata in subs subs : ', sideBarData);
    //     this.dataTOget = sideBarData;

    //     if (UtilService.isDialogClose(sideBarData)) {
    //       console.log('this is sidebardata in subs subs 2: ', sideBarData);
    //       rightSideDataSub.unsubscribe();
    //       this.getSummaryDataAdvisor();
    //     }
    //   }
    // );
  }

  getSingleResponseInvoicePdf(data) {
    this.singleInvoiceData = data;
  }

  selectAll(event) {
    // const checked = event.target.checked;
    // this.dataSource.forEach(item => item.selected = 'checked');
    this.dataCount = 0;
    if (this.dataSource != undefined) {
      this.dataSource.filteredData.forEach(item => {
        item.selected = event.checked;
        if (item.selected) {
          this.dataCount++;
        }
      });
    }
  }

  changeSelect() {
    this.dataCount = 0;
    this.dataSource.filteredData.forEach(item => {
      console.log('item item ', item);
      if (item.selected) {
        this.dataCount++;
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource != undefined) {
      return this.dataCount === this.dataSource.filteredData.length;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selectAll({ checked: false }) : this.selectAll({ checked: true });
  }

  display(data) {
    console.log(data);
    this.ngOnInit();
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
      this.lastFilterDataId = 0;
      this.filterDataArr = [];
      console.log(this.filterStatus);
    } else {
      // _.remove(this.filterStatus, this.senddataTo);
    }

    console.log(this.filterStatus, "this.filterStatus 123");

    this.callFilter();
  }

  callFilter() {
    if (this.filterStatus && this.filterStatus.length > 0) {
      this.statusIdList = [];
      this.filterStatus.forEach(singleFilter => {
        this.statusIdList.push(singleFilter.value);
        console.log(this.statusIdList, "this.statusIdList 1233");
      });
    } else {
      this.statusIdList = [];
    }
    // this.statusIdList = (this.sendData == undefined) ? [] : this.sendData;
    console.log(this.lastFilterDataId, this.statusIdLength < this.statusIdList.length, "aaaa");

    const obj = {
      Id: this.advisorId,
      limit: 10,
      module: 1,
      offset: this.lastFilterDataId,
      fromDate: (this.filterDate.length > 0) ? this.datePipe.transform(this.selectedDateRange.begin, 'yyyy-MM-dd') : null,
      toDate: (this.filterDate.length > 0) ? this.datePipe.transform(this.selectedDateRange.end, 'yyyy-MM-dd') : null,
      statusIdList: this.statusIdList,
      dateType: (this.filterDate.length == 0) ? 0 : this.filterDate,
    };
    console.log('this.callFilter req obj : ', obj);
    if (obj.statusIdList.length == 0 && obj.fromDate == null) {
      this.getInvoiceSubData(false);
    } else {
      this.subService.filterInvoices(obj).subscribe(
        (data) => {
          this.filterSubscriptionRes(data)
        }
      );
    }
  }


  filterSubscriptionRes(data) {
    console.log('filterSubscriptionRes', data);
    if (data == undefined) {
      this.noData = 'No Data Found';
      // this.dataSource.data = [];
    } else {
      console.log(this.statusIdList.length, this.statusIdLength < this.statusIdList.length, this.statusIdLength, "this.statusIdList.length123");
      // if(this.statusIdLength < this.statusIdList.length || this.statusIdList.length <= 0){
      //   this.statusIdLength = this.statusIdList.length;
      //   this.lastFilterDataId = 0;
      // }else{

      this.lastFilterDataId = data[data.length - 1].id;
      // }
      console.log(this.lastFilterDataId, "this.lastFilterDataId");
      if (this.filterDataArr.length <= 0) {
        this.filterDataArr = data;
      }
      else {
        this.filterDataArr = this.filterDataArr.concat(data);
        console.log(this.filterDataArr, "this.filterDataArr 123");
      }
      this.scrollCallData = true;

      this.dataSource.data = this.filterDataArr;
    }
    // this.getSubSummaryRes(data);
  }

  addFiltersDate(dateFilter) {
    this.filterDate = [];
    if (this.filterDate.length >= 1) {
      this.filterDate = [];
    }
    this.filterDataArr = [];
    this.lastFilterDataId = 0;
    this.filterDate.push((dateFilter == '1: Object') ? 1 : (dateFilter == '2: Object') ? 2 : 3);
    console.log('addFilters', dateFilter);
    const beginDate = new Date();
    beginDate.setMonth(beginDate.getMonth() - 1);
    UtilService.getStartOfTheDay(beginDate);

    const endDate = new Date();
    UtilService.getStartOfTheDay(endDate);

    this.selectedDateRange = { begin: beginDate, end: endDate };
    console.log(this.filterDate, "this.filterDate 123");
    this.callFilter();
  }

  removeDate(item) {
    console.log(this.filterDate, "this.filterDate 123 r");
    this.selectedDateFilter = "dateFilter"
    this.filterDate.splice(item, 1);
    this.lastFilterDataId = 0;
    this.callFilter();
  }

  remove(item) {
    console.log(item, "item123");
    
    if (this.filterStatus[item].name == this.selectedStatusFilter.name) {
      this.selectedStatusFilter = "statusFilter";
    }

    this.filterStatus.splice(item, 1);
    this.filterDataArr = this.filterDataArr.filter((x) => { x.status != item.value })
    this.lastFilterDataId = 0;
    this.callFilter();

  }

  formatter(data) {
    data = Math.round(data);
    return data;
  }

  deleteModal(value) {
    this.list = [];
    this.dataSource.filteredData.forEach(singleElement => {
      if (singleElement.selected) {
        this.list.push(singleElement.id);
      }
    });
    const dialogData = {
      data: value,
      header: 'DELETE',
      body: 'Are you sure you want to delete?',
      body2: 'This cannot be undone',
      btnYes: 'CANCEL',
      btnNo: 'DELETE',
      positiveMethod: () => {
        this.subscription.deleteInvoices(this.list).subscribe(
          data => {
            this.dataCount = 0;
            this.eventService.openSnackBar('invoice deleted successfully.', 'dismiss');
            dialogRef.close();
            this.getInvoiceSubData(false);
          },
          err => this.eventService.openSnackBar(err)
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
}
