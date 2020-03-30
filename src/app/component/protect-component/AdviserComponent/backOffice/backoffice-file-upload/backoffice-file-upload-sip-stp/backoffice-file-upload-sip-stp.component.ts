import { Component, OnInit, ViewChild } from '@angular/core';
import { ReconciliationService } from '../../backoffice-aum-reconciliation/reconciliation/reconciliation.service';
import { AuthService } from 'src/app/auth-service/authService';
import { MatSort, MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  name: string;
  rt: string;
  uploadDate: Date;
  status: string;
  download: string;
  uploadedBy:string;
}


@Component({
  selector: 'app-backoffice-file-upload-sip-stp',
  templateUrl: './backoffice-file-upload-sip-stp.component.html',
  styleUrls: ['./backoffice-file-upload-sip-stp.component.scss']
})
export class BackofficeFileUploadSipStpComponent implements OnInit {
  displayedColumns: string[] = ['name', 'rt', 'uploadDate','uploadedBy', 'status', 'download'];
  advisorId: any;
  isLoading = false;
  listData:any = [];
  dataSource;
  @ViewChild(MatSort, {static: true}) sortList: MatSort;
  constructor(private reconService: ReconciliationService) { }

  ngOnInit() {
    this.dataSource = [{}, {}, {}];
    this.isLoading = true;
    this.advisorId = AuthService.getAdvisorId();
    this.reconService.getBackOfficeSipStp({advisorId:this.advisorId}).subscribe((data)=>{
      this.listData = data;
      this.dataSource = new MatTableDataSource(this.listData);
      this.dataSource.sort = this.sortList;
      this.isLoading = false;
    })
  }
}