import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SubscriptionComponent } from '../subscription.component';
export interface PeriodicElement {
  client:string;
  service:string;
  amt: string;
  sub: string;
  status:string;
  activation: string;
  lastbilling: string;
  nextbilling: string;
  feemode:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {client: 'Abhishek Mane',service: 'Financial Planning',amt: 'Rs.1,00,000/Q', sub: 'SUB-0001', status: 'LIVE', activation: '25/08/2019', lastbilling: '25/08/2019', nextbilling: '25/08/2019',feemode:'Cheque'},
  {client: 'Ronak Hasmuk Hindocha',service: 'Investment management - AUM Linked fee',amt: 'View details', sub: '-', status: 'FUTURE', activation: '15/09/2019', lastbilling: '-', nextbilling: '15/09/2019',feemode:'Auto debit'},
  {client: 'Aman jain',service: 'Investment management - AUM Linked fee',amt: 'View details', sub: '-', status: 'NOT STARTED', activation: '-', lastbilling: '-', nextbilling: '-',feemode:'NEFT/RTGS'},
];
@Component({
  selector: 'app-subscriptions-subscription',
  templateUrl: './subscriptions-subscription.component.html',
  styleUrls: ['./subscriptions-subscription.component.scss']
})
export class SubscriptionsSubscriptionComponent implements OnInit {
 
  constructor(private sub:SubscriptionComponent) {
  }

  ngOnInit() {
  }
  displayedColumns: string[] = ['client','service','amt','sub','status','activation', 'lastbilling', 'nextbilling','feemode','icons'];
  dataSource = ELEMENT_DATA;

  rightbar()
  {
   this.sub.leftBar();
  }
  rightbarFees(value)
  {
    this.sub.subscriptionTab=value;
    this.sub.leftBar();
  }
}
