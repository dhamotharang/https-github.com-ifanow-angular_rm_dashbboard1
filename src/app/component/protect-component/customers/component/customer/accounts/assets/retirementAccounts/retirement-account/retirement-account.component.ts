import { Component, OnInit, ViewChild } from '@angular/core';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { CustomerService } from '../../../../customer.service';
import { EventService } from 'src/app/Data-service/event.service';
import { UtilService } from 'src/app/services/util.service';
import { AuthService } from 'src/app/auth-service/authService';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-retirement-account',
  templateUrl: './retirement-account.component.html',
  styleUrls: ['./retirement-account.component.scss']
})
export class RetirementAccountComponent implements OnInit {
  
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  showRequring = '1';
  getObject: {};
  advisorId: any;
  dataGratuityList: any;
  dataSuperannuationList: any;
  EPSList: any;
  dataNPSList: any;
  clientId: any;
  constructor(private subInjectService: SubscriptionInject, private custumService: CustomerService, private eventService: EventService, public util: UtilService) { }
  displayedColumns11 = ['no', 'owner', 'cvalue', 'emp', 'empc', 'rate', 'bal', 'bacla', 'year', 'desc', 'status', 'icons'];
  datasource11;

  displayedColumns12 = ['no', 'owner', 'cvalue', 'total', 'scheme', 'pran', 'desc', 'status', 'icons'];
  datasource12;

  displayedColumns13 = ['no', 'owner', 'name', 'number', 'year', 'amt', 'reason', 'desc', 'status', 'icons'];
  datasource13;

  displayedColumns14 = ['no', 'owner', 'aemp', 'aempe', 'rate', 'grate', 'grateemp', 'date', 'desc', 'status', 'icons'];
  datasource14;

  displayedColumns15 = ['no', 'owner', 'nvalue', 'date', 'amt', 'pay', 'desc', 'status', 'icons'];
  datasource15;

  displayedColumns16 = ['no', 'owner', 'cvalue', 'rate', 'amt', 'number', 'mdate', 'desc', 'status', 'icons'];
  datasource16;
  dataEPSList = new MatTableDataSource(this.datasource11);
  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
    this.showRequring = '1'
    this.getObject = {
      clientId: this.clientId,
      advisorId: this.advisorId
    }
    this.getListEPF()
    this.dataEPSList.sort = this.sort;
  }
  getfixedIncomeData(value) {
    this.showRequring = value;
    (value == '2') ? this.getListNPS() : (value == '3') ? this.getListGratuity() : (value == '4') ? this.getListSuperannuation() : (value == '5') ? this.getListEPS() : this.getListEPF()
  }
  openRetirement(value, state, data) {
    const fragmentData = {
      Flag: value,
      data: data,
      id: 1,
      state:state
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        if (value == 'added') {
          this.getListEPF()
        } else if (value == 'addedGratuity') {
          this.getListGratuity()
        } else if (value == 'addedEps') {
          this.getListEPS()
        } else if (value == 'addedSuperannuation') {
          this.getListSuperannuation()
        } else {
          this.getListNPS()
        }
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
          rightSideDataSub.unsubscribe();

        }
      }
    );
  }
  getListEPF() {
    let obj = this.getObject
    this.custumService.getEPF(obj).subscribe(
      data => this.getEPFRes(data)
    );
  }
  getEPFRes(data) {
    console.log('getEPFRes =', data)
    this.dataEPSList = data.listOfEpf
  }
  getListGratuity() {
    let obj = this.getObject
    this.custumService.getGrauity(obj).subscribe(
      data => this.getGrauityRes(data)
    );
  }
  getGrauityRes(data) {
    console.log('getGrauityRes =', data)
    this.dataGratuityList = data.gratuityList
  }
  getListNPS() {
    let obj = this.getObject
    this.custumService.getNPS(obj).subscribe(
      data => this.getNPSRes(data)
    );
  }
  getNPSRes(data) {
    console.log('getNPSRes =', data)
    this.dataNPSList = data
  }
  getListSuperannuation() {
    let obj = this.getObject
    this.custumService.getSuperannuation(obj).subscribe(
      data => this.getSuperannuationRes(data)
    );
  }
  getSuperannuationRes(data) {
    console.log('getSuperannuationRes =', data)
    this.dataSuperannuationList = data.superannuationList
  }
  getListEPS() {
    let obj = this.getObject
    this.custumService.getEPS(obj).subscribe(
      data => this.getEPSRes(data)
    );
  }
  getEPSRes(data) {
    console.log('getEPSRes =', data)
    this.EPSList = data
  }
}
export interface PeriodicElement11 {
  no: string;
  owner: string;
  cvalue: string;
  emp: string;
  empc: string;
  rate: string;
  bal: string;
  bacla: string;
  year: string;
  desc: string;
  status: string;
}


export interface PeriodicElement12 {
  no: string;
  owner: string;
  cvalue: string;
  total: string;
  pran: string;
  scheme: string;
  desc: string;
  status: string;
}

export interface PeriodicElement13 {
  no: string;
  owner: string;
  name: string;
  number: string;
  year: string;
  amt: string;
  reason: string;
  desc: string;
  status: string;
}

export interface PeriodicElement15 {
  no: string;
  owner: string;
  nvalue: string;
  date: string;
  amt: string;
  pay: string;
  desc: string;
  status: string;
}

export interface PeriodicElement16 {
  no: string;
  owner: string;
  cvalue: string;
  rate: string;
  amt: string;
  number: string;
  mdate: string;
  desc: string;
  status: string;
}

export interface PeriodicElement14 {
  no: string;
  owner: string;
  aemp: string;
  aempe: string;
  rate: string;
  grate: string;
  grateemp: string;
  date: string;
  desc: string;
  status: string;
}

