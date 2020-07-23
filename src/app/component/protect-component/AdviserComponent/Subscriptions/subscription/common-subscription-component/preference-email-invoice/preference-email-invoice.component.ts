import {Component, OnInit, Renderer2} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EventService} from '../../../../../../../Data-service/event.service';
import {FormControl, FormGroup} from '@angular/forms';
import {SubscriptionService} from '../../../subscription.service';
import {HowToUseDialogComponent} from '../how-to-use-dialog/how-to-use-dialog.component';
import {AuthService} from "../../../../../../../auth-service/authService";

@Component({
  selector: 'app-preference-email-invoice',
  templateUrl: './preference-email-invoice.component.html',
  styleUrls: ['./preference-email-invoice.component.scss']
})
export class PreferenceEmailInvoiceComponent implements OnInit {
  model: any;
  storeData: any;
  logoText = '';
  advisorId;

  mailForm = new FormGroup({
    mail_body: new FormControl(''),

  });
  heading: string;
  fragmentData: any;

  constructor(private eventService: EventService, public authService: AuthService,
              public subService: SubscriptionService, public dialog: MatDialog, private render: Renderer2) {

  }

  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
  }

  get data() {
    return this.fragmentData;
  }

  set data(data) {
    this.fragmentData = {data};
    this.heading = (this.fragmentData.data.id == 1) ? 'Invoice' : (this.fragmentData.data.id == 2) ? 'Quotations' : (this.fragmentData.data.id == 3) ? ' Documents with esign request' : ' Documents without eSign request';
    this.storeData = this.fragmentData.data;
  }

  copyName(value) {
    const tag = this.render.createElement('input');
    tag.value = value;
    document.body.appendChild(tag);
    tag.focus();
    tag.select();
    document.execCommand('copy');
    document.body.removeChild(tag);
    this.eventService.openSnackBar('Text copied', 'Dismiss');
  }

  // Begin ControlValueAccesor methods.
  onChange = (_) => {
  }
  onTouched = () => {
  }

  // Form model content changed.
  writeValue(content: any): void {
    this.model = content;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // dialogClose() {
  //   this.dialogRef.close();
  // }
  dialogClose() {
    this.eventService.changeUpperSliderState({state: 'close'});
    // this.dialogRef.close();
  }


  saveData(data) {
    // this.storeData.documentText=data;
  }

  save() {
    this.updateData(this.storeData);
    this.dialogClose();
  }

  updateData(data) {
    const obj = {
      subject: data.subject,
      body: data.body,
      advisorId: this.advisorId,

      // "advisorId":2727,
      emailTemplateId: this.storeData.emailTemplateTypeId
    };
    this.subService.updateEmailTemplate(obj).subscribe(
      data => this.getResponseData(data)
    );
  }

  getResponseData(data) {
  }

  openDialog(data) {
    const Fragmentdata = {
      flag: data,
    };
    const dialogRef = this.dialog.open(HowToUseDialogComponent, {
      width: '30%',
      data: Fragmentdata,
      autoFocus: false,

    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
}