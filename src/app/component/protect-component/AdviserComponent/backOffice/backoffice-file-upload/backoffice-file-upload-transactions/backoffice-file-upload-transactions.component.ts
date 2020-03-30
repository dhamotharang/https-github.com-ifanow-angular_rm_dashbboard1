import { Component, OnInit, ViewChild } from '@angular/core';
import { ReconciliationService } from '../../backoffice-aum-reconciliation/reconciliation/reconciliation.service';
import { AuthService } from 'src/app/auth-service/authService';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  name: string;
  rt: string;
  uploadDate: Date;
  range: string;
  status: string;
  download: string;
  added:Date;
  txnFile:string;
  uploadedBy:string;
}

@Component({
  selector: 'app-backoffice-file-upload-transactions',
  templateUrl: './backoffice-file-upload-transactions.component.html',
  styleUrls: ['./backoffice-file-upload-transactions.component.scss']
})

export class BackofficeFileUploadTransactionsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'rt', 'uploadDate', 'range', 'added', 'txnFile','uploadedBy', 'status', 'download'];
  advisorId: any;
  isLoading = false;
  listData:any = [];
  dataSource;
  filterObj:any;
  @ViewChild(MatSort, {static: true}) sortList: MatSort;
  constructor(private reconService: ReconciliationService, public router : ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = [{}, {}, {}];
    this.isLoading = true;
    this.advisorId = AuthService.getAdvisorId();
    this.reconService.getBackOfficeTransactions({advisorId:this.advisorId}).subscribe((data)=>{
      this.listData = data;
      this.dataSource = new MatTableDataSource(this.listData);
      this.dataSource.sort = this.sortList;
      this.isLoading = false;
    })
    
    // this.router.paramMap.subscribe((paramMap) => {
    //   if(paramMap.has("fliter")){
    //     this.filterObj = paramMap.get("fliter");
    //   }
    // });
    this.router.data.subscribe(data => {
      this.filterObj=data;
  })
  }
}