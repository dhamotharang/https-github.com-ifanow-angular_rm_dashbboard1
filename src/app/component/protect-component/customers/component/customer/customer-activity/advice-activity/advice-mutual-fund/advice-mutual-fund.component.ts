import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { SelectAdviceComponent } from '../select-advice/select-advice.component';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-advice-mutual-fund',
  templateUrl: './advice-mutual-fund.component.html',
  styleUrls: ['./advice-mutual-fund.component.scss']
})
export class AdviceMutualFundComponent implements OnInit {
  displayedColumns2: string[] = ['checkbox', 'position', 'name', 'weight', 'symbol', 'status', 'date', 'adate', 'icons'];
  dataSource2 = ELEMENT_DATA2
  constructor(public dialog: MatDialog, private subInjectService: SubscriptionInject,private utilService :UtilService) { }

  ngOnInit() {
  }
  openselectAdvice(data) {
    const fragmentData = {
      flag: 'openselectAdvice',
      data,
      componentName: SelectAdviceComponent,

      state: 'open65'
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
          rightSideDataSub.unsubscribe();

        }
      }
    );
  }
}
export interface PeriodicElement2 {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  status: string;
  date: string;
  adate: string;
}

const ELEMENT_DATA2: PeriodicElement2[] = [
  {
    position: 'Rahul Jain', name: 'Surplus from life csh flows (Lumpsum)', weight: '35, 000', symbol: 'Invest towards Shreya’s Higher education and Rahul’s Retirement goal', status: 'Given',
    date: '23/12/2019', adate: '23/12/2019'
  },
  {
    position: 'Rahul Jain', name: 'Surplus from life csh flows (Lumpsum)',
    weight: '35, 000', symbol: 'Invest towards Shreya’s Higher education and Rahul’s Retirement goal',
    status: 'Given', date: '23/12/2019', adate: '23/12/2019'
  },

]