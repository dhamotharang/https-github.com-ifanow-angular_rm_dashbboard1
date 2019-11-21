import {Component, OnInit, Input} from '@angular/core';
import {SubscriptionInject} from '../../../subscription-inject.service';
import {EventService} from 'src/app/Data-service/event.service';


import {ConfirmDialogComponent} from 'src/app/component/protect-component/common-component/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {SubscriptionPopupComponent} from '../subscription-popup/subscription-popup.component';
import {SubscriptionService} from '../../../subscription.service';
import {ConsentTandCComponent} from '../consent-tand-c/consent-tand-c.component';
import {UtilService} from '../../../../../../../services/util.service';
import {AuthService} from '../../../../../../../auth-service/authService';

export interface PeriodicElement {
  document: string;
  plan: string;
  date: string;
  sdate: string;
  cdate: string;
  status: string;
}


@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit {
  noData: string;

  constructor(public subInjectService: SubscriptionInject, private eventService: EventService, public dialog: MatDialog,
              private subAService: SubscriptionService) {
    this.subInjectService.closeRightSlider.subscribe(
      data => this.getQuotationDesignData(data)
    );
  }

  quotationDesignEmail;
  quotationDesign;
  dataCount;
  _clientData;
  displayedColumns: string[] = ['checkbox', 'document', 'plan', 'date', 'sdate', 'cdate', 'status', 'send', 'icons'];
  dataSource=[];
  changeEmail = 'footerChange';
  advisorId;

  @Input()
  set clientData(clientData) {
    this._clientData = clientData;
    this.getQuotationsList();
  }

  get clientData() {
    return this._clientData;
  }

  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.quotationDesign = 'true';
    console.log('quotation');
    // this.getQuotationsList();
    this.dataCount = 0;
  }

  Open(value, state, data) {
    const fragmentData = {
      Flag: value,
      data,
      id: 1,
      state
    };
    const rightSideDataSub = this.subInjectService.changeUpperRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ',);
          rightSideDataSub.unsubscribe();
        }
      }
    );

  }

  getQuotationsList() {
    const obj = {
      // clientId: 2970
      clientId: this._clientData.id
    };
    this.subAService.getSubscriptionClientsQuotations(obj).subscribe(
      data => this.getQuotationsListResponse(data)
    );
  }

  selectedInvoice() {
    this.dataCount = 0;
    this.dataSource.forEach(item => {
      console.log('item item ', item);
      if (item.selected) {
        this.dataCount++;
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    return this.dataCount === this.dataSource.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selectAll({checked: false}) : this.selectAll({checked: true});
  }

  getQuotationsListResponse(data) {
    if (data == undefined) {
      this.noData = 'No Data Found';
    } else {
      data.forEach(singleData => {
        singleData.isChecked = false;
      });
      this.dataSource = data;
    }
  }

  openQuotationsESign(value, state) {
    this.subInjectService.rightSliderData(state);
    this.eventService.sliderData(value);
  }

  openRightSlider() {

  }

  getQuotationDesignData(data) {
    this.quotationDesign = data;
  }

  changeDisplay(value) {
    this.quotationDesign = value;
    this.quotationDesignEmail = this.quotationDesign;
  }

  deleteModal(value) {
    const dialogData = {
      data: value,
      header: 'DELETE',
      body: 'Are you sure you want to delete the document GD?',
      body2: 'This cannot be undone',
      btnYes: 'CANCEL',
      btnNo: 'DELETE',
      positiveMethod: () => {
        console.log('11111111111111111111111111111111111111111111');
      },
      negativeMethod: () => {
        console.log('2222222222222222222222222222222222222');
      }
    };
    console.log(dialogData + '11111111111111');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
      autoFocus: false,


    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  openSendEmail() {
    const data = {
      advisorId: this.advisorId,
      clientData: this._clientData,
      templateType: 2, // 2 is for quotation
      documentList: []
    };
    this.dataSource.forEach(singleElement => {
      if (singleElement.selected) {
        data.documentList.push(singleElement);
      }
    });
    this.open(data, 'emailOnly');
  }

  open(data, value) {

    // this.eventService.sliderData(value);
    // this.subInjectService.rightSliderData(state);
    // this.subInjectService.addSingleProfile(data);

    const fragmentData = {
      Flag: value,
      data,
      id: 1,
      state: 'open'
    };
    const rightSideDataSub = this.subInjectService.changeUpperRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ',);
          rightSideDataSub.unsubscribe();
        }
      }
    );
  }

  openPopup(data) {
    const Fragmentdata = {
      Flag: data,
    };
    const dialogRef = this.dialog.open(SubscriptionPopupComponent, {
      width: '70%',
      data: Fragmentdata,
      autoFocus: false,

    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  OpenConsent(data) {
    const Fragmentdata = {
      Flag: data,
    };
    const dialogRef = this.dialog.open(ConsentTandCComponent, {
      width: '50%',
      height: '100%',
      data: Fragmentdata,
      autoFocus: false,

    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  closeDiv() {
    this.quotationDesign = 'true';
  }

  display(data) {
    console.log(data);
    this.ngOnInit();
  }

  viewQuotation(value, data) {
    // this.quotationDesign = value;
    // console.log(data);
    // this.subInjectService.addSingleProfile(data);
    const fragmentData = {
      Flag: value,
      data,
      id: 1,
      state: 'open'
    };
    const rightSideDataSub = this.subInjectService.changeUpperRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ',);
          rightSideDataSub.unsubscribe();
        }
      }
    );
  }

  selectAll(event) {
    // const checked = event.target.checked;
    // this.dataSource.forEach(item => item.selected = 'checked');

    this.dataCount = 0;
    if (this.dataSource) {
      this.dataSource.forEach(item => {
        item.selected = event.checked;
        if (item.selected) {
          this.dataCount++;
        }
      });
    }
  }

}
