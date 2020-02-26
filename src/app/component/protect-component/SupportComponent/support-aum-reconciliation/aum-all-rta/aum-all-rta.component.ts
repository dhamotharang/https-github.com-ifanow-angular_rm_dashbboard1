import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UpperSliderBackofficeComponent } from '../../common-component/upper-slider-backoffice/upper-slider-backoffice.component';
import { AuthService } from 'src/app/auth-service/authService';
import { UtilService } from 'src/app/services/util.service';
import { EventService } from 'src/app/Data-service/event.service';

@Component({
  selector: 'app-aum-all-rta',
  templateUrl: './aum-all-rta.component.html',
  styleUrls: ['./aum-all-rta.component.scss']
})
export class AumAllRtaComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading = false;
  displayedColumns = ['rt', 'advisorName', 'arnria', 'doneOn', 'doneBy', 'total', 'before', 'after', 'aumBalance', 'transaction', 'report']
  dataSource = new MatTableDataSource<AumAllRtaI>(ELEMENT_DATA);

  constructor(public eventService: EventService, ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  openUpperModule(flag, data) {
    data.flag = flag
    console.log('hello mf button clicked');
    const fragmentData = {
      flag: 'clietns',
      id: 1,
      data,
      direction: 'top',
      componentName: UpperSliderBackofficeComponent,
      state: 'open'
    };
    // this.router.navigate(['/subscription-upper'])
    AuthService.setSubscriptionUpperSliderData(fragmentData);
    const subscription = this.eventService.changeUpperSliderState(fragmentData).subscribe(
      upperSliderData => {
        if (UtilService.isDialogClose(upperSliderData)) {
          // this.getClientSubscriptionList();
          subscription.unsubscribe();
        }
      }
    );

  }

}


export interface AumAllRtaI {
  rt: string;
  advisorName: string;
  arnria: number;
  doneOn: string;
  doneBy: string;
  total: string;
  before: string;
  after: string;
  aumBalance: string;
  transaction: string;
  report: string;
}

const ELEMENT_DATA: AumAllRtaI[] = [
  { rt: 'CAMS', advisorName: 'Admin Name', arnria: 1.0079, doneOn: 'H', doneBy: '30 mins ago', total: 'active', before: 'planName', after: '18/03/2020', aumBalance: '3', transaction: '1', report: '' },
  { rt: 'CAMS', advisorName: 'Rahul Jain', arnria: 4.0026, doneOn: 'He', doneBy: '30 mins ago', total: 'active', before: 'planName', after: '18/03/2020', aumBalance: '3', transaction: '1', report: '' },
  { rt: 'KARVY', advisorName: 'Admin Name', arnria: 1.0079, doneOn: 'H', doneBy: '30 mins ago', total: 'active', before: 'planName', after: '18/03/2020', aumBalance: '3', transaction: '1', report: '' },
  { rt: 'KARVY', advisorName: 'ajdbvkaj', arnria: 4.0026, doneOn: 'He', doneBy: '30 mins ago', total: 'active', before: 'planName', after: '18/03/2020', aumBalance: '3', transaction: '1', report: '' },
  { rt: 'FRANKLIN', advisorName: 'Admin Name', arnria: 1.0079, doneOn: 'H', doneBy: '30 mins ago', total: 'active', before: 'planName', after: '18/03/2020', aumBalance: '3', transaction: '1', report: '' },
  { rt: 'FRANKLIN', advisorName: 'saldv', arnria: 4.0026, doneOn: 'He', doneBy: '30 mins ago', total: 'active', before: 'planName', after: '18/03/2020', aumBalance: '3', transaction: '1', report: '' },
  { rt: 'KARVY', advisorName: 'Admin Name', arnria: 1.0079, doneOn: 'H', doneBy: '30 mins ago', total: 'active', before: 'planName', after: '18/03/2020', aumBalance: '3', transaction: '1', report: '' },
  { rt: 'CAMS', advisorName: 'weruibnkc', arnria: 4.0026, doneOn: 'He', doneBy: '30 mins ago', total: 'active', before: 'planName', after: '18/03/2020', aumBalance: '3', transaction: '1', report: '' },

];
