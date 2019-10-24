import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  constructor() {
  }

  displayedColumns = ['name', 'amt', 'value', 'abs', 'xirr', 'alloc'];
  dataSource = ELEMENT_DATA;
  // displayedColumns1 = ['data', 'amts'];
  datasource1 = ELEMENT_DATA1;
  displayedColumns2 = ['sname', 'amts', 'cvalue', 'profit', 'abs', 'xirr', 'pay', 'outs', 'unit', 'date', 'sip', 'icons'];
  datasource2 = ELEMENT_DATA2;
  displayedColumns3 = ['no', 'owner', 'type', 'value', 'pvalue', 'desc', 'status','icons'];
  datasource3 = ELEMENT_DATA3;

  displayedColumns4 = ['no', 'owner', 'type', 'cvalue', 'rate', 'amt','mdate','mvalue','number','desc','status','icons'];
  datasource4 = ELEMENT_DATA4;

  displayedColumns5 = ['no', 'owner', 'cvalue', 'rate', 'amt','mdate','number','desc','status','icons'];
  datasource5 = ELEMENT_DATA5;
  displayedColumns6 = ['no', 'owner', 'cvalue', 'camt', 'amt','cdate','rate','mvalue','tenure','type','desc','status','icons'];
  datasource6 = ELEMENT_DATA6;
  displayedColumns7 = ['no', 'owner', 'type', 'amt','rate','bal','account','bank','desc','status','icons'];
  datasource7 = ELEMENT_DATA7;
  displayedColumns8 = ['no', 'owner', 'cash','bal','desc','status','icons'];
  datasource8 = ELEMENT_DATA8;
  displayedColumns9 = ['no', 'owner', 'grams','car','price','mvalue','pvalue','desc','status','icons'];
  datasource9 = ELEMENT_DATA9;

  displayedColumns10 = ['no', 'owner','cvalue','emp','empc','rate','bal','bacla','year','desc','status','icons'];
  datasource10 = ELEMENT_DATA10;

  
    displayedColumns11 = ['no', 'owner','cvalue','emp','empc','rate','bal','bacla','year','desc','status','icons'];
  datasource11 = ELEMENT_DATA11;

  displayedColumns12 = ['no', 'owner','cvalue','total','account','rate','mdate','scheme','ppf','desc','status','icons'];
  datasource12 = ELEMENT_DATA12;

  displayedColumns13 = ['no', 'owner','name','number','year','amt','reason','desc','status','icons'];
  datasource13 = ELEMENT_DATA13;


  displayedColumns15 = ['no', 'owner','nvalue','date','amt','pay','desc','status','icons'];
  datasource15 = ELEMENT_DATA15;

  displayedColumns16 = ['no', 'owner','cvalue','rate','amt','number','mdate','desc','status','icons'];
  datasource16 = ELEMENT_DATA16;

  displayedColumns17 = ['no', 'owner','cvalue','rate','mvalue','mdate','number','desc','status','icons'];
datasource17 = ELEMENT_DATA17;
displayedColumns18 = ['no', 'owner','cvalue','rate','amt','number','mdate','desc','status','icons'];
datasource18 = ELEMENT_DATA18;

  viewMode;
  ngOnInit() {
    this.viewMode="tab1"
  }

  getPrefixData(type) {

  }
}

export interface PeriodicElement {
  name: string;
  amt: string;
  value: string;
  abs: number;
  xirr: number;
  alloc: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'Aditya Birla Sun Life Frontline Equity Fund-Growth	',
    amt: '2,28,580',
    value: '2,28,580',
    abs: 26.99,
    xirr: 8.32,
    alloc: 20.32
  },
  {name: 'ICICI Equity Fund Growth	', amt: '2,28,580', value: '2,28,580', abs: 26.99, xirr: 8.32, alloc: 20.32},
  {name: 'HDFC Top 200', amt: '2,28,580', value: '2,28,580', abs: 26.99, xirr: 8.32, alloc: 20.32},
  {
    name: 'Aditya Birla Sun Life Frontline Equity Fund-Growth',
    amt: '2,28,580',
    value: '2,28,580',
    abs: 26.99,
    xirr: 8.32,
    alloc: 20.32
  },
  {name: 'Total', amt: '2,28,580', value: '2,28,580', abs: 26.99, xirr: 8.32, alloc: 20.32},
];

export interface PeriodicElement2 {
  sname: string;
  amts: string;
  cvalue: string;
  profit: string;
  abs: string;
  xirr: string;
  pay: number;
  outs: string;
  unit: string;
  date: string;
  sip: string;
}

const ELEMENT_DATA2: PeriodicElement2[] = [

  {
    sname: 'DSP Tax Saver Fund - Regular Plan - Growth| 5287365/24| Forum Mitesh Galani',
    amts: '94,925',
    cvalue: '94,925',
    profit: '4,597',
    abs: '26.99',
    xirr: '8.32',
    pay: 0,
    outs: '23,550',
    unit: '23,550',
    date: '24.87 01/09/2019',
    sip: '12,000'
  },
  {
    sname: 'DSP Tax Saver Fund - Regular Plan - Growth| 5287365/24| Forum Mitesh Galani',
    amts: '94,925',
    cvalue: '94,925',
    profit: '4,597',
    abs: '26.99',
    xirr: '8.32',
    pay: 0,
    outs: '23,550',
    unit: '23,550',
    date: '24.87 01/09/2019',
    sip: '12,000'
  },
  {
    sname: 'DSP Tax Saver Fund - Regular Plan - Growth| 5287365/24| Forum Mitesh Galani',
    amts: '94,925',
    cvalue: '94,925',
    profit: '4,597',
    abs: '26.99',
    xirr: '8.32',
    pay: 0,
    outs: '23,550',
    unit: '23,550',
    date: '24.87 01/09/2019',
    sip: '12,000'
  },
  {
    sname: 'DSP Tax Saver Fund - Regular Plan - Growth| 5287365/24| Forum Mitesh Galani',
    amts: '94,925',
    cvalue: '94,925',
    profit: '4,597',
    abs: '26.99',
    xirr: '8.32',
    pay: 0,
    outs: '23,550',
    unit: '23,550',
    date: '24.87 01/09/2019',
    sip: '12,000'
  },
  {
    sname: 'DSP Tax Saver Fund - Regular Plan - Growth| 5287365/24| Forum Mitesh Galani',
    amts: '94,925',
    cvalue: '94,925',
    profit: '4,597',
    abs: '26.99',
    xirr: '8.32',
    pay: 0,
    outs: '23,550',
    unit: '23,550',
    date: '24.87 01/09/2019',
    sip: '12,000'
  },
  {
    sname: 'Total',
    amts: '111,94,925.22',
    cvalue: '111,94,925.22',
    profit: '111,94,925.22',
    abs: '875.32',
    xirr: '8.32',
    pay: 0,
    outs: '0',
    unit: '111,94,925.22',
    date: '',
    sip: '12,000'
  },


];

export interface PeriodicElement1 {
  data: string;
  amts: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
  {data: 'a. Investment', amts: '15,70,000'},
  {data: 'b. Switch In', amts: '2,28,580'},
  {data: 'c. Switch Out', amts: '2,28,580'},
  {data: 'd. Redemption', amts: '0'},
  {data: 'e. Dividend Payout', amts: '0'},
  {data: 'f. Net Investment (a+b-c-d-e)', amts: '2,28,580'},
  {data: 'g. Market Value', amts: '2,28,580'},
  {data: 'h. Net Gain (g-f)', amts: '2,28,580'},
  {data: 'i. Realized XIRR (All Transactions)', amts: '2.81 %'},

];
export interface PeriodicElement3 {
  no: string;
  owner: string;
  type:string;
  value:string;
  pvalue:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA3: PeriodicElement3[] = [
  {no: '1.', owner: 'Rahul Jain',type:'Type',value:'60,000',pvalue:'60,000',desc:'ICICI FD',status:'ICICI FD'},
  {no: '1.', owner: 'Rahul Jain',type:'Type',value:'60,000',pvalue:'60,000',desc:'ICICI FD',status:'ICICI FD'},
  {no: ' ', owner: 'Total',type:'',value:'1,28,925',pvalue:'1,28,925',desc:'',status:' '},
 

];
export interface PeriodicElement4 {
  no: string;
  owner: string;
  type:string;
 
  cdate:string;
  rate:string;
  amt:string;
  mdate:string;
  mvalue:string;
  number:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA4: PeriodicElement4[] = [
  {no: '1.', owner: 'Ronak Hasmukh Hindocha',type:'Bank FD',
  cdate:'60,000',rate:'8.40%',amt:'1,00,000',mdate:"18/09/2019",mvalue:"1,00,000",
  number:"980787870909",desc:"ICICI FD",status:"LIVE"},
  {no: '2.', owner: 'Rupa Ronak Hindocha',type:'Bank FD',
  cdate:'60,000',rate:'8.40%',amt:'1,00,000',mdate:"18/09/2019",mvalue:"1,00,000",
  number:"980787870909",desc:"ICICI FD",status:"LIVE"},
  {no: '3.', owner: 'Ronak Hasmukh Hindocha',type:'Bank FD',
  cdate:'60,000',rate:'8.40%',amt:'1,00,000',mdate:"18/09/2019",mvalue:"1,00,000",
  number:"980787870909",desc:"ICICI FD",status:"LIVE"},
  {no: '', owner: 'Total',type:'',
  cdate:'1,28,925',rate:'8.40%',amt:'1,50,000',mdate:"",mvalue:"1,50,000",
  number:"",desc:"",status:""},
 

];
export interface PeriodicElement5 {
  no: string;
  owner: string;
  cvalue:string;
  rate:string;
  amt:string;
  mdate:string;
  number:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA5: PeriodicElement5[] = [
  {no: '1.', owner: 'Ronak Hasmukh Hindocha',
  cvalue:'60,000',rate:'8.40%',amt:'1,00,000',mdate:"18/09/2019",
  number:"980787870909",desc:"ICICI FD",status:"LIVE"},
  {no: '2.', owner: 'Rupa Ronak Hindocha',
  cvalue:'60,000',rate:'8.40%',amt:'1,00,000',mdate:"18/09/2019",
  number:"980787870909",desc:"ICICI FD",status:"LIVE"},
  {no: '3.', owner: 'Ronak Hasmukh Hindocha',
  cvalue:'60,000',rate:'8.40%',amt:'1,00,000',mdate:"18/09/2019",
  number:"980787870909",desc:"ICICI FD",status:"LIVE"},
  {no: '', owner: 'Total',
  cvalue:'1,28,925',rate:'8.40%',amt:'1,50,000',mdate:"",
  number:"",desc:"",status:""},
 

];
export interface PeriodicElement6 {
  no: string;
  owner: string;
  cvalue:string;
  camt:string;
  amt:string;
  cdate:string;
  rate:string;
  mvalue:string;
  tenure:string;
  type:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA6: PeriodicElement6[] = [
  {no: '1.', owner: 'Ronak Hasmukh Hindocha',
  cvalue:'60,000',camt:"1,00,000",amt:'1,00,000',cdate:"18/09/2019",rate:'8.40%',mvalue:"18/09/2019",tenure:"12",type:"Tax free",
 desc:"ICICI FD",status:"LIVE"},
 {no: '2.', owner: 'Rupa Ronak Hindocha',
 cvalue:'60,000',camt:"1,00,000",amt:'1,00,000',cdate:"18/09/2019",rate:'8.40%',mvalue:"18/09/2019",tenure:"12",type:"Tax free",
desc:"ICICI FD",status:"LIVE"},
  {no: '', owner: 'Total',
  cvalue:'1,28,925',camt:"1,50,000",amt:'1,50,000',cdate:"",rate:'',mvalue:"",tenure:"",type:"",
  desc:"",status:""},
 

];
export interface PeriodicElement7 {
  no: string;
  owner: string;
  type:string;
  amt:string;
  rate:string;
  bal:string;
  account:string;
  bank:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA7: PeriodicElement7[] = [
  {no: '1.', owner: 'Rahul Jain',
  type:'Savings',amt:"08/02/2019",rate:'8.40%',bal:"1,00,000",account:"980787870909",bank:"ICICI",
 desc:"ICICI FD",status:"MATURED"},
 {no: '2.', owner: 'Shilpa Jain',
 type:'Current',amt:"08/02/2019",rate:'8.60%',bal:"50,000",account:"77676767622",bank:"Axis",
  desc:"Axis bank FD",status:"LIVE"},
  {no: '', owner: 'Total',
  type:'',amt:"",rate:'',bal:"1,50,000",account:"",bank:"",
  desc:"",status:""},
 

];
export interface PeriodicElement8 {
  no: string;
  owner: string;
  cash:string;
  bal:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA8: PeriodicElement8[] = [
  {no: '1.', owner: 'Rahul Jain'
 ,cash:"94,925",bal:"09/02/2019",
 desc:"ICICI FD",status:"MATURED"},
 {no: '2.', owner: 'Shilpa Jain'
 ,cash:"94,925",bal:"09/02/2019",
 desc:"Axis bank FD",status:"LIVE"},
 {no: '', owner: 'Total'
 ,cash:"1,28,925",bal:"",
 desc:"",status:""},
 

];

export interface PeriodicElement9 {
  no: string;
  owner: string;
  grams:string;
  car:string;
  price:string;
  mvalue:string;
  pvalue:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA9: PeriodicElement9[] = [
  {no: '1.', owner: 'Rahul Jain'
 ,grams:"50 tolas",car:"24",price:"32,000(as on 20/08/2019)",
 mvalue:"60,000",pvalue:"60,000",desc:"ICICI FD",status:"MATURED"},
 {no: '2.', owner: 'Rahul Jain'
 ,grams:"25 tolas",car:"24",price:"32,000(as on 20/08/2019)",
 mvalue:"60,000",pvalue:"60,000",desc:"ICICI FD",status:"LIVE"},
 {no: '', owner: 'Total'
 ,grams:"",car:"",price:"",
 mvalue:"1,28,925",pvalue:"1,20,000",desc:"",status:""},

];
export interface PeriodicElement10 {
  no: string;
  owner: string;
  type:string;
  mvalue:string;
  pvalue:string;
  pur:string;
  rate:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA10: PeriodicElement10[] = [

  {no: '1.', owner: 'Rahul Jain'
  ,type:"Cumulative", mvalue:"60,000",pvalue:"1,00,000",pur:"18/09/2021",rate:"8.40%",desc:"ICICI FD",status:"MATURED"},
  
  {no: '2.', owner: 'Shilpa Jain'
  ,type:"Cumulative", mvalue:"60,000",pvalue:"1,00,000",pur:"18/09/2021",rate:"8.40%",desc:"ICICI FD",status:"LIVE"},
  {no: '', owner: 'Total'
  ,type:"", mvalue:"1,20,000",pvalue:"1,50,000",pur:"",rate:"",desc:"",status:""},

];

export interface PeriodicElement11 {
  no: string;
  owner: string;
  cvalue:string;
  emp:string;
  empc:string;
  rate:string;
  bal:string;
  bacla:string;
  year:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA11: PeriodicElement11[] = [

  {no: '1.', owner: 'Rahul Jain'
  ,cvalue:"94,925", emp:"94,925",empc:"94,925",rate:"8.40%",bal:"60,000",bacla:"18/09/2021",year:"2021",desc:"ICICI FD",status:"MATURED"},
  {no: '2.', owner: 'Shilpa Jain'
  ,cvalue:"94,925", emp:"94,925",empc:"94,925",rate:"8.40%",bal:"60,000",bacla:"18/09/2021",year:"2021",desc:"ICICI FD",status:"LIVE"},
  {no: '', owner: 'Total'
  ,cvalue:"1,28,925", emp:"1,28,925",empc:"1,28,925",rate:"",bal:"1,20,000",bacla:"",year:"",desc:"",status:""},
];




export interface PeriodicElement12 {
  no: string;
  owner: string;
  cvalue:string;
  total:string;
  account:string;
  rate:string;
  mdate:string;
  scheme:string;
  ppf:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA12: PeriodicElement12[] = [

  {no: '1.', owner: 'Rahul Jain'
  ,cvalue:"94,925", total:"94,925",account:"94,925",rate:"8.40%",mdate:"18/09/2021",scheme:"Cumulative",ppf:"980787870909",desc:"ICICI FD",status:"MATURED"},
  {no: '2.', owner: 'Shilpa Jain'
  ,cvalue:"94,925", total:"94,925",account:"94,925",rate:"8.40%",mdate:"18/09/2021",scheme:"Cumulative",ppf:"980787870909",desc:"ICICI FD",status:"LIVE"},
  {no: '', owner: 'Total'
  ,cvalue:"94,925", total:"1,28,925",account:"1,28,925",rate:"",mdate:"",scheme:"",ppf:"",desc:"",status:""},
 
];


export interface PeriodicElement13 {
  no: string;
  owner: string;
  name:string;
  number:string;
  year:string;
  amt:string;
  reason:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA13: PeriodicElement13[] = [

  {no: '1.', owner: 'Rahul Jain'
  ,name:"Futurewise Technologies", number:"5",year:"5",amt:"1,00,000",reason:"Worked for more than 10 years",desc:"ICICI FD",status:"MATURED"},
  {no: '2.', owner: 'Shilpa Jain'
  ,name:"Futurewise Technologies", number:"5",year:"5",amt:"1,00,000",reason:"Worked for more than 10 years",desc:"Axis bank FD",status:"LIVE"},
  {no: '', owner: 'Total'
  ,name:"", number:"",year:"",amt:"1,50,000",reason:"",desc:"",status:""},
];

export interface PeriodicElement15 {
  no: string;
  owner: string;
  nvalue:string;
  date:string;
  amt:string;
  pay:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA15: PeriodicElement15[] = [

  {no: '1.', owner: 'Rahul Jain'
  ,nvalue:"94,925", date:"12/11/2022",amt:"60,000",pay:"Monthly",desc:"ICICI FD",status:"MATURED"},
  {no: '2.', owner: 'Rahul Jain'
  ,nvalue:"94,925", date:"12/11/2022",amt:"60,000",pay:"Monthly",desc:"ICICI FD",status:"MATURED"},
  {no: '', owner: 'Total'
  ,nvalue:"1,50,000", date:"",amt:"1,50,000",pay:"",desc:"",status:""},
];

export interface PeriodicElement16 {
  no: string;
  owner: string;
  cvalue:string;
  rate:string;
  amt:string;
  number:string;
  mdate:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA16: PeriodicElement16[] = [

  {no: '1.', owner: 'Rahul Jain'
  ,cvalue:"94,925", rate:"8.40%",amt:"60,000",number:"76635874357424",mdate:"18/09/2021",desc:"ICICI FD",status:"MATURED"},
  {no: '2.', owner: 'Rahul Jain'
  ,cvalue:"94,925", rate:"8.40%",amt:"60,000",number:"76635874357424",mdate:"18/09/2021",desc:"ICICI FD",status:"MATURED"},
  {no: '', owner: 'Total'
  ,cvalue:"1,28,925", rate:"",amt:"1,20,000",number:"",mdate:"",desc:"",status:""},
];



export interface PeriodicElement17 {
  no: string;
  owner: string;
  cvalue:string;
  rate:string;
  mvalue:string;
  mdate:string;
  number:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA17: PeriodicElement17[] = [

  {no: '1.', owner: 'Rahul Jain'
  ,cvalue:"94,925", rate:"8.40%",mvalue:"60,000",mdate:"18/09/2021",number:"76635874357424",desc:"ICICI FD",status:"MATURED"},
  {no: '2.', owner: 'Rahul Jain'
  ,cvalue:"94,925", rate:"8.40%",mvalue:"60,000",mdate:"18/09/2021",number:"76635874357424",desc:"ICICI FD",status:"LIVE"},
  {no: '', owner: 'Total'
  ,cvalue:"1,28,925", rate:"",mvalue:"1,28,925",mdate:"",number:"",desc:"",status:""},
];

export interface PeriodicElement18 {
  no: string;
  owner: string;
  cvalue:string;
  rate:string;
  amt:string;
  number:string;
  mdate:string;
  desc:string;
  status:string;
}

const ELEMENT_DATA18: PeriodicElement18[] = [

  {no: '1.', owner: 'Rahul Jain'
  ,cvalue:"94,925", rate:"8.40%",amt:"60,000",mdate:"18/09/2021",number:"76635874357424",desc:"ICICI FD",status:"MATURED"},
  {no: '2.', owner: 'Shilpa Jain'
  ,cvalue:"94,925", rate:"8.40%",amt:"60,000",mdate:"18/09/2021",number:"76635874357424",desc:"ICICI FD",status:"LIVE"},
  {no: '', owner: 'Total'
  ,cvalue:"1,28,925", rate:"",amt:"1,20,000",mdate:"",number:"",desc:"",status:""},
];