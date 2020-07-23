import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  tabs = ['Primary', 'Social', 'Promotions', 'Forums'];
  selected = new FormControl(0);
}