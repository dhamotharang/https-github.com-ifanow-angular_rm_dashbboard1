import { EventService } from 'src/app/Data-service/event.service';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cashflow-upper-slider',
  templateUrl: './cashflow-upper-slider.component.html',
  styleUrls: ['./cashflow-upper-slider.component.scss']
})
export class CashflowUpperSliderComponent implements OnInit {

  displayedColumns: string[] = ['description', 'month1', 'month2', 'month3', 'month4', 'month5', 'month6', 'month7', 'month8', 'month9', 'month10', 'month11', 'month12', 'total'];
  dataSource = ELEMENT_DATA;

  constructor(private subInjectService: SubscriptionInject,
    private eventService: EventService) { }

  ngOnInit() {
  }



  close() {
    this.eventService.changeUpperSliderState({ state: 'close' });
  }

}


export interface uppertablebox {
  description: string;
  month1: string;
  month2: string;
  month3: string;
  month4: string;
  month5: string;
  month6: string;
  month7: string;
  month8: string;
  month9: string;
  month10: string;
  month11: string;
  month12: string;
  total: string;
}


const ELEMENT_DATA: uppertablebox[] = [
  { description: '2020', month1: '25', month2: '21', month3: '2,10,000', month4: '121', month5: '121', month6: '121', month7: '12', month8: '12', month9: '12', month10: '445', month11: '12', month12: '12', total: '121' },

];