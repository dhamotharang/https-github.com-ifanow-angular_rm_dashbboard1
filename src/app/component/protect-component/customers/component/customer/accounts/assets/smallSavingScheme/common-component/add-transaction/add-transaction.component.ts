import { Component, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  addTransactionList: any;
  transactionForm: any;
  @Output() outputEvent=new EventEmitter();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.transactionForm = this.fb.group({
      transactionFormList: new FormArray([])
    })
    this.addTransactionList = 0;
  }
  get getTransForm() { return this.transactionForm.controls; }
  get getTransFormList() { return this.getTransForm.transactionFormList as FormArray; }
  addTransaction() {
    this.getTransFormList.push(this.fb.group({
      transactionType: [, [Validators.required]],
      date: [, [Validators.required]],
      amount: [, [Validators.required]]
    }))
    this.outputEvent.emit(this.getTransFormList)
    this.addTransactionList = this.getTransFormList.controls.length
  }
  removeTransaction(index) {
    this.transactionForm.controls.transactionFormList.removeAt(index)
    this.addTransactionList = this.getTransFormList.controls.length
  }
}
