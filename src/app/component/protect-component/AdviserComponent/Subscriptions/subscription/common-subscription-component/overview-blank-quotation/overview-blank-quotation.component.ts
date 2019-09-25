import { Component, OnInit ,Input} from '@angular/core';
import { subscriptionInject } from '../../../subscription-inject.service';

@Component({
  selector: 'app-overview-blank-quotation',
  templateUrl: './overview-blank-quotation.component.html',
  styleUrls: ['./overview-blank-quotation.component.scss']
})
export class OverviewBlankQuotationComponent implements OnInit {

  constructor(public subInjectService:subscriptionInject) { }
  @Input () blankOverview:any;
  ngOnInit() {
  }
  
  Close(state)
  {
    this.subInjectService.rightSliderData(state); 
  }
}
