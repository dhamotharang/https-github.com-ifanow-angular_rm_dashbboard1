import { Component, OnInit } from '@angular/core';
import { EmailAdviceComponent } from '../email-advice/email-advice.component';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { UtilService } from 'src/app/services/util.service';
import { CustomerService } from '../../../customer.service';

@Component({
  selector: 'app-advice-all-portfolio',
  templateUrl: './advice-all-portfolio.component.html',
  styleUrls: ['./advice-all-portfolio.component.scss']
})
export class AdviceAllPortfolioComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'icons'];
  dataSource = ELEMENT_DATA;

  displayedColumns1: string[] = ['checkbox', 'position', 'name', 'weight', 'symbol', 'status', 'date', 'adate', 'icons'];
  dataSource1 = ELEMENT_DATA1;
  constructor(private subInjectService: SubscriptionInject, private cusService: CustomerService) { }

  ngOnInit() {
  }
  openConsentDialog(data) {
    const fragmentData = {
      flag: 'detailPoTd',
      data,
      id: 1,
      state: 'open',
      componentName: EmailAdviceComponent
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          if (UtilService.isRefreshRequired(sideBarData)) {
            console.log('this is sidebardata in subs subs 3 ani: ', sideBarData);

          }
          rightSideDataSub.unsubscribe();
        }

      }
    );
  }
}
export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'Rahul Jain', name: 'Surplus from life csh flows (Lumpsum)', weight: '35, 000', symbol: 'Invest towards Shreya’s Higher education and Rahul’s Retirement goal', },
  { position: 'Rahul Jain', name: 'Surplus from life csh flows (Lumpsum)', weight: '35, 000', symbol: 'Invest towards Shreya’s Higher education and Rahul’s Retirement goal', },

];
export interface PeriodicElement1 {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  status: string;
  date: string;
  adate: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
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