import { Component, OnInit, Input } from '@angular/core';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';

@Component({
  selector: 'app-detailed-view-life-insurance',
  templateUrl: './detailed-view-life-insurance.component.html',
  styleUrls: ['./detailed-view-life-insurance.component.scss']
})
export class DetailedViewLifeInsuranceComponent implements OnInit {
  _data: any;
  lifeData: any;
  nominee: any;

  constructor(private subInjectService:SubscriptionInject) { }
  @Input()
  set data(inputData) {
    this._data = inputData;
    console.log('AddLiabilitiesComponent Input data : ', this._data);
    this.lifeData = this._data
    this.nominee = this._data.nominees;
    // this.owners = this._data.realEstateOwners.filter(element => element.ownerName != this.realEstate.ownerName);

  }

  get data() {
    return this._data;
  }
  ngOnInit() {
  }
  close() {
    this.subInjectService.changeNewRightSliderState({ state: 'close' });
  }

}
