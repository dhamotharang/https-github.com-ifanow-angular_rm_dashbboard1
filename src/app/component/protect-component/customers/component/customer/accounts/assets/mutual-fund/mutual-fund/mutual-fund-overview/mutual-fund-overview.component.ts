import { Component, OnInit } from '@angular/core';
import { UpperCustomerComponent } from 'src/app/component/protect-component/customers/component/common-component/upper-customer/upper-customer.component';
import { AddMutualFundComponent } from '../add-mutual-fund/add-mutual-fund.component';
import { MFSchemeLevelHoldingsComponent } from '../mfscheme-level-holdings/mfscheme-level-holdings.component';
import { MFSchemeLevelTransactionsComponent } from '../mfscheme-level-transactions/mfscheme-level-transactions.component';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { UtilService } from 'src/app/services/util.service';
import { EventService } from 'src/app/Data-service/event.service';
import * as Highcharts from 'highcharts';
const HighchartsMore = require('highcharts/highcharts-more.src');
HighchartsMore(Highcharts);

@Component({
  selector: 'app-mutual-fund-overview',
  templateUrl: './mutual-fund-overview.component.html',
  styleUrls: ['./mutual-fund-overview.component.scss']
})
export class MutualFundOverviewComponent implements OnInit {

  constructor(public subInjectService:SubscriptionInject,public UtilService:UtilService,public eventService:EventService) { }
  displayedColumns = ['name', 'amt', 'value', 'abs', 'xirr', 'alloc'];
  dataSource = ELEMENT_DATA;

  displayedColumns1 = ['data', 'amts'];
  datasource1 = ELEMENT_DATA1;
  ngOnInit() {
    this.pieChart('piechartMutualFund')
  }
  onClick(referenceKeyName) {
    alert(referenceKeyName.id);
  }
 
  pieChart(id){
    Highcharts.chart('piechartMutualFund', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
      },
      title: {
          text: '',
          align: 'center',
          verticalAlign: 'middle',
          y: 60
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              dataLabels: {
                  enabled: true,
                  distance: -50,
                  style: {
                      fontWeight: 'bold',
                      color: 'white'
                  }
              },
              startAngle: 0,
              endAngle: 360,
              center: ['52%', '55%'],
              size: '120%'
          }
      },
      series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize: '60%',
        data: [
		           {
                name: 'Equity',
                y: 23,
                color: "#008FFF",
                dataLabels: {
                    enabled: false
                }
            },{
                name: 'Debt',
                y: 13,
                color: "#5DC644",
                dataLabels: {
                    enabled: false
                }
            },{
                name: 'Hybrid',
                y: 25.42,
                color: "#FFC100",
                dataLabels: {
                    enabled: false
                }
            },{
                name: 'Other',
                y: 12.61,
                color: "#A0AEB4",
                dataLabels: {
                    enabled: false
                }
            },{
            	name: 'Solutions oriented',
                y: 23.42,
                 color: "#FF7272",
                dataLabels: {
                    enabled: false
                }
            }
        ]
    }]
  });
  }
  openMutualFund(flag, data) {
    let component;
    switch (true) {
      case (flag == "addPortfolio"):
        component = AddMutualFundComponent;
        break;
      case (flag == "holding"):
        component = MFSchemeLevelHoldingsComponent;
        break;
      default:
        component = MFSchemeLevelTransactionsComponent
    }
    const fragmentData = {
      flag: 'editMF',
      data,
      id: 1,
      state: 'open',
      componentName: component
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
  openUpperFragment(data) {
    /* const fragmentData = {
       flag: 'emailOnly',
       data: clientData,
       id: 1,
       state: 'open'
     };
     const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
       sideBarData => {
         console.log('this is sidebardata in subs subs : ', sideBarData);
         if (UtilService.isDialogClose(sideBarData)) {
           console.log('this is sidebardata in subs subs 2: ',);
           rightSideDataSub.unsubscribe();
         }
       }
     );*/
    const fragmentData = {
      flag: 'app-upper-customer',
      id: 1,
      data,
      direction: 'top',
      componentName: UpperCustomerComponent,
      state: 'open'
    };

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
export interface PeriodicElement {
  name: string;
  amt: string;
  value: string;
  abs: number;
  xirr: number;
  alloc: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Aditya Birla Sun Life Frontline Equity Fund-Growth	',
    amt: '2,28,580',
    value: '2,28,580',
    abs: 26.99,
    xirr: 8.32,
    alloc: 20.32
  },
  { name: 'ICICI Equity Fund Growth	', amt: '2,28,580', value: '2,28,580', abs: 26.99, xirr: 8.32, alloc: 20.32 },
  { name: 'HDFC Top 200', amt: '2,28,580', value: '2,28,580', abs: 26.99, xirr: 8.32, alloc: 20.32 },
  {
    name: 'Aditya Birla Sun Life Frontline Equity Fund-Growth',
    amt: '2,28,580',
    value: '2,28,580',
    abs: 26.99,
    xirr: 8.32,
    alloc: 20.32
  },
  { name: 'Total', amt: '2,28,580', value: '2,28,580', abs: 26.99, xirr: 8.32, alloc: 20.32 },
];

export interface PeriodicElement1 {
  data: string;
  amts: string;
}
const ELEMENT_DATA1: PeriodicElement1[] = [
  { data: 'a. Investment', amts: '15,70,000' },
  { data: 'b. Switch In', amts: '2,28,580' },
  { data: 'c. Switch Out', amts: '2,28,580' },
  { data: 'd. Redemption', amts: '0' },
  { data: 'e. Dividend Payout', amts: '0' },
  { data: 'f. Net Investment (a+b-c-d-e)', amts: '2,28,580' },
  { data: 'g. Market Value', amts: '2,28,580' },
  { data: 'h. Net Gain (g-f)', amts: '2,28,580' },
  { data: 'i. Realized XIRR (All Transactions)', amts: '2.81 %' },

];

