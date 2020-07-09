import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth-service/authService';
import { CustomerService } from '../../../customer.service';
import { AppConstants } from 'src/app/services/app-constants';
import { Chart } from 'angular-highcharts';
import { UtilService, LoaderFunction } from 'src/app/services/util.service';
import * as Highcharts from 'highcharts';
import { slideInAnimation } from 'src/app/animation/router.animation';

@Component({
  selector: 'app-mobile-myfeed',
  templateUrl: './mobile-myfeed.component.html',
  styleUrls: ['./mobile-myfeed.component.scss'],
  providers: [LoaderFunction],
  animations: [
    slideInAnimation,
  ]
})
export class MobileMyfeedComponent implements OnInit {
  bscData;
  openMenue: boolean = false;
  inputData: any;
  advisorId: any;
  clientId: any;
  clientData: any;
  chartTotal: number;
  assetAllocationPieConfig: Chart;
  portFolioData: any;
  recentTransactions: any[];
  riskProfile: any[];
  nifty500DataFlag: boolean;
  nifty500Data: any;
  selectedVal: any;
  bse: any;
  nifty50: any;
  StockFeedFlag: boolean;
  deptDataFlag: boolean;
  deptData: any;
  letsideBarLoader: boolean;
  silverData: any;
  goldData: { carat_24: any; carat_22: any; };
  documentVault: any;
  globalRiskProfile: any[];
  chart: Highcharts.Chart;
  hasError: boolean;
  chartData: any[] = [
    {
      name: 'Equity',
      y: 20,
      color: AppConstants.DONUT_CHART_COLORS[0],
      dataLabels: {
        enabled: false
      }
    }, {
      name: 'Fixed income',
      y: 20,
      color: AppConstants.DONUT_CHART_COLORS[1],
      dataLabels: {
        enabled: false
      }
    }, {
      name: 'Commodities',
      y: 20,
      color: AppConstants.DONUT_CHART_COLORS[2],
      dataLabels: {
        enabled: false
      }
    }, {
      name: 'Real estate',
      y: 20,
      color: AppConstants.DONUT_CHART_COLORS[3],
      dataLabels: {
        enabled: false
      }
    }, {
      name: 'Others',
      y: 20,
      color: AppConstants.DONUT_CHART_COLORS[4],
      dataLabels: {
        enabled: false
      }
    }
  ]
  portfolioData: boolean = false;
  mfAllocationData: any;
  totalValue: any;

  constructor(
    private customerService: CustomerService,
    public loaderFn: LoaderFunction,
  ) {
    this.clientId = AuthService.getClientId()
    this.advisorId = AuthService.getAdvisorId()
    this.clientData = AuthService.getClientData()
  }
  
  @Input()
  set data(data) {
    this.inputData = data;
    console.log('This is Input data of proceed ', data);
  }
  get data() {
    return this.inputData;
  }
  ngOnInit() {
    this.recentTransactions = [];
    this.globalRiskProfile = [];
    this.portFolioData = [];
    this.documentVault = {}
    this.riskProfile = []
    this.getAssetAllocationData()
    this.loadRecentTransactions()
    this.getStockFeeds();
    this.getDeptData();
    this.getNifty500Data();
    this.loadRiskProfile()
    this.initializePieChart()
    this.loadDocumentValutData();
  }
  openMenu(flag) {
    if (flag == false) {
      this.openMenue = true
    } else {
      this.openMenue = false
    }
  }
  getAssetAllocationData() {
    this.portfolioData = true
    const obj = {
      clientId: this.clientData.clientId,
      advisorId: this.advisorId,
      targetDate: new Date().getTime()
    }
    // this.tabsLoaded.portfolioData.isLoading = true;

    //this.loaderFn.increaseCounter();
    this.customerService.getAllFeedsPortFolio(obj).subscribe(res => {
      console.log('asset allocation', res)
      if (res == null) {
        this.portFolioData = [];
      } else {
        this.portfolioData = true
        let stock = res.find(d => d.assetType == 6);
        this.portFolioData = res;
        if (stock) {
          this.portFolioData = this.portFolioData.filter(d => d.assetType != 6);
          this.portFolioData.unshift(stock);
        }

        let chartData = [];
        let counter = 0;
        let othersData = {
          y: 0,
          name: 'Others',
          color: AppConstants.DONUT_CHART_COLORS[4],
          dataLabels: {
            enabled: false
          }
        }
        let chartTotal = 1;
        let hasNoDataCounter = res.length;
        let pieChartData = res.filter(element => element.assetType != 2 && element.currentValue != 0);
        pieChartData.forEach(element => {
          if (element.investedAmount > 0) {
            chartTotal += element.investedAmount;
            if (counter < 4) {
              chartData.push({
                y: element.investedAmount,
                name: element.assetTypeString,
                color: AppConstants.DONUT_CHART_COLORS[counter],
                dataLabels: {
                  enabled: false
                }
              })
            } else {
              othersData.y += element.investedAmount;
            }
            counter++;
          } else {
            hasNoDataCounter--;
          }
        });
        chartTotal -= 1;
        if (chartTotal === 0) {
        }
        if (counter > 4) {
          chartData.push(othersData);
        }
        if (counter > 0) {
          this.chartTotal = chartTotal;
          this.chartData = chartData;
          this.assetAllocationPieChartDataMgnt(this.chartData);
        }
      }
      this.loaderFn.decreaseCounter();
    }, err => {
      this.hasError = true;
      this.loaderFn.decreaseCounter();
    })
  }
  loadDocumentValutData() {
    const obj = {
      clientId: this.clientData.clientId,
      advisorId: this.advisorId,
      limit: 5
    }
    this.customerService.getDocumentsFeed(obj).subscribe(res => {
      if (res == null || res.fileStats.length == 0) {
        this.documentVault = {};
      } else {
        this.documentVault = res;
        this.documentVault.familyStats.unshift({
          relationshipId: (this.clientData.genderId == 1 ? 2 : 3),
          genderId: 0
        })
      }
    });
  }
  assetAllocationPieChartDataMgnt(data) {
    this.assetAllocationPieConfig.removeSeries(0);
    this.assetAllocationPieConfig.addSeries({
      type: 'pie',
      name: 'Asset allocation',
      animation: false,
      innerSize: '60%',
      data: data,
    }, true, true);
  }
  riskProfileMaxScore(id) {
    if (this.globalRiskProfile.length > 0) {
      return this.globalRiskProfile.find(data => data.id == id).scoreUpperLimit;
    } else {
      return 0;
    }
  }
  riskProfileDesc(id) {
    if (this.globalRiskProfile.length > 0) {
      return this.globalRiskProfile.find(data => data.id == id).description;
    } else {
      return '';
    }
  }
  carouselWheelEvent(carousel, event) {
    event.preventDefault();
    if (event.deltaY > 0) {
      carousel.slickNext();
    } else {
      carousel.slickPrev();
    }
  }
  sliderConfig = {
    slidesToShow: 1,
    infinite: true,
    variableWidth: true,
    outerEdgeLimit: true,
    "nextArrow": "<div style='position: absolute; top: 35%; right: 0; cursor: pointer;' class='nav-btn classNextArrow next-slide'><img src='/assets/images/svg/next-arrow.svg'></div>",
    "prevArrow": "<div style='position: absolute; top: 35%; left: -5px; z-index: 1; cursor: pointer;' class='nav-btn classNextArrow next-slide'><img src='/assets/images/svg/pre-arrow.svg'></div>",
  }

  loadRecentTransactions() {
    const obj = {
      clientId: this.clientData.clientId,
      advisorId: this.advisorId,
      familyMemberId: 0
    }

    this.customerService.getRecentTransactions(obj).subscribe(res => {
      if (res == null) {
        this.recentTransactions = [];
      } else {
        this.recentTransactions = res;
      }
    });
  }
  loadRiskProfile() {
    const obj = {
      clientId: this.clientData.clientId,
      advisorId: this.advisorId
    }
    this.customerService.getRiskProfile(obj).subscribe(res => {
      if (res == null || res[0].id === 0) {
        this.riskProfile = [];
      } else {
        this.riskProfile = res;
        console.log('risk',this.riskProfile)
      }
    });
  }
  getTnxStatus(id) {
    return UtilService.getTransactionStatusFromStatusId(id);
  }
  getStockFeeds() {
    this.letsideBarLoader = true;
    this.selectedVal = 'Equities';
    this.StockFeedFlag = true;
    this.customerService.getStockFeeds().subscribe(
      data => {
        console.log(data);
        this.getStockFeedsResponse(data);
      }, error => {
        console.log('get stockfeed error : ', error);
        this.StockFeedFlag = false;
        this.letsideBarLoader = false;
      });
  }

  getDeptData() {
    this.deptDataFlag = true;
    this.customerService.getDeptData().subscribe(
      data => {
        console.log(data);
        if (data) {
          this.deptDataFlag = false;
          data.current_value = Math.round(data.current_value.replace(',', ''));
          this.deptData = data;
          this.deptData.change_in_percentage = parseFloat(this.deptData.change_in_percentage);
          data['colourFlag'] = this.checkNumberPositiveAndNegative(data.change_in_percentage);
        }
      }, error => {
        console.log('get DeptData error : ', error);
        this.deptDataFlag = false;

      }
    );
  }

  getStockFeedsResponse(data) {
    this.StockFeedFlag = false;
    this.letsideBarLoader = false;
    let { bse_and_nse, carat_22, carat_24, silver } = data;
    if (bse_and_nse) {
      const regex = /\=/gi;

      // bse_and_nse = (bse_and_nse as string).replace(regex, ':');
      bse_and_nse = JSON.parse(bse_and_nse);
      bse_and_nse.date = new Date(bse_and_nse.date).getTime();
      this.bse = JSON.parse(bse_and_nse.bse);
      this.nifty50 = JSON.parse(bse_and_nse.nifty);
      this.bse.current_value = Math.round((this.bse.closing_value).replace(',', ''));
      this.bse.change_in_percentage = parseFloat(this.bse.change_in_percentage).toFixed(2);
      this.bse['colourFlag'] = this.checkNumberPositiveAndNegative(this.bse.change_in_percentage);
      this.nifty50.current_value = Math.round((this.nifty50.closing_value).replace(',', ''));
      this.nifty50.change_in_percentage = parseFloat(this.nifty50.change_in_percentage).toFixed(2);
      this.nifty50['colourFlag'] = this.checkNumberPositiveAndNegative(this.nifty50.change_in_percentage);
    }
    if (carat_22) {
      carat_22 = JSON.parse(carat_22);
      carat_22.change_in_percentage = parseFloat(carat_22.change_in_percentage).toFixed(2);
      carat_22['colourFlag'] = this.checkNumberPositiveAndNegative(carat_22.change_in_percentage.replace('%', ''));
    }
    if (carat_24) {
      carat_24 = JSON.parse(carat_24);
      carat_24.change_in_percentage = parseFloat(carat_24.change_in_percentage).toFixed(2);
      carat_24['colourFlag'] = this.checkNumberPositiveAndNegative(carat_24.change_in_percentage.replace('%', ''));
    }
    if (silver) {
      silver = JSON.parse(silver);
      silver.current_value = (silver.current_value).replace('₹', '');
      silver.current_value = (silver.current_value).replace(',', '');
      silver.current_value = Math.round(silver.current_value);
      silver.change_in_percentage = parseFloat(silver.change_in_percentage).toFixed(2);
      silver['colourFlag'] = this.checkNumberPositiveAndNegative(silver.change_in_percentage);
    }
    // this.bscData = bse_and_nse;
    // this.nscData = nse;
    this.goldData = { carat_24, carat_22 };
    this.silverData = silver;
  }

  getNifty500Data() {
    this.nifty500DataFlag = true;
    this.customerService.getNiftyData().subscribe(
      data => {
        console.log(data);
        if (data) {
          data.current_value = Math.round(data.current_value.replace(',', ''));
          this.nifty500DataFlag = false;
          data['colourFlag'] = this.checkNumberPositiveAndNegative(data.change_in_percentage.replace('%', ''));
          this.nifty500Data = data;
        }
      }, error => {
        console.log('get getNifty500Data error : ', error);
        this.nifty500DataFlag = false;
      }
    );
  }

  checkNumberPositiveAndNegative(value) {
    if (value == 0) {
      return undefined;
    } else {
      const number = Number(value);
      const result = Math.sign(number);
      return (result == -1) ? false : true;
    }
  }

  onValChange(value) {
    this.selectedVal = value;
  }
  initializePieChart() {
    let chartConfig: any = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        animation: false
      },
      title: {
        text: '',
        align: 'center',
        verticalAlign: 'middle',
        y: 60
      },
      tooltip: {
        pointFormat: ' <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          startAngle: 0,
          endAngle: 360,
          center: ['50%', '50%'],
          size: '100%'
        }
      },
      exporting: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Asset allocation',
        animation: false,
        innerSize: '60%',
        data: this.chartData
      }]
    }
    this.assetAllocationPieConfig = new Chart(chartConfig);

    chartConfig.series = [{
      type: 'pie',
      animation: false,
      name: 'MF Asset allocation',
      innerSize: '60%',
      data: this.mfAllocationData
    }]
  }
  generateMFallocationChartData(data) {// function for calculating percentage
    // this.mfAllocationData = [];
    let counter = 0;
    data.forEach(element => {
      switch (element.category) {
        case 'DEBT':
          this.mfAllocationData.push({
            name: element.category,
            y: parseFloat(((element.currentValue / this.totalValue.currentValue) * 100).toFixed(2)),
            color: AppConstants.DONUT_CHART_COLORS[1],
            dataLabels: {
              enabled: false
            }
          })
          counter++;
          break;

        case 'EQUITY':
          this.mfAllocationData.push({
            name: element.category,
            y: parseFloat(((element.currentValue / this.totalValue.currentValue) * 100).toFixed(2)),
            color: AppConstants.DONUT_CHART_COLORS[0],
            dataLabels: {
              enabled: false
            }
          })
          counter++;
          break;
        case 'HYBRID':
          this.mfAllocationData.push({
            name: element.category,
            y: parseFloat(((element.currentValue / this.totalValue.currentValue) * 100).toFixed(2)),
            color: AppConstants.DONUT_CHART_COLORS[2],
            dataLabels: {
              enabled: false
            }
          })
          counter++;
          break;
        case 'SOLUTION ORIENTED':
          this.mfAllocationData.push({
            name: element.category,
            y: parseFloat(((element.currentValue / this.totalValue.currentValue) * 100).toFixed(2)),
            color: AppConstants.DONUT_CHART_COLORS[4],
            dataLabels: {
              enabled: false
            }
          })
          counter++;
          break;
        default:
          this.mfAllocationData.push({
            name: 'OTHERS',
            y: parseFloat(((element.currentValue / this.totalValue.currentValue) * 100).toFixed(2)),
            color: AppConstants.DONUT_CHART_COLORS[3],
            dataLabels: {
              enabled: false
            }
          })
          counter++;
          break;
      }
    });
    this.mfAllocationData = [...new Map(this.mfAllocationData.map(item => [item.name, item])).values()];
    this.mfAllocationData.forEach(e => {
      e.name = e.name[0].toUpperCase() + e.name.slice(1).toLowerCase();
    })
  }
}
