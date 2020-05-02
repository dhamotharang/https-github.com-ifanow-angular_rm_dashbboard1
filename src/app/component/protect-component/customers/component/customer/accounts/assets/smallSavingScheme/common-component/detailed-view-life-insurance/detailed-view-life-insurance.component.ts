import { Component, OnInit, Input } from '@angular/core';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';

@Component({
  selector: 'app-detailed-view-life-insurance',
  templateUrl: './detailed-view-life-insurance.component.html',
  styleUrls: ['./detailed-view-life-insurance.component.scss']
})
export class DetailedViewLifeInsuranceComponent implements OnInit {
  _data: any;
  nominee: any;
  cashFlowList: any;
  insuranceSubTypeId:any;
  showInsurance: any;
  constructor(private subInjectService:SubscriptionInject) { }
  @Input()
  set data(inputData) {
    this._data = inputData.data;
    this.insuranceSubTypeId =this._data.insuranceSubTypeId;
    this.showInsurance =(this._data.insuranceSubTypeId == '1') ? 'Term' : (this._data.insuranceSubTypeId == '2') ? 'Traditional' : (this._data.insuranceSubTypeId == '2') ?'ULIP' : 'Life';
    console.log('AddLiabilitiesCompon.insuranceSubTypeIdent.insuranceSubTypeId Input data : ', this._data);
    this.nominee = this._data.nominees;
    this.cashFlowList = this._data.insuranceCashflowList
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
