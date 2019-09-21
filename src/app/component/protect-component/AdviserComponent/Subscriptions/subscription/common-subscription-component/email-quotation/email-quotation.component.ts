import { Component, OnInit } from '@angular/core';
import { subscriptionInject } from '../../../subscription-inject.service';

@Component({
  selector: 'app-email-quotation',
  templateUrl: './email-quotation.component.html',
  styleUrls: ['./email-quotation.component.scss']
})
export class EmailQuotationComponent implements OnInit {

  constructor(public subInjectService:subscriptionInject) { }

  ngOnInit() {
  }
  Close(state)
  {
    this.subInjectService.rightSliderData(state)
  }
  closeTab(state,value)
  {
    console.log(state)
    this.subInjectService.rightSliderData(state)
    this.subInjectService.closeSlider(value)
  }
}
