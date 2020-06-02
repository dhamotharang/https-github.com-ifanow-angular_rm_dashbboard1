import { Component, OnInit, ViewChild } from '@angular/core';
import { ReconciliationService } from '../../backoffice-aum-reconciliation/reconciliation/reconciliation.service';
import { AuthService } from 'src/app/auth-service/authService';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BackofficeFileUploadService } from '../backoffice-file-upload.service';
import { Subscription } from 'rxjs';
import { EventService } from '../../../../../../Data-service/event.service';

export interface PeriodicElement {
  name: string;
  rt: string;
  uploadDate: Date;
  range: string;
  status: string;
  download: string;
  added: Date;
  txnFile: string;
  uploadedBy: string;
}

@Component({
  selector: 'app-backoffice-file-upload-transactions',
  templateUrl: './backoffice-file-upload-transactions.component.html',
  styleUrls: ['./backoffice-file-upload-transactions.component.scss']
})

export class BackofficeFileUploadTransactionsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'rt', 'uploadDate', 'range', 'added', 'txnFile', 'uploadedBy', 'status', 'download'];
  advisorId: any;
  isLoading = false;
  listData: any = [];
  dataSource = new MatTableDataSource([{}, {}, {}]);
  filterObj: any;
  @ViewChild(MatSort, { static: true }) sortList: MatSort;
  constructor(
    private reconService: ReconciliationService,
    public router: ActivatedRoute,
    private BackOffice: BackofficeFileUploadService,
    private eventService: EventService) { }

  filter: any = {
    rt: 0,
    status: 2
  };
  private unSubcrip: Subscription;

  ngOnInit() {
    this.isLoading = true;
    this.advisorId = AuthService.getAdvisorId();

    this.unSubcrip = this.BackOffice.getFilterData().subscribe((data) => {
      this.filter = data;
      this.getBackOfficeTransactions(this.filter);
    })
    this.getBackOfficeTransactions(this.filter);
  }

  getBackOfficeTransactions(filter) {
    this.isLoading = true;
    this.dataSource.data = [{}, {}, {}];
    let obj = {
      advisorId: this.advisorId,
      rt: filter.rt,
      status: filter.status
    }

    this.reconService.getBackOfficeTransactions(obj).subscribe((data) => {
      this.isLoading = false;
      if (data) {
        this.listData = data;
        this.dataSource.data = this.listData;
        this.dataSource.sort = this.sortList;
      } else {
        this.dataSource.data = null;
      }
    }, err => {
      this.eventService.openSnackBar(err, "DISMISS")
      this.dataSource.data = null;
    });
  }

  ngOnDestroy() {
    this.unSubcrip.unsubscribe();
  }
}
