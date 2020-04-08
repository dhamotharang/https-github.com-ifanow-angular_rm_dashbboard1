import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ValidatorType } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-holder-names',
  templateUrl: './add-holder-names.component.html',
  styleUrls: ['./add-holder-names.component.scss']
})
export class AddHolderNamesComponent implements OnInit {
  holderListResponse: any;

  constructor(private fb: FormBuilder) { }
  holderNamesForm;
  validatorType = ValidatorType;
  @Output() holderList = new EventEmitter;
  @Input() set holderListInput(data) {
    console.log(data);
    this.holderNamesForm = this.fb.group({
      holderNameList: new FormArray([])
    })
    if (data == undefined || data.length == 0) {
      data = {};
      this.addHolders(data);
      this.holderListResponse = data;
      return;
    }
    else {
      this.holderListResponse = data;
      data.forEach(element => {
        this.addHolders(element);
      })
    }
  }
  ngOnInit() {
  }
  get getHolderForm() { return this.holderNamesForm.controls };
  get holderNameList() { return this.getHolderForm.holderNameList as FormArray };
  addHolders(data) {
    if (this.holderNameList.length == 3) {
      return;
    }
    this.holderNameList.push(this.fb.group({
      name: [data.name, [Validators.required]],
      id: []
    }));
    this.holderList.emit(this.holderNameList);
  }
  removeHolders(index) {
    this.holderNamesForm.controls.holderNameList.removeAt(index)
  }
}