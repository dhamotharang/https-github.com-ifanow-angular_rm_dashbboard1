import { Component, OnInit, Input } from '@angular/core';
import { EnumServiceService } from 'src/app/services/enum-service.service';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';

@Component({
  selector: 'app-detailed-view-insurance-planning',
  templateUrl: './detailed-view-insurance-planning.component.html',
  styleUrls: ['./detailed-view-insurance-planning.component.scss']
})
export class DetailedViewInsurancePlanningComponent implements OnInit {
  _data: any;
  nominee: any;
  cashFlowList: any;
  insuranceSubTypeId: any;
  showInsurance: any;
  bankList: any;
  displayList: any;
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;
  displayedColumns1: string[] = ['position', 'name', 'weight'];
  dataSource1 = ELEMENT_DATA1;
  constructor(private enumService: EnumServiceService, private subInjectService: SubscriptionInject) {
  }

  @Input()
  set data(inputData) {
    this._data = inputData.data;
    this.insuranceSubTypeId = inputData.data.insuranceSubTypeId;
    this.showInsurance = inputData.showInsurance
    this.displayList = inputData.displayList;
    // this.owners = this._data.realEstateOwners.filter(element => element.ownerName != this.realEstate.ownerName);

  }

  get data() {
    return this._data;
  }

  ngOnInit() {
    this.bankList = this.enumService.getBank();
    this.bankList.forEach(element => {
      if (element.id == this._data.insurance.linkedBankAccountId) {
        this._data.insurance.bankName = element.bankName;
      }
    });

    this.displayList.policyTypes.forEach(ele => {
      if (this._data.insurance.policyTypeId) {
        if (ele.id == this._data.insurance.policyTypeId) {
          this._data.insurance.policyType = ele.policy_type
        }
      }

    });
  }

  close() {
    this.subInjectService.changeNewRightSliderState({ state: 'close' });
  }

}
export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: '65656644564555', name: 'Policy number', weight: '65656644564555' },
  { position: '65656644564555', name: 'Name of insurer', weight: 'National insurance' },
  { position: '65656644564555', name: 'Plan name', weight: 'floater' },
  { position: '65656644564555', name: 'Premium', weight: '65656644564555' },
  { position: '65656644564555', name: 'Policy start date', weight: '04/05/2019' },
  { position: '65656644564555', name: 'Policy expiry date', weight: '04/05/2019' },
  { position: '65656644564555', name: 'Copay', weight: '₹ 54,654' },
  { position: '65656644564555', name: 'Cumulative bonus', weight: '₹ 54,654' },
  { position: '65656644564555', name: 'Policy inception date', weight: '23/09/2012' },
  { position: '65656644564555', name: 'Duration remaining', weight: '65656644564555' },

];
export interface PeriodicElement1 {
  name: string;
  position: string;
  weight: string;

}

const ELEMENT_DATA1: PeriodicElement1[] = [
  { position: 'Rahul Jain', name: 'Name of policy holder', weight: 'Rahul Jain' },
  { position: 'Standard, Floater', name: 'Plan type', weight: 'Standard, Floater' },
  { position: '₹ 22,354', name: 'Rahul Jain', weight: 'floater' },
  { position: '₹ 22,354', name: 'Rahul Jain', weight: '65656644564555' },
  { position: '₹ 22,354', name: 'Rahul Jain', weight: '04/05/2019' },
  { position: '₹ 22,354', name: 'Rahul Jain', weight: '04/05/2019' },
  { position: '₹ 22,354', name: 'Rahul Jain', weight: '₹ 54,654' },


];
