import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {EventService} from '../../Data-service/event.service';
import {SubscriptionInject} from '../../component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import {CreateSubscriptionComponent} from '../../component/protect-component/AdviserComponent/Subscriptions/subscription/common-subscription-component/create-subscription/create-subscription.component';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
  animations: [trigger('upperSliderOpenClose', [
    state('open', style({
      top: '0%'
    })),
    state('close', style({
      // width:'0%'
      top: '-100%'
    })),

    transition('close => open', [animate('0.3s')]),
    transition('open => close', [animate('0.1s')]),
    transition('close => openHelp', [animate('0.3s')]),
    transition('openHelp => close', [animate('0.1s')])
  ])]
})
//
export class DialogContainerComponent implements OnInit {
  @Input() parentComponentName;
  invoiceHisData: any;
  inputData;
  fragmentData;
  selectedSubscriptionTab: any;

  isOverlayVisible;
  currentState;
  subscriptionTab;
  dialogState;

  upperSliderData;
  headerData = 'EMAIL QUOTATION';
  headerDataDocuments = 'EMAIL DOCS WITH E-SIGN REQUEST';

  constructor(private eventService: EventService, private subinject: SubscriptionInject) {
    this.eventService.overlayVisibleData.subscribe(
      data => {
        this.isOverlayVisible = data;
      }
    );
    this.subinject.rightSideBarData.subscribe(
      data => this.getRightSliderData(data)
    );
    this.eventService.sidebarSubscribeData.subscribe(
      data => this.getFileResponseDataAum(data)
    );

    this.eventService.tabChangeData.subscribe(
      data => this.getSubscriptionTabChangeData(data)
    );
    this.eventService.upperSliderDataObs.subscribe(
      data => {
        this.upperSliderData = data;
        // this.fragmentData = data;
      }
    );
    this.subinject.newRightSliderDataObs.subscribe((data) => {
      this.fragmentData = data;
      console.log('fragmentData dialog container: ', this.fragmentData);
      this.getFileResponseDataAum(this.fragmentData.Flag);
      this.inputData = this.fragmentData.data;
      this.getRightSliderData(this.fragmentData.state);

      // this

    });
    // this.subinject.singleProfileData.subscribe(
    //   data =>this.getInvoiceHistoryData(data)
    // );
    // this.eventService.changeUpperSliderState()
  }


  ngOnInit() {
  }

  getInvoiceHistoryData(data) {
    this.invoiceHisData = data;
  }

  getRightSliderData(value) {
    this.currentState = value;
  }

  getFileResponseDataAum(data) {
    this.subscriptionTab = data;
    // this.subscriptionTab = CreateSubscriptionComponent;
  }

  getSubscriptionTabChangeData(data) {
    this.selectedSubscriptionTab = data;
  }
}
