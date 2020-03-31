import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-service/authService';
import { BackOfficeService } from '../../../../back-office.service';

@Component({
  selector: 'app-all-sip',
  templateUrl: './all-sip.component.html',
  styleUrls: ['./all-sip.component.scss']
})
export class AllSipComponent implements OnInit {
  advisorId: any;
  dataSource: any;
  displayedColumns = ['no', 'applicantName', 'schemeName', 'folioNumber', 'fromDate', 'toDate',
    'frequency', 'amount'];
  totalAmount=0;

  constructor(private backoffice:BackOfficeService) { }

  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.getAllSip();

  }

  getAllSip()
  {
    const obj={
      limit:20,
      offset:0,
      advisorId:this.advisorId,
      arnRiaDetailsId:-1,
      parentId:-1
    }
    this.backoffice.allSipGet(obj).subscribe(
      data =>{
        this.dataSource=data;
        this.dataSource.forEach(element => {
          this.totalAmount += element.amount;
        });
        console.log(data);
      }
    )
  }
}
