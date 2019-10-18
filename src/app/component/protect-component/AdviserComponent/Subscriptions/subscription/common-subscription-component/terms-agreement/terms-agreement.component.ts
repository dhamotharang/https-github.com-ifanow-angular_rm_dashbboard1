import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {SubscriptionInject} from '../../../subscription-inject.service';
import {HowToUseDialogComponent} from '../how-to-use-dialog/how-to-use-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-terms-agreement',
  templateUrl: './terms-agreement.component.html',
  styleUrls: ['./terms-agreement.component.scss']
})
export class TermsAgreementComponent implements OnInit {

  constructor(public subInjectService: SubscriptionInject, public dialog: MatDialog) {
  }

  @Input() quotationDesignE;
  @Output() valueChange = new EventEmitter();
  mailForm = new FormGroup({
    mail_body: new FormControl(''),

  });
  // private froalaEditorContent = 'This is Intial Data';
  // public froalaEditorOptions = {
  //   placeholder: 'Edit Me',
  //   charCounterCount: false,
  //
  //   events: {
  //     focus(e, editor) {
  //       console.log('froalaEditorContent: ', this.froalaEditorContent);
  //       console.log('editor: ', editor);
  //
  //       console.log('e: ', e);
  //
  //       console.log(editor.selection.get());
  //     }
  //   }
  // };

  ngOnInit() {
    console.log('quotationDesign', this.quotationDesignE);
  }

  Close(value) {
    this.subInjectService.rightSideData(value);
    this.valueChange.emit(this.quotationDesignE);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.mailForm.value);
  }

  openDialog(data) {
    const Fragmentdata = {
      Flag: data,
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
