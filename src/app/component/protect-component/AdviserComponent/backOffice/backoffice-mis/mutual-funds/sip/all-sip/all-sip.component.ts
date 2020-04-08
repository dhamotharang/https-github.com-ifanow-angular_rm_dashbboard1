import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth-service/authService';
import { BackOfficeService } from '../../../../back-office.service';
import { SipComponent } from '../sip.component';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-all-sip',
  templateUrl: './all-sip.component.html',
  styleUrls: ['./all-sip.component.scss']
})
export class AllSipComponent implements OnInit {
  advisorId: any;
  dataSource: any;
  showLoader=true;
  displayedColumns = ['no', 'applicantName', 'schemeName', 'folioNumber', 'fromDate', 'toDate',
    'frequency', 'amount'];
  totalAmount=0;
  isLoading=false;
  @Output() changedValue = new EventEmitter();

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private backoffice:BackOfficeService,private sip:SipComponent) { }

  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.getAllSip();

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.sort = this.sort;
  }
  getAllSip()
  {
  this.isLoading=true;
  this.dataSource=new MatTableDataSource([{},{},{}]);
    const obj={
      limit:20,
      offset:0,
      advisorId:this.advisorId,
      arnRiaDetailsId:-1,
      parentId:-1
    }
    this.backoffice.allSipGet(obj).subscribe(
      data =>{
        this.isLoading=false;
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.filteredData.forEach(element => {
          this.totalAmount += element.amount;
        });
        console.log(data);
      },
      err=>{
        this.isLoading=false;
      }
    )
  }
  aumReport()
  {
    this.changedValue.emit(true);
  //  this.sip.sipComponent=true;
  }
}