import {Component, OnInit, ViewChild, Output, EventEmitter, Input} from '@angular/core';
import {AuthService} from 'src/app/auth-service/authService';
import {BackOfficeService} from '../../../../back-office.service';
import {SipComponent} from '../sip.component';
import {MatSort, MatTableDataSource} from '@angular/material';
import {EventService} from '../../../../../../../../Data-service/event.service';
import {ExcelGenService} from 'src/app/services/excel-gen.service';
import {ExcelMisSipService} from '../../aum/excel-mis-sip.service';

@Component({
  selector: 'app-all-sip',
  templateUrl: './all-sip.component.html',
  styleUrls: ['./all-sip.component.scss']
})
export class AllSipComponent implements OnInit {
  advisorId: any;
  dataSource: any;
  showLoader = true;
  displayedColumns = ['no', 'applicantName', 'schemeName', 'folioNumber', 'fromDate', 'toDate',
    'frequency', 'amount'];
  totalAmount = 0;
  isLoading = false;
  parentId = AuthService.getUserInfo().parentId ? AuthService.getUserInfo().parentId : -1;
  @Input() mode;
  @Input() data;
  @Output() changedValue = new EventEmitter();

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('tableEl', {static: false}) tableEl;
  arnRiaValue: any;
  viewMode: any;
  hasEndReached: any;
  infiniteScrollingFlag: boolean;
  finalClientList: any;

  constructor(
    private backoffice: BackOfficeService,
    private sip: SipComponent,
    private eventService: EventService,
    private excelGen: ExcelMisSipService
  ) {
  }

  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    if (this.mode == 'expired') {
      this.displayedColumns = ['no', 'applicantName', 'schemeName', 'folioNumber', 'fromDate', 'toDate', 'ceaseDate', 'amount', 'reason'];
    } else if (this.mode == 'expiring') {
      this.displayedColumns = ['no', 'applicantName', 'schemeName', 'folioNumber', 'fromDate', 'toDate', 'amount', 'reason'];
    } else {
      this.displayedColumns = ['no', 'applicantName', 'schemeName', 'folioNumber', 'fromDate', 'toDate', 'frequency', 'amount', 'reason'];
    }

    if (this.data.hasOwnProperty('arnRiaValue') && this.data.hasOwnProperty('viewMode')) {
      this.arnRiaValue = this.data.arnRiaValue;
      this.viewMode = this.data.viewMode;
    } else {
      this.viewMode = 'All';
      this.arnRiaValue = -1;
    }
    this.getAllSip();
  }

  Excel(tableTitle) {
    const rows = this.tableEl._elementRef.nativeElement.rows;
    const data = this.excelGen.generateExcel(rows, tableTitle);

  }

  // Excel(tableTitle) {
  //   setTimeout(() => {
  //     var blob = new Blob([document.getElementById('template').innerHTML], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
  //     });
  //     saveAs(blob, tableTitle + ".xls");
  //   }, 200);
  //   // if (data) {
  //   //   this.fragmentData.isSpinner = false;
  //   // }
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.sort = this.sort;
  }

  getAllSip() {
    this.isLoading = true;
    this.dataSource = new MatTableDataSource([{}, {}, {}]);
    const obj = {
      limit: 20,
      offset: 0,
      advisorId: (this.parentId > 0 )? this.advisorId : 0,
      arnRiaDetailsId: (this.data) ? this.data.arnRiaId : -1,
      parentId: (this.data) ? this.data.parentId : -1
    };
    if (this.mode == 'all') {
      this.backoffice.allSipGet(obj).subscribe(
        data => {
          console.log(data);
          this.isLoading = false;
          if (data) {
            this.response(data);
          } else {
            this.dataSource.filteredData = [];
          }

        },
        err => {
          this.isLoading = false;
          this.dataSource.filteredData = [];
        }
      );
    } else if (this.mode == 'expired') {
      this.backoffice.GET_expired(obj).subscribe(
        data => {
          this.isLoading = false;
          if (data) {
            this.response(data);
          } else {
            this.dataSource.filteredData = [];
          }

        },
        err => {
          this.isLoading = false;
          this.dataSource.filteredData = [];
        }
      );
    } else {
      this.backoffice.GET_EXPIRING(obj).subscribe(
        data => {
          this.isLoading = false;
          if (data) {
            this.response(data);
          } else {
            this.dataSource.filteredData = [];
          }

        },
        err => {
          this.isLoading = false;
          this.dataSource.filteredData = [];
        }
      );
    }

  }

  onWindowScroll(e: any) {
    if (this.tableEl._elementRef.nativeElement.querySelector('tbody').querySelector('tr:last-child').offsetTop <= (e.target.scrollTop + e.target.offsetHeight + 200)) {
      if (!this.hasEndReached) {
        this.infiniteScrollingFlag = true;
        this.hasEndReached = true;
        this.getClientList(this.finalClientList.length);
        // this.getClientList(this.finalClientList[this.finalClientList.length - 1].clientId)
      }

    }
  }
  getClientList(length: any) {
    throw new Error("Method not implemented.");
  }


  response(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.filteredData.forEach(element => {
      this.totalAmount += element.amount;
    });
  }

  aumReport() {
    this.changedValue.emit({
      value: true,
      arnRiaValue: this.arnRiaValue,
      viewMode: this.viewMode
    });
    //  this.sip.sipComponent=true;
  }
}
