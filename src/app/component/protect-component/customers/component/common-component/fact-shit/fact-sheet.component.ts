import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import Highcharts, { ColorString } from 'highcharts';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth-service/authService';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { OnlineTransactionComponent } from 'src/app/component/protect-component/AdviserComponent/transactions/overview-transactions/doTransaction/online-transaction/online-transaction.component';
import { EventService } from 'src/app/Data-service/event.service';
import { UtilService, ValidatorType } from 'src/app/services/util.service';
import { MfServiceService } from '../../customer/accounts/assets/mutual-fund/mf-service.service';
import { CustomerService } from '../../customer/customer.service';
require('highcharts/modules/solid-gauge')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);

@Component({
  selector: 'app-fact-shit',
  templateUrl: './fact-sheet.component.html',
  styleUrls: ['./fact-sheet.component.scss']
})
export class FactSheetComponent implements OnInit {
  displayedColumns = ['name', 'sector', 'ins', 'all', 'progress', 'assets'];
  isLoading = false;
  dataSource = new MatTableDataSource();
  portfolioGraph: Chart;
  portfolioGraph1: Chart;
  portfolioGraph2: Chart;
  portfolioGraph3: Chart;
  portfolioGraph4: Chart;
  portfolioGraph5: Chart;
  validatorType = ValidatorType;
  amount = new FormControl();
  graphList: any[];
  advisorId: any;
  clientId: any;
  asOnDate: number;
  nightyDayData: { value: number; flag: boolean; };
  oneDay: { value: number; flag: boolean; };
  @Input() data;
  schemeChart: Chart;
  ngOnInitLoad = true;
  isLoadingSchemeDetails = true;
  relativePerLoading = true;
  speedLoading = true;
  speedChartVar: Chart;
  performaceGraph: Chart;
  currentValue: any;
  xirrValue: any;
  profitOrLossValue: any;
  investorName: any;
  folioNumber: any;
  nav: any;
  riskometerStatus: any;
  speedData: any;
  selectedItem = new FormControl();
  disable3m = true;
  disable6m = true;
  disable1y = true;
  disable3y = true;
  disable5y = true;
  disableall = true;
  demo1TabIndex = 0;
  schemeDetails: any;
  isAdvisorSection: boolean;
  navReturn: any;
  schemeReturnName: any;
  schemeReturnValue: any;
  savingAccount: any;
  fixedDeposite: any;
  scheme: any;
  json: any[];
  xirr: any;
  constructor(private subInjectService: SubscriptionInject, private router: Router, private cusService: CustomerService, private mfService: MfServiceService, private eventService: EventService) {
  }

  ngOnInit() {
    this.selectedItem.setValue('3');
    this.amount.setValue(500000);
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId() !== undefined ? AuthService.getClientId() : -1;
    this.asOnDate = new Date().getTime();
    this.currentValue = this.data.currentValue;
    this.xirrValue = this.data.xirr;
    this.profitOrLossValue = this.data.unrealizedGain;
    this.investorName = this.data.ownerName;
    this.folioNumber = this.data.folioNumber;
    this.nav = this.data.nav;
    //this.getHistoricalAndNav();
    //this.getXirr();
    this.getInvRet();
    this.getRatio();
    this.getDetails();
    this.getAllocationData();
    this.getSpeedometer();
    this.relativePerformanceGraph();
  }
  getRatio() {
    this.relativePerLoading = true;
    const data = {
      schemeCode: this.data.accordSchemeCode,
      subCategoryId: this.data.subCategoryId,
    };
    this.cusService.getFactRatio(data)
      .subscribe(res => {
        this.relativePerLoading = false;
        if (res) {
          console.log('speedometer', res);
          this.schemePerformance();
        } else {
        }
      }, err => {
        this.relativePerLoading = false;
        this.eventService.openSnackBar('err', 'DISMISS');
      });
  }
  ConvertStringToNumber(input) {
    input = input.replace(',', '')
    var numeric = Number(input);
    return numeric;
  }
  getXirr() {
    let timePeriod = (this.selectedItem.value == '1' || this.selectedItem.value == '4') ? '3' : (this.selectedItem.value == '2') ? '6' : (this.selectedItem.value == '3') ? '1' : (this.selectedItem.value == '5') ? '5' : '0';
    let type = (this.selectedItem.value == '1' || this.selectedItem.value == '2') ? 'MONTH' : (this.selectedItem.value == '3' || this.selectedItem.value == '4' || this.selectedItem.value == '5') ? 'YEAR' : '0';
    const catObj = {};
    let array = [];
    const clone = Object.assign({}, this.data);
    clone.absoluteReturn = this.ConvertStringToNumber(clone.absoluteReturn)
    clone.amountInvested = this.ConvertStringToNumber(clone.amountInvested)
    clone.balanceUnit = this.ConvertStringToNumber(clone.balanceUnit)
    clone.currentValue = this.ConvertStringToNumber(clone.currentValue)
    clone.dividendPayout = this.ConvertStringToNumber(clone.dividendPayout)
    clone.nav = this.ConvertStringToNumber(clone.nav)
    clone.sipAmount = this.ConvertStringToNumber(clone.sipAmount)
    clone.switchOut = this.ConvertStringToNumber(clone.switchOut)
    clone.totalAbsoluteReturn = this.ConvertStringToNumber(clone.totalAbsoluteReturn)
    clone.totalAmountInvested = this.ConvertStringToNumber(clone.totalAmountInvested)
    clone.totalBalanceUnit = this.ConvertStringToNumber(clone.totalBalanceUnit)
    clone.totalCurrentValue = this.ConvertStringToNumber(clone.totalCurrentValue)
    clone.xirr = this.ConvertStringToNumber(clone.xirr)
    clone.totalDividendPayout = this.ConvertStringToNumber(clone.totalDividendPayout)
    clone.totalSipAmount = this.ConvertStringToNumber(clone.totalSipAmount)
    clone.totalSwitchOut = this.ConvertStringToNumber(clone.totalSwitchOut)
    clone.totalUnrealizedGain = this.ConvertStringToNumber(clone.totalUnrealizedGain)
    clone.totalXirr = this.ConvertStringToNumber(clone.totalXirr)
    clone.unrealizedGain = this.ConvertStringToNumber(clone.unrealizedGain)
    clone.withdrawalsTillToday = this.ConvertStringToNumber(clone.withdrawalsTillToday)
    clone.navDate = new Date(clone.navDate);
    clone.mutualFundTransactions.forEach(element => {
      element.transactionDate = new Date(element.transactionDate)
    });
    delete clone.family_member_list;
    clone.navDate = new Date(clone.navDate);
    clone.investedDate = new Date(clone.investedDate);
    array.push(clone);
    catObj[this.data.schemeCode] = array;
    const obj = {
      advisorId: this.advisorId,
      clientId: this.clientId,
      timePeriod: timePeriod,
      type: type,
      request: catObj
    };
    console.log(obj);
    this.cusService.getReportWiseCalculations(obj).subscribe(
      data => {
        this.xirr = data[this.data.schemeCode].xirr;
        console.log(data);
      }, (error) => {
        this.eventService.showErrorMessage(error);
      }
    );
  }
  getHistoricalAndNav() {
    let timePeriod = (this.demo1TabIndex == 0 || this.demo1TabIndex == 3) ? '3' : (this.demo1TabIndex == 1) ? '6' : (this.demo1TabIndex == 2) ? '1' : (this.demo1TabIndex == 4) ? '5' : (this.demo1TabIndex == 5) ? '0' : '0';
    let type = (this.demo1TabIndex == 0 || this.demo1TabIndex == 1) ? 'MONTH' : (this.demo1TabIndex == 2 || this.demo1TabIndex == 3 || this.demo1TabIndex == 4) ? 'YEAR' : (this.demo1TabIndex == 5) ? 'ALL' : '0';
    const obj = {
      amount: this.amount.value,
      schemeCode: this.data.accordSchemeCode,
    };
    const obj2 = {
      amfiCode: this.data.amfiCode,
      timePeriod: timePeriod,
      type: type
    };
    const clientData = this.cusService.getFactInvRet(obj).pipe(
      catchError(error => of(null))
    );
    const advisorData = this.cusService.getFactSheetHistoricalNav(obj2).pipe(
      catchError(error => of(null))
    );
    forkJoin(clientData, advisorData).subscribe(result => {
      if (result[0]) {
        if (result[0]) {
          this.navReturn = result[0];
        }
      }
      if (result[1]) {
        let arry = [];
        result[1].forEach(element => {
          arry.push([element.toDate, element.nav])
        });
        console.log('speedometer', arry);
        this.json = arry
        this.initializePortfolioChart();
      }
    }, err => {
      console.error(err);
    })
  }
  changeAmount(value) {
    if (this.amount.value > 10000) {
      this.getInvRet()
    }
  }
  calculateScheme(rate, monthOrYear, time) {
    let amt = this.amount.value;
    let totalAmt;
    if (monthOrYear == 'MONTH') {
      totalAmt = amt * (1 + ((rate / 100) * time))
    } else {
      totalAmt = amt * (1 + (rate / 100) * (time / 12))
    }
    return totalAmt
  }
  changeSchemePerformace() {
    switch (this.selectedItem.value) {
      case '1':
        this.savingAccount = this.navReturn['fdReturn'][2].fdRate;
        this.fixedDeposite = this.navReturn['fdReturn'][2].savingRate;
        this.scheme = this.navReturn['mfreturn'] ? this.calculateScheme(this.navReturn['mfreturn'].threeYearReturns, 'MONTH', 3) : null;
        break;
      case '2':
        this.savingAccount = this.navReturn['fdReturn'][1].fdRate;
        this.fixedDeposite = this.navReturn['fdReturn'][1].savingRate;
        this.scheme = this.navReturn['mfreturn'] ? this.calculateScheme(this.navReturn['mfreturn'].sixMonthReturns, 'MONTH', 6) : null;
        break;
      case '3':
        this.savingAccount = this.navReturn['fdReturn'][0].fdRate;
        this.fixedDeposite = this.navReturn['fdReturn'][0].savingRate;
        this.scheme = this.navReturn['mfreturn'] ? this.calculateScheme(this.navReturn['mfreturn'].oneYearReturns, 'YEAR', 1) : null;
        break;
      case '4':
        this.savingAccount = this.navReturn['fdReturn'][3].fdRate;
        this.fixedDeposite = this.navReturn['fdReturn'][3].savingRate;
        this.scheme = this.navReturn['mfreturn'] ? this.calculateScheme(this.navReturn['mfreturn'].threeYearReturns, 'YEAR', 3) : null;
        break;
      case '5':
        this.savingAccount = this.navReturn['fdReturn'][4].fdRate;
        this.fixedDeposite = this.navReturn['fdReturn'][4].savingRate;
        this.scheme = this.navReturn['mfreturn'] ? this.calculateScheme(this.navReturn['mfreturn'].fiveYearReturns, 'YEAR', 3) : null;
        break;
    }
    this.getXirr();
    this.schemePerformance();
  }
  getInvRet() {
    const data = {
      amount: this.amount.value,
      schemeCode: this.data.accordSchemeCode,
    };
    this.cusService.getFactInvRet(data)
      .subscribe(res => {
        if (res) {
          this.navReturn = res;
          this.changeSchemePerformace();
          console.log('speedometer', res);
          this.schemePerformance();
          if (this.ngOnInitLoad) {
            this.getCount();
            this.ngOnInitLoad = false;
          }
        } else {
        }
      }, err => {
        this.eventService.openSnackBar('err', 'DISMISS');
      });
  }
  getCount() {
    const data = {
      schemeCode: this.data.accordSchemeCode,
    };
    this.cusService.getFactSheetCount(data)
      .subscribe(res => {
        if (res) {
          this.checkToDisable(res);
          console.log('speedometer', res);
        } else {
        }
      }, err => {
        this.eventService.openSnackBar('err', 'DISMISS');
      });
  }
  getDetails() {
    this.isLoadingSchemeDetails = true;
    const data = {
      schemeCode: this.data.accordSchemeCode,
    };
    this.cusService.getFactSheetDetails(data)
      .subscribe(res => {
        if (res) {
          this.isLoadingSchemeDetails = false;
          this.schemeDetails = res;
          console.log('speedometer', res);
        } else {
        }
      }, err => {
        this.isLoadingSchemeDetails = false;
        this.eventService.openSnackBar('err', 'DISMISS');
      });
  }
  changeSelection(value) {
    console.log(value);
    console.log(this.selectedItem);
    this.changeSchemePerformace();
    //this.getHistoricalNav()
  }
  openTransaction(data) {
    const routeName = this.router.url.split('/')[1];
    if (routeName == 'customer') {
      this.isAdvisorSection = false;
    }
    const fragmentData = {
      flag: 'addNewTransaction',
      data: { isAdvisorSection: this.isAdvisorSection, flag: 'addNewTransaction', data },
      id: 1,
      state: 'open65',
      componentName: OnlineTransactionComponent,
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        if (UtilService.isDialogClose(sideBarData)) {
          if (UtilService.isRefreshRequired(sideBarData)) {
            this.ngOnInit();
            // this.refresh(true);
          }
          rightSideDataSub.unsubscribe();

        }
      }
    );
  }
  getHistoricalNav() {
    switch (this.demo1TabIndex) {
      case 0:
        this.schemeReturnName = 'THREE MONTH';
        this.schemeReturnValue = this.navReturn.mfreturn ? this.navReturn.mfreturn.threeMonthReturns : null;
        break;
      case 1:
        this.schemeReturnName = 'SIX MONTH';
        this.schemeReturnValue = this.navReturn.mfreturn ? this.navReturn.mfreturn.sixMonthReturns : null;
        break;
      case 2:
        this.schemeReturnName = '1 YEAR';
        this.schemeReturnValue = this.navReturn.mfreturn ? this.navReturn.mfreturn.oneYearReturns : null;
        break;
      case 3:
        this.schemeReturnName = '3 YEAR';
        this.schemeReturnValue = this.navReturn.mfreturn ? this.navReturn.mfreturn.threeYearReturns : null;
        break;
      case 4:
        this.schemeReturnName = '5 YEAR';
        this.schemeReturnValue = this.navReturn.mfreturn ? this.navReturn.mfreturn.fiveYearReturns : null;
        break;
      case 5:
        this.schemeReturnName = 'ALL';
        this.schemeReturnValue = this.navReturn.mfreturn ? this.navReturn.mfreturn.allReturns : null;
        break;
    }
    let timePeriod = (this.demo1TabIndex == 0 || this.demo1TabIndex == 3) ? '3' : (this.demo1TabIndex == 1) ? '6' : (this.demo1TabIndex == 2) ? '1' : (this.demo1TabIndex == 4) ? '5' : (this.demo1TabIndex == 5) ? '0' : '0';
    let type = (this.demo1TabIndex == 0 || this.demo1TabIndex == 1) ? 'MONTH' : (this.demo1TabIndex == 2 || this.demo1TabIndex == 3 || this.demo1TabIndex == 4) ? 'YEAR' : (this.demo1TabIndex == 5) ? 'ALL' : '0';
    const data = {
      amfiCode: this.data.amfiCode,
      timePeriod: timePeriod,
      type: type
    };
    this.cusService.getFactSheetHistoricalNav(data)
      .subscribe(res => {
        if (res) {

          let arry = [];
          res.forEach(element => {
            arry.push([element.toDate, element.nav])
          });
          console.log('speedometer', arry);
          this.json = arry
          this.initializePortfolioChart();
        } else {
        }
      }, err => {
        this.eventService.openSnackBar('err', 'DISMISS');
      });
  }
  checkToDisable(length) {
    let check6mon = Math.round(365 / 2);
    let check3mon = Math.round(check6mon / 2);
    let check3y = Math.round(3 * 365);
    let check5y = Math.round(5 * 365);
    if (length >= check3mon) {
      this.disable3m = false;
    }
    if (length >= check6mon) {
      this.disable6m = false;
    }
    if (length >= check3y) {
      this.disable3y = false;
    }
    if (length >= check5y) {
      this.disable5y = false;
    }
    if (length > check5y) {
      this.disableall = false;
    }
    if (length >= 365 && !this.disable3m && !this.disable6m) {
      this.disable1y = false;
    }
    if (this.disableall == false) {
      this.demo1TabIndex = 5;
      // this.selectedItem.setValue('6');
    } else if (this.disable5y == false) {
      this.demo1TabIndex = 4;
      // this.selectedItem.setValue('5');
    } else if (this.disable3y == false) {
      this.demo1TabIndex = 3;
      // this.selectedItem.setValue('4');
    } else if (this.disable1y == false) {
      this.demo1TabIndex = 2;
      // this.selectedItem.setValue('3');
    } else if (this.disable6m == false) {
      this.demo1TabIndex = 1;
      // this.selectedItem.setValue('2');
    } else {
      this.demo1TabIndex = 0;
      // this.selectedItem.setValue('1');
    }
    this.getHistoricalNav()
  }
  getSpeedometer() {
    this.speedLoading = true;
    const data = {
      schemeCode: this.data.accordSchemeCode,
    };
    this.cusService.getFactSheetRiskometer(data)
      .subscribe(res => {
        this.speedLoading = false;
        if (res) {
          console.log('speedometer', res);
          this.riskometerStatus = res.color;
          switch (this.riskometerStatus) {
            case 'Low':
              this.speedData = 13;
              break;
            case 'Moderately Low':
              this.speedData = 28;
              break;
            case 'Moderate':
              this.speedData = 45;
              break;
            case 'Moderately High':
              this.speedData = 60;
              break;
            case 'High':
              this.speedData = 80;
              break;
          }
          this.speedChart();
        } else {
        }
      }, err => {
        this.speedLoading = false;
        this.eventService.openSnackBar('err', 'DISMISS');
      });
  }
  getAllocationData() {
    this.isLoading = true;
    this.dataSource = new MatTableDataSource([{}, {}, {}]);
    const data = {
      schemeCode: this.data.accordSchemeCode,
    };
    this.cusService.getFactSheetAllocation(data)
      .subscribe(res => {
        if (res) {
          console.log('Asset Allocation', res);
          this.isLoading = false;
          this.dataSource.data = res;
        } else {
          this.isLoading = false;
          this.dataSource.data = [];
        }
      }, err => {
        this.isLoading = false;
        this.dataSource.data = [];
        this.eventService.openSnackBar('err', 'DISMISS');
      });
  }
  relativePerformanceGraph() {
    const chartConfigPerformance: any = {
      chart: {
        renderTo: 'container',
        type: 'scatter',
      },
      title: {
        text: ''
      },
      xAxis: {
        min: 0,
        max: 3,
        tickInterval: 16,
        plotLines: [{
          value: 1.5,
          color: '#666',
          dashStyle: 'solid',
          width: 2,
          zIndex: 5
        }],
        labels: {
          enabled: false
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
        pointFormat: '{point.name}'
      },

      yAxis: {
        min: 0,
        max: 3,
        plotLines: [{
          value: 1.5,
          dashStyle: 'solid',
          color: '#666',
          width: 2,
          zIndex: 5
        }],
        labels: {
          enabled: false
        },
        gridLineWidth: 1,
        showLastLabel: true,
        showFirstLabel: false,
        lineColor: '#ccc'
      },
      series: [{
        color: '#17a2b8',
        name: 'Relative performance',
        data: [{
          name: 'Chrome',
          x: 0.2,
          y: 0.2,
          sliced: true,
          selected: true
        }, {
          name: 'Internet Explorer',
          x: 1.99,
          y: 1.99
        }, {
          name: 'Firefox',
          x: 0.5,
          y: 0.5
        }, {
          name: 'Edge',
          x: 1,
          y: 1
        }, {
          name: 'Safari',
          x: 10,
          y: 10
        }, {
          name: 'Sogou Explorer',
          x: 4.5,
          y: 4.5
        }, {
          name: 'Opera',
          x: 1.6,
          y: 1.6
        }, {
          name: 'QQ',
          x: 1.2,
          y: 1.2
        }, {
          name: 'Other',
          x: 2.61,
          y: 2.61
        },
        {
          name: 'Other',
          x: 3,
          y: 3
        }, {
          name: 'Other',
          x: 0,
          y: 5
        }, {
          name: 'Other',
          x: 5,
          y: 5
        }]
      },]
    };
    this.performaceGraph = new Chart(chartConfigPerformance);
  }
  schemePerformance() {
    const chartConfigScheme: any = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        visible: false
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
      },

      series: [
        {
          name: "",
          colorByPoint: true,
          data: [
            {
              name: "Savings Account",
              y: Math.round(this.savingAccount),
              drilldown: "Savings Account"
            },
            {
              name: "Fixed Deposits ",
              y: Math.round(this.fixedDeposite),
              drilldown: "Fixed Deposits"
            },
            {
              name: "This Scheme",
              y: Math.round(this.scheme),
              drilldown: "This Scheme"
            },
          ]
        }
      ],
    };
    this.schemeChart = new Chart(chartConfigScheme);
  }
  speedChart() {
    const chartConfigSpeed: any = {
      chart: {
        renderTo: 'container',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      tooltip: {
        pointFormatter: function () {
          return 'risk'
        }
      },
      title: {
        text: 'Riskometer',
        align: 'center',
        verticalAlign: 'top',
        y: 40
      },
      pane: {
        center: ['50%', '75%'],
        size: '50%',
        startAngle: -90,
        endAngle: 90,
        background: {
          borderWidth: 0,
          backgroundColor: 'none',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },
      accessibility: {
        description: 'This line chart uses the Highcharts Annotations feature to place labels at various points of interest. The labels are responsive and will be hidden to avoid overlap on small screens. Image description: An annotated line chart illustrates the 8th stage of the 2017 Tour de France cycling race from the start point in Dole to the finish line at Station des Rousses. Altitude is plotted on the Y-axis, and distance is plotted on the X-axis. The line graph is interactive, and the user can trace the altitude level along the stage. The graph is shaded below the data line to visualize the mountainous altitudes encountered on the 187.5-kilometre stage. The three largest climbs are highlighted at Col de la Joux, Côte de Viry and the final 11.7-kilometer, 6.4% gradient climb to Montée de la Combe de Laisia Les Molunes which peaks at 1200 meters above sea level. The stage passes through the villages of Arbois, Montrond, Bonlieu, Chassal and Saint-Claude along the route.',
        landmarkVerbosity: 'one'
      },
      xAxis: {
        title: {
          text: 'Distance'
        },
      },
      yAxis: [{
        lineWidth: 0,
        min: 0,
        max: 90,
        minorTickLength: 0,
        tickLength: 0,
        tickWidth: 0,
        labels: {
          enabled: false
        },
        title: {
          text: '', //'<div class="gaugeFooter">46% Rate</div>',
          useHTML: true,
          y: 80
        },
        pane: 0,

      },
      ],
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0px 1px 2px black'
            }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%']
        },
        gauge: {
          dataLabels: {
            enabled: false
          },
          dial: {
            radius: '100%'
          }
        }
      },

      series: [{
        type: 'pie',
        innerSize: '50%',
        tooltip: {
          pointFormatter: function () {
            return null
          }
        },
        data: [
          {
            name: 'Low',
            // y:20,
            y: 20,
            tooltip: {
              pointFormatter: function () {
                return null
              }
            },
            color: '#02B875',
            dataLabels: {
              enabled: false
            }
          }, {
            name: 'Moderately Low',
            // y:20, 
            tooltip: {
              pointFormatter: function () {
                return null
              }
            },
            y: 20,
            color: '#5DC644',
            dataLabels: {
              enabled: false
            }
          }, {
            name: 'Moderate',
            // y:20,
            y: 20,
            tooltip: {
              pointFormatter: function () {
                return null
              }
            },
            color: '#FFC100',
            dataLabels: {
              enabled: false
            }
          }, {
            name: 'Moderately High',
            // y:20,
            y: 20,
            tooltip: {
              pointFormatter: function () {
                return null
              }
            },
            color: '#FDAF40',
            dataLabels: {
              enabled: false
            }
          },
          {
            name: 'High',
            // y:20,
            y: 20,
            tooltip: {
              pointFormatter: function () {
                return null
              }
            },
            color: '#FF7272',
            dataLabels: {
              enabled: false
            }
          },
        ]
      }, {
        showInLegend: false,
        type: 'gauge',
        data: [this.speedData],
        dial: {
          rearLength: 0
        }
      }],
    }
    this.speedChartVar = new Chart(chartConfigSpeed);
  }
  tabClick(value) {
    console.log(value);
    console.log(this.selectedItem);
    this.getHistoricalNav()
  }
  initializePortfolioChart() {
    const chartConfig: any = {
      chart: {
        type: 'area',
        zoomType: 'x'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        showEmpty: true
      },
      yAxis: {
        visible: false
      },
      accessibility: {
        description: 'This line chart uses the Highcharts Annotations feature to place labels at various points of interest. The labels are responsive and will be hidden to avoid overlap on small screens. Image description: An annotated line chart illustrates the 8th stage of the 2017 Tour de France cycling race from the start point in Dole to the finish line at Station des Rousses. Altitude is plotted on the Y-axis, and distance is plotted on the X-axis. The line graph is interactive, and the user can trace the altitude level along the stage. The graph is shaded below the data line to visualize the mountainous altitudes encountered on the 187.5-kilometre stage. The three largest climbs are highlighted at Col de la Joux, Côte de Viry and the final 11.7-kilometer, 6.4% gradient climb to Montée de la Combe de Laisia Les Molunes which peaks at 1200 meters above sea level. The stage passes through the villages of Arbois, Montrond, Bonlieu, Chassal and Saint-Claude along the route.',
        landmarkVerbosity: 'one'
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            color: '33FFB2',
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, '33FFB2']
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },

      series: [{
        type: 'area',
        name: 'NAV',
        data: this.json
      }]
    };
    this.portfolioGraph = new Chart(chartConfig);
    this.portfolioGraph1 = new Chart(chartConfig);
    this.portfolioGraph2 = new Chart(chartConfig);
    this.portfolioGraph3 = new Chart(chartConfig);
    this.portfolioGraph4 = new Chart(chartConfig);
    this.portfolioGraph5 = new Chart(chartConfig);

  }
}

export interface PeriodicElement {
  name: string;
  sector: string;
  ins: string;
  all: string;
  assets: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'ICICI Bank', sector: 'Financial', ins: 'Equity', all: '12.23%', assets: '1,290' },
  { name: 'ICICI Bank', sector: 'Financial', ins: 'Equity', all: '12.23%', assets: '1,290' },
  { name: 'ICICI Bank', sector: 'Financial', ins: 'Equity', all: '12.23%', assets: '1,290' },
  { name: 'ICICI Bank', sector: 'Financial', ins: 'Equity', all: '12.23%', assets: '1,290' },
  { name: 'ICICI Bank', sector: 'Financial', ins: 'Equity', all: '12.23%', assets: '1,290' },
  { name: 'ICICI Bank', sector: 'Financial', ins: 'Equity', all: '12.23%', assets: '1,290' },
  { name: 'ICICI Bank', sector: 'Financial', ins: 'Equity', all: '12.23%', assets: '1,290' },
  { name: 'ICICI Bank', sector: 'Financial', ins: 'Equity', all: '12.23%', assets: '1,290' },

];
