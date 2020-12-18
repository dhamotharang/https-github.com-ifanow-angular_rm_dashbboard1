import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-mis-mf-transactions',
  templateUrl: './mis-mf-transactions.component.html',
  styleUrls: ['./mis-mf-transactions.component.scss']
})
export class MisMfTransactionsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'mfOverview', 'scheme', 'folio', 'tType', 'tDate'];
  data: Array<any> = [{}, {}, {}];
  mfTransaction = new MatTableDataSource(this.data);
  isLoading: boolean;
  constructor() { }

  ngOnInit() {
    this.mfTransaction.data = ELEMENT_DATA;
    this.isLoading = false
    // this.mfTransaction.data = [{}, {}, {}];
  }

}
export interface PeriodicElement {
  name: string;
  mfOverview: string;
  scheme: string;
  folio: number;
  tType: string;
  tDate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Rahul Jain', mfOverview: 'Mutual Funds', scheme: 'HDFC Equity fund - Regular plan - Growth option | 098098883', folio: 2345772, tType: 'STP 5,000', tDate: '05/09/2019' },
];