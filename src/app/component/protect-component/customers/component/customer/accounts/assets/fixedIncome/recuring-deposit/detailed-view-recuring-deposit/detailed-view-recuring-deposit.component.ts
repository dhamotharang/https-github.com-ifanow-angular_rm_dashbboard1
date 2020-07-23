import { Component, OnInit, Input } from '@angular/core';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { UtilService } from 'src/app/services/util.service';
import { EnumServiceService } from 'src/app/services/enum-service.service';

@Component({
  selector: 'app-detailed-view-recuring-deposit',
  templateUrl: './detailed-view-recuring-deposit.component.html',
  styleUrls: ['./detailed-view-recuring-deposit.component.scss']
})
export class DetailedViewRecuringDepositComponent implements OnInit {
  inputData: any;
  recuringDeposit: any;
  bankList:any = [];

  constructor(public utils: UtilService,private subInjectService: SubscriptionInject, private enumService: EnumServiceService) { }
  @Input()
  set data(data) {
    this.inputData = data;
  }

  get data() {
    return this.inputData;
  }
  
  ngOnInit() {
    this.recuringDeposit = this.inputData;
    this.bankList = this.enumService.getBank();
  }
  close() {
    this.subInjectService.changeNewRightSliderState({state: 'close'});
  }

}