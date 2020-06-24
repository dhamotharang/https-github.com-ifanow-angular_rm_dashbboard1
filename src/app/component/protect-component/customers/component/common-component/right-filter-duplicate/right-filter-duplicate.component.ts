import {Component, Input, OnInit} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material';
import {MY_FORMATS2} from 'src/app/constants/date-format.constant';
import {DatePipe} from '@angular/common';
import {MatProgressButtonOptions} from 'src/app/common/progress-button/progress-button.component';
import {AuthService} from 'src/app/auth-service/authService';
import {SubscriptionInject} from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import {FormBuilder, Validators} from '@angular/forms';
import {EventService} from 'src/app/Data-service/event.service';
import {CustomerService} from '../../customer/customer.service';
import {MfServiceService} from '../../customer/accounts/assets/mutual-fund/mf-service.service';

@Component({
  selector: 'app-right-filter-duplicate',
  templateUrl: './right-filter-duplicate.component.html',
  styleUrls: ['./right-filter-duplicate.component.scss'],
  providers: [
    [DatePipe],
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2},
  ],
})
export class RightFilterDuplicateComponent implements OnInit {
  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'GENERATE REPORT',
    buttonColor: 'accent',
    barColor: 'accent',
    raised: true,
    stroked: false,
    mode: 'determinate',
    value: 10,
    disabled: false,
    fullWidth: false,
    // buttonIcon: {
    //   fontIcon: 'favorite'
    // }
  };
  customCollapsedHeight = '45px';
  customExpandedHeight = '45px';
  panelOpenState = false;
  _data: any;
  familyMember: any;
  folio: any;
  amc: any;
  scheme: any;
  countFamily;
  countAmc;
  countScheme;
  countFolio;
  category: any;
  transactionView: any;
  reportType;
  reportFormat;
  saveFilters;
  financialYears = [];
  countReport: any;
  countTranView: any;
  countCategory: any;
  dataToSend: any;
  summaryFilerForm: any;
  folioObj: any;
  schemeObj: any;
  categoryObj: any;
  familyMemObj: any;
  selectedFamilyMap = {};
  selectedAmcMap = {};
  selectedSchemeMap = {};
  amcObj: any;
  obj: any;
  mfData: any;
  finalFilterData: any;
  reportTypeobj: any;
  reportFormatObj: any;
  financialYearsObj: any;
  overviewFilter: any;
  selectedTransactionView;
  sendTransactionView;
  transactionPeriod = false;
  transactionPeriodCheck = false;
  overviewFilterCount: any;
  showError: string;
  countFormat: number;
  showGrandfathering = true;
  advisorId: any;
  clientId: any;
  selectUnselctAllFlag = true;
  transactionType: any;
  checkFlag: boolean;
  uncheckFlag = true;
  whichFilter: any;
  selectUnselctAllFlagFam = true;
  selectUnselctAllFlagAmc = true;
  selectUnselctAllFlagScheme = true;
  selectUnselctAllFlagFolio = true;
  selectUnselctAllFlagCategory = true;
  selectedFolioMap= {};
  categoryChecked: boolean;
  folioChecked: boolean;
  schemeChecked: boolean;
  amcChecked: boolean;
  familyChecked: boolean;

  constructor(private subInjectService: SubscriptionInject, private fb: FormBuilder,
              private custumService: CustomerService, private eventService: EventService,
              private mfService: MfServiceService, private datePipe: DatePipe,) {
  }

  @Input()
  set data(inputData) {
    this._data = inputData;
  }

  get data() {
    return this._data;
  }

  ngOnInit(): void {
    this.panelOpenState = false;
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
    // this._data.forEach(element => {()
    //   element.done = false
    // });
    // (this._data.name == 'SUMMARY REPORT') ? this.transactionPeriod = false : this.transactionPeriod = true;
    this.transactionPeriodCheck = (this._data.transactionPeriodCheck) ? this._data.transactionPeriodCheck : false;
    this.transactionPeriod = (this._data.transactionPeriod) ? this._data.transactionPeriod : false;
    // this.amc = this._data.schemeWise;//amc wise data
    // this.folio = this._data.folioWise;//for getting all folios

    this.getAmc(this._data.schemeWise);
    this.getFolio(this._data.folioWise);
    this.showSummaryFilterForm(this._data); // as on date and showZero folio form

    this.getCategoryWise(this._data.category); // get category wise data
    if (this._data.scheme) {
      this.getSchemeWise(this._data.scheme); // scheme wise data
    }
    this.getFamilyMember(this._data.familyMember); // for family memeber
    this.getTransactionView(this._data.transactionView); // for displaying how many columns to show in table
    this.getReportType(); // get type of report categorywise,investor,sub category wise
    this.getReportFormat(); // get capital gain report
    this.getSaveFilters(); // forSaving filters
    this.transactionType = this._data.transactionTypeList; // for transaction type in all transactions
    this.getFinancialYears(this.summaryFilerForm); // for getting financial years for capital gain
    this.overviewFilter = this._data.overviewFilter;
    // this.getOverviewFilter();//used for overview filter to show specific tables
    this.setDefaultFilters(); // setting default selected in each above array
    if (this._data.category) {
      this.getCategoryWise(this._data.category);
      // get category wise data
    } else {
      console.log('RightFilterComponent ngOninit category data is empty');
    }
    if (this._data.scheme) {
      this.getSchemeWise(this._data.scheme); // scheme wise data
    } else {
      console.log('RightFilterComponent ngOninit getSchemeWise data is empty');
    }
    if (this._data.folioWise) {
      this.getFamilyMember(this._data.familyMember); // for family memeber
    } else {
      console.log('RightFilterComponent ngOninit getFamilyMember foliowise data is empty');
    }
    if (this._data.transactionView) {
      this.getTransactionView(this._data.transactionView); // for displaying how many columns to show in table
    } else {
      console.log('RightFilterComponent ngOninit getTransactionView data is empty');
    }
    this.getReportType(); // get type of report categorywise,investor,sub category wise
    this.setDefaultFilters(); // setting default selected in each above array
  }

  getFormControl(): any {
    return this.summaryFilerForm.controls;
  }

  getAmc(data) {
    const myArray = data;
    const list = [];
    myArray.forEach(val => list.push(Object.assign({}, val)));
    const filterData = [];
    list.forEach(element => {
      const obj = {
        amc_name: element.amc_name,
        schemeName: element.schemeName,
        schemeCode: element.schemeCode,
        mutualFund: element.mutualFund,
        id: element.id,
        amc_id: element.amc_id,
        selected: element.selected,
        showInFilter: true
      };
      filterData.push(obj);
    });
    const sortedData = this.mfService.sorting(filterData, 'amc_name');
    this.amc = [...new Map(sortedData.map(item => [item.amc_id, item])).values()];


    // this.amc = [...new Map(this._data.schemeWise.map(item => [item.amc_id, item])).values()]; // amc wise data

    // this.amc = this.mfService.sorting(this.amc, 'amc_name');
    // this.amc.forEach(item => item.showInFilter = true);
  }

  getFolio(data) {
    const myArray = data;
    const list = [];
    myArray.forEach(val => list.push(Object.assign({}, val)));
    const filterData = [];
    list.forEach(element => {
      const obj = {
        folioNumber: element.folioNumber,
        selected: element.selected,
        showInFilter: true
      };
      filterData.push(obj);
    });
    const sortedData = this.mfService.sorting(filterData, 'folioNumber');
    this.folio = [...new Map(sortedData.map(item => [item.folioNumber, item])).values()];
  }

  getCategoryWise(data) {
    const myArray = data;
    const list = [];
    myArray.forEach(val => list.push(Object.assign({}, val)));
    const filterData = [];
    list.forEach(element => {
      const obj = {
        category: element.category,
        categoryId: element.id,
        selected: element.selected,
        showInFilter: true
      };
      filterData.push(obj);
    });
    const sortedData = this.mfService.sorting(filterData, 'category');
    this.category = [...new Map(sortedData.map(item => [item.categoryId, item])).values()];
  }

  showSummaryFilterForm(data) {
    let grandFatheringEffect;
    (data.filterDataForCapital) ? (data.filterDataForCapital.grandfathering == 2 ? grandFatheringEffect = 2 : grandFatheringEffect = 1) : '2';
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 1);
    const todayDate = new Date().toISOString().slice(0, 10);
    this.summaryFilerForm = this.fb.group({
      reportAsOn: [data.reportAsOn ? new Date(data.reportAsOn) : null, [Validators.required]],
      fromDate: [data.fromDate ? new Date(data.fromDate) : null, [Validators.required]],
      toDate: [data.toDate ? new Date(data.toDate) : null, [Validators.required]],
      showFolios: [(data.showFolio) ? data.showFolio + '' : '2', [Validators.required]],
      grandfathering: [(data.filterDataForCapital) ? data.filterDataForCapital.grandfathering + '' : '2', [Validators.required]],
    });
  }

  getSchemeWise(data) {
    const filterData = [];
    data.filter(function (element) {
      // const obj = {
      //   id: element.id,
      //   schemeName: element.schemeName,
      //   amc_name: element.amc_name,
      //   mutualFund: element.mutualFund,
      //   amc_id: element.amc_id,
      //   selected:element.selected
      // };
      const obj = {
        id: element.id,
        schemeName: element.schemeName,
        amc_name: element.amc_name,
        mutualFund: element.mutualFund,
        amc_id: element.amc_id,
        selected: element.selected,
        showInFilter: true
      };
      filterData.push(obj);
    });
    const sortedData = this.mfService.sorting(filterData, 'schemeName');
    this.scheme = sortedData;
  }

  getFamilyMember(data) {
    let filterData = [];
    if (this._data.name == 'CAPITAL GAIN REPORT') {
      this._data.capitalGainData.mutualFundList.forEach(element => {
        const obj = {
          name: element.ownerName,
          familyMemberId: element.familyMemberId,
          selected: true,
          showInFilter: true
        };
        filterData.push(obj);
      });
      if (this._data.filterDataForCapital) {
        filterData.forEach(item => item.selected = '');
        this._data.filterDataForCapital.family_member_list.forEach(element => {
          filterData.forEach(item => {
            if (item.familyMemberId == element.id) {
              item.selected = true;
            }
          });
        });
        filterData.forEach(element => {
          if (element.selected == '') {
            element.selected = false;
          }
        });
        filterData = [...new Map(filterData.map(item => [item.familyMemberId, item])).values()];
        // const familyember = this.mfService.getOtherFilter(filterData,this._data.filterDataForCapital.family_member_list,'id','id','displayName')
      }

    } else {
      data.forEach(element => {
        const obj = {
          name: element.name,
          familyMemberId: element.id,
          selected: element.selected,
          showInFilter: true
        };
        filterData.push(obj);
      });
    }
    const sortedData = this.mfService.sorting(filterData, 'name');
    this.familyMember = [...new Map(sortedData.map(item => [item.familyMemberId, item])).values()];
  }

  getTransactionView(data) {
    const filterData = [];
    data.filter(function (element) {
      const obj = {
        displayName: (element.displayName) ? element.displayName : element,
        selected: (element.selected == false) ? element.selected = false : (element.selected == true) ? element.selected = true : true
      };
      filterData.push(obj);
    });
    this.transactionView = filterData;
  }

  getReportType() {
    if (this._data.name == 'SUMMARY REPORT') {
      this.reportType = ['Investor wise', 'Category wise', 'Sub Category wise'];
    } else {
      this.reportType = ['Investor wise', 'Category wise', 'Sub Category wise', 'Scheme wise'];
    }
    const filterData = [];
    this.reportType.filter(function (element) {
      const obj = {
        name: element,
        selected: false
      };
      filterData.push(obj);
    });
    this.reportType = filterData;
  }

  getFinancialYears(form) {
    const calculatingYears = [];
    let sortingYeras: any;
    if (this._data.capitalGainData) {
      const redemptionList = this._data.capitalGainData.redemptionList;
      redemptionList.forEach(element => {
        if (element.purchaceAgainstRedemptionTransactions.length > 0) {
          let year = element.financialYear;
          const date = new Date(element.transactionDate);

          const finDate = new Date(year, 3, 1);
          if (date < finDate) {
            year = (element.financialYear - 1);
          }
          const obj = {
            from: year,
            to: (year + 1),
          };
          calculatingYears.push(obj);
        }
      });
      console.log(calculatingYears);
      const filteredYears = [...new Map(calculatingYears.map(item => [item.from, item])).values()];
      sortingYeras = filteredYears.sort((a, b) =>
        a.from > b.from ? 1 : (a.from === b.from ? 0 : -1)
      );
      const calculatedFinYears = sortingYeras;
      this.financialYears = [{from: 2010, to: 2011, selected: true, disabled: true}, {
        from: 2011,
        to: 2012,
        selected: true,
        disabled: true
      }, {from: 2012, to: 2013, selected: true, disabled: true}, {
        from: 2013,
        to: 2014,
        selected: true,
        disabled: true
      }, {from: 2014, to: 2015, selected: true, disabled: true},
        {from: 2015, to: 2016, selected: true, disabled: true}, {
          from: 2016,
          to: 2017,
          selected: true,
          disabled: true
        }, {from: 2017, to: 2018, selected: true, disabled: true}, {
          from: 2018,
          to: 2019,
          selected: true,
          disabled: true
        }, {from: 2019, to: 2020, selected: true, disabled: true}, {
          from: 2020,
          to: 2021,
          selected: true,
          disabled: true
        }];
      calculatedFinYears.forEach(element => {
        this.financialYears.forEach(item => {
          if (element.from == item.from) {
            item.disabled = false;
          }
        });
      });
      this.financialYears.filter(function (element) {
        if (element.from == 2019 && element.to == 2020) {
          element.selected = true;
          form.get('grandfathering').setValue('1');
          form.get('grandfathering').updateValueAndValidity();

        } else {
          form.get('grandfathering').setValue('2');
          form.get('grandfathering').updateValueAndValidity();
          element.selected = false;
        }

      });
      this.financialYears.forEach(item => {
        if (this._data.capitalGainData.fromDateYear >= 2018) {
          form.get('grandfathering').setValue('1');
        }
      });
    }
    if (this._data.filterDataForCapital) {
      this.financialYears.forEach(item => item.selected = '');
      this._data.filterDataForCapital.financialYear.forEach(element => {
        this.financialYears.forEach(item => {
          if (item.from == element.from && item.to == element.to) {
            item.selected = true;
          }
        });
      });
      this.financialYears.forEach(element => {
        if (element.selected == '') {
          element.selected = false;
        }
      });
    }

  }

  getReportFormat() {
    this.reportFormat = ['Summary', 'Detailed'];

    const filterData = [];
    this.reportFormat.filter(function (element) {
      const obj = {
        name: element,
        selected: false
      };
      filterData.push(obj);
    });
    if (this._data.filterDataForCapital) {
      filterData.forEach(item => item.selected = '');
      this._data.filterDataForCapital.reportFormat.forEach(element => {
        filterData.forEach(item => {
          if (item.name == element.name) {
            item.selected = true;
          }
        });
      });
      filterData.forEach(element => {
        if (element.selected == '') {
          element.selected = false;
        }
      });
    }
    this.reportFormat = filterData;

  }

  // getTransactionType(){

  // }
  getSaveFilters() {
    this.saveFilters = [
      {value: 'Current Client', selected: false}, {value: 'All Client', selected: false}];

  }

  getOverviewFilter() {
    this.overviewFilter = [{name: 'Summary bar', selected: true},
      {name: 'Scheme wise allocation', selected: true},
      {name: 'Cashflow Status', selected: true},
      {name: 'Family Member wise allocation', selected: true},
      {name: 'Category wise allocation', selected: true},
      {name: 'Sub Category wise allocation', selected: true}];
  }

  changeFilterPeriod(value) {
    console.log('date period ==', value);
    if (value == true) {
      this.transactionPeriod = true;
    } else {
      this.transactionPeriod = false;
    }
  }

  setDefaultFilters() {
    this.reportType.forEach(item => {
      this.countReport = 0;
      if (this._data.name == 'SUMMARY REPORT' && this._data.reportType == 'Scheme wise') {
        if (item.name == 'Sub Category wise') {
          item.selected = true;
          this.countReport++;
        }
      } else {
        if (item.name == this._data.reportType) {
          item.selected = true;
          this.countReport++;
        }
      }
    });
    if (this._data.selectFilter || this._data.selectFilter == 0) {
      this.saveFilters = [
        {value: 'Current Client', selected: (this._data.selectFilter != 0) ? true : false}, {
          value: 'All Client',
          selected: (this._data.selectFilter == 0) ? true : false
        }];

    }

    if (this._data.filterDataForCapital) {
      this.reportFormat.forEach(item => {
        this.countFormat = 0;
        if (item.selected) {
          this.countReport++;
        }
      });
    } else {
      this.reportFormat.forEach(item => {
        this.countFormat = 0;
        if (item.name == 'Summary') {
          item.selected = true;
          this.countReport++;
        }
      });
    }
    this.countFamily = this.familyMember.length;
    this.countAmc = this.amc.length;
    if (this.scheme) {
      this.countScheme = this.scheme.length;
    }
    this.countFolio = this.folio.length;
    this.countTranView = this.transactionView.length;
    this.countCategory = this.category.length;
    this.changeSelect('', '');
  }

  changeFilterFamily() {
    (this.familyMemObj.length == 0) ? this.showError = null : (this.familyMemObj.length == 1 && !this.familyMemObj[0].selected) ? this.showError = 'family member' : this.showError = null;
    const filterData = this._data.mfData.mutualFundList;
    // filterData = filterData.filter((item: any) =>
    //   (item.currentValue != 0 && item.currentValue > 0)
    // );
    const filterData1 = [];
    const filterData2 = [];
    const filterData3 = [];
    const filterData4 = [];
    let selectedFamilyMapObj= {};
    this.checkFlag = true;
    this.familyMember.filter(function (element) {
      if (element.selected == true) {
         selectedFamilyMapObj[element.familyMemberId] = element.familyMemberId;
        element.showInFilter = true;
        filterData.filter(function (amc) {
          // amc.mutualFund.forEach(function (mf) {
          if (amc.familyMemberId == element.familyMemberId) {
            const obj = {
              amc_name: amc.amcName,
              schemeName: amc.schemeName,
              id: amc.schemeId,
              mutualFund: amc.mutualFund,
              amc_id: amc.amcId,
              selected: true,
              showInFilter: true,
              familyMemberId:amc.familyMemberId
            };
            const obj4 = {
              amc_name: amc.amcName,
              schemeName: amc.schemeName,
              id: amc.schemeId,
              mutualFund: amc.mutualFund,
              amc_id: amc.amcId,
              selected: true,
              showInFilter: true,
              familyMemberId:amc.familyMemberId
            };
            const obj2 = {
              folioNumber: amc.folioNumber,
              selected: true,
              showInFilter: true,
              familyMemberId:amc.familyMemberId,
              amc_id: amc.amcId,
              id: amc.schemeId,
            };
            const obj3 = {
              category: amc.categoryName,
              categoryId: amc.categoryId,
              selected: true,
              showInFilter: true,
              familyMemberId:amc.familyMemberId,
              amc_id: amc.amcId,
              id: amc.schemeId,
              folioNumber: amc.folioNumber,
            };
            filterData1.push(obj);
            filterData2.push(obj2);
            filterData3.push(obj3);
            filterData4.push(obj4);
          }
          // });
        });
      } else {
        element.showInFilter = false;
      }
    });
    this.selectedFamilyMap = selectedFamilyMapObj;
    this.scheme = [...new Map(filterData4.map(item => [item.id, item])).values()];
    this.amc = [...new Map(filterData1.map(item => [item.amc_id, item])).values()];
    this.folio = [...new Map(filterData2.map(item => [item.folioNumber, item])).values()];
    this.category = [...new Map(filterData3.map(item => [item.categoryId, item])).values()];
    this.changeSelect('', '');
  }

  changeFilterAmc() {
    (this.amcObj.length == 0) ? this.showError = null : (this.amcObj.length == 1 && !this.amcObj[0].selected) ? this.showError = 'amc' : this.showError = null;
    const filterData = [];
    const filterData2 = this._data.mfData.mutualFundList;
    let filterData1 = [];
    const filterData3 = [];
    const filterData4 = [];
    let famMap = {};
    let whichFilterAmc = this.whichFilter;
    let selectedFamilyMapObj = this.selectedFamilyMap
    let selectedAmcMapObj = {};
    let amcCheck = this.checkFlag;
    let famCheck = this.familyChecked;
    this.checkFlag = true;
    this.amc.filter(function (element) {
      if (element.selected == true) {

        element.showInFilter = true;
        filterData2.forEach(amc => {
          if((famCheck &&  amcCheck) && whichFilterAmc == 'amc'){
            famMap=  amc.familyMemberId ;
          }else{
            (Object.keys(selectedFamilyMapObj).length > 0) ? famMap = selectedFamilyMapObj[element.familyMemberId] : famMap = amc.familyMemberId;
          }
          // amc.mutualFund.forEach(mf => {
          if (element.amc_id == amc.amcId && famMap== amc.familyMemberId) {
            selectedAmcMapObj[element.amc_id] = element.amc_id;

            const obj = {
              amc_name: amc.amcName,
              schemeName: amc.schemeName,
              schemeCode: amc.schemeCode,
              mutualFund: amc.mutualFund,
              id: amc.schemeId,
              amc_id: amc.amcId,
              selected: true,
              showInFilter: true,
              familyMemberId:amc.familyMemberId

            };

            const obj1 = {
              name: amc.ownerName,
              familyMemberId: amc.familyMemberId,
              selected: true,
              showInFilter: true

            };
            const obj4 = {
              folioNumber: amc.folioNumber,
              selected: true,
              showInFilter: true,
              familyMemberId:amc.familyMemberId,
              amc_id: amc.amcId,
              id: amc.schemeId,
            };
            const obj2 = {
              category: amc.categoryName,
              categoryId: amc.categoryId,
              selected: true,
              showInFilter: true,
              familyMemberId:amc.familyMemberId,
              amc_id: amc.amcId,
              id: amc.schemeId,
              folioNumber: amc.folioNumber,

            };
            filterData.push(obj);
            filterData1.push(obj1);
            filterData3.push(obj2);
            filterData4.push(obj4);
          }
        });
      } else {
        element.showInFilter = false;
      }
    });
    this.selectedAmcMap = selectedAmcMapObj;
    filterData1 = [...new Map(filterData1.map(item => [item.familyMemberId, item])).values()];


    this.FilterAmcOnlySelcted(filterData1, this.familyMember, 'familyMemberId', 'familyMemberId');
    // const tempFam = [];
    // tempFam.push(...this.familyMember);
    // this.familyMember = tempFam;
    this.scheme = [...new Map(filterData.map(item => [item.id, item])).values()];
    this.folio = [...new Map(filterData4.map(item => [item.folioNumber, item])).values()];
    this.category = [...new Map(filterData3.map(item => [item.categoryId, item])).values()];
    this.changeSelect('', '');
  }

  changeFilterCategory(data) {
    (this.categoryObj.length == 0) ? this.showError = null : (this.categoryObj.length == 1 && !this.categoryObj[0].selected) ? this.showError = 'category' : this.showError = null;
    const filterData = this._data.mfData.mutualFundList;
    // filterData = filterData.filter((item: any) =>
    //   (item.currentValue != 0 && item.currentValue > 0)
    // );
    let filterData1 = [];
    let filterData2 = [];
    let filterData3 = [];
    let filterData4 = [];
    this.checkFlag = true;
    let catCheck = this.checkFlag;
    let famCheck = this.familyChecked;
    let amcCheck = this.amcChecked;
    let schemeCheck = this.schemeChecked;
    let folioCheck = this.folioChecked;
    let famMap ={};
    let amcMAp = {};
    let schemeMap = {};
    let folioMap = {};
    let whichFilterAmc = this.whichFilter;
    let selectedFamilyMapObj = this.selectedFamilyMap;
    let selectedAmcMapObj = this.selectedAmcMap;
    let selectedSchemeMapObj = this.selectedSchemeMap;
    let selectedFolioMapObj = this.selectedFolioMap;

    data.filter(function (element) {
      if (element.selected == true) {
        element.showInFilter = true;
        filterData.filter(function (amc) {
          if((famCheck && amcCheck && schemeCheck && folioCheck && catCheck) && whichFilterAmc == 'category'){
            famMap =  amc.familyMemberId ;
            amcMAp =  amc.amcId ;
            schemeMap =  amc.schemeId ;
            folioMap =  amc.folioNumber ;

          }else{
            (Object.keys(selectedFamilyMapObj).length > 0) ? famMap = selectedFamilyMapObj[element.familyMemberId] : famMap = amc.familyMemberId;
            (Object.keys(selectedAmcMapObj).length > 0) ? amcMAp = selectedAmcMapObj[element.amc_id] : amcMAp = amc.amcId;
            (Object.keys(selectedSchemeMapObj).length > 0) ? schemeMap = selectedSchemeMapObj[element.id] : schemeMap = amc.schemeId;
            (Object.keys(selectedFolioMapObj).length > 0) ? folioMap = selectedFolioMapObj[element.folioNumber] : folioMap = amc.folioNumber;
          }

         

          if (amc.categoryId == element.categoryId && famMap == amc.familyMemberId && amcMAp == amc.amcId && schemeMap == amc.schemeId &&  folioMap == amc.folioNumber) {
            const obj = {
              amc_name: amc.amcName,
              schemeName: amc.schemeName,
              schemeCode: amc.schemeCode,
              mutualFund: amc.mutualFund,
              id: amc.schemeId,
              amc_id: amc.amcId,
              selected: true,
              showInFilter: true,
              familyMemberId:amc.familyMemberId,


            };
            const obj4 = {
              amc_name: amc.amcName,
              schemeName: amc.schemeName,
              schemeCode: amc.schemeCode,
              mutualFund: amc.mutualFund,
              id: amc.schemeId,
              amc_id: amc.amcId,
              selected: true,
              showInFilter: true,
              familyMemberId:amc.familyMemberId,


            };
            const obj2 = {
              folioNumber: amc.folioNumber,
              selected: true,
              showInFilter: true,
              familyMemberId:amc.familyMemberId,
              amc_id: amc.amcId,
              id: amc.schemeId,
            };
            const obj3 = {
              name: amc.ownerName,
              familyMemberId: amc.familyMemberId,
              selected: true,
              showInFilter: true
            };
            filterData1.push(obj);
            filterData2.push(obj2);
            filterData3.push(obj3);
            filterData4.push(obj4);
          }
          // });
        });
      } else {
        element.showInFilter = false;
      }
    });
    // let filterFamData = filterData3;
    // this.familyMember.forEach(element => {
    //   if (element.selected == true) {
    //     filterFamData = filterFamData.filter(item => item.familyMemberId === element.familyMemberId);
    //   }
    // });
    filterData3 = [...new Map(filterData3.map(item => [item.familyMemberId, item])).values()];
    filterData1 = [...new Map(filterData1.map(item => [item.amc_id, item])).values()];
    filterData4 = [...new Map(filterData4.map(item => [item.id, item])).values()];
    filterData2 = [...new Map(filterData2.map(item => [item.folioNumber, item])).values()];

    this.FilterAmcOnlySelcted(filterData3, this.familyMember, 'familyMemberId', 'familyMemberId');
    this.FilterAmcOnlySelcted(filterData1, this.amc, 'amc_id', 'amc_id');
    this.FilterAmcOnlySelcted(filterData4, this.scheme, 'id', 'id');
    this.FilterAmcOnlySelcted(filterData2, this.folio, 'folioNumber', 'folioNumber');

    // this.scheme = [...new Map(filterData1.map(item => [item.id, item])).values()];
    // this.amc = [...new Map(filterData1.map(item => [item.amc_id, item])).values()];
    // this.folio = [...new Map(filterData2.map(item => [item.folioNumber, item])).values()];
    // this.familyMember = [...new Map(filterFamData.map(item => [item.familyMemberId, item])).values()];
    this.changeSelect('', '');
  }

  changeFilterFolio() {
    (this.folioObj.length == 0) ? this.showError = null : (this.folioObj.length == 1 && !this.folioObj[0].selected) ? this.showError = 'folio' : this.showError = null;
    let filterData = [];
    const filterData2 = this._data.mfData.mutualFundList;
    let filterData1 = [];
    let filterData3 = [];
    let filterData4 = [];
    this.checkFlag = true;
    let famMap ={};
    let amcMAp ={};
    let schemeMap ={};
    let folioCheck = this.checkFlag;
    let famCheck = this.familyChecked;
    let amcCheck = this.amcChecked;
    let schemeCheck = this.schemeChecked;

    let whichFilterAmc = this.whichFilter;
    let selectedFamilyMapObj = this.selectedFamilyMap;
    let selectedAmcMapObj = this.selectedAmcMap;
    let selectedSchemeMapObj = this.selectedSchemeMap;
    let selectedFolioMapObj={};
    this.folio.filter(function (element) {
      if (element.selected == true) {
        element.showInFilter = true;
        filterData2.forEach(amc => {
          if((famCheck &&  amcCheck && schemeCheck && folioCheck) && whichFilterAmc == 'folio'){
            famMap =  amc.familyMemberId ;
            amcMAp =  amc.amcId ;
            schemeMap =  amc.schemeId ;
          }else{
            (Object.keys(selectedFamilyMapObj).length > 0) ? famMap = selectedFamilyMapObj[element.familyMemberId] : famMap = amc.familyMemberId;
            (Object.keys(selectedAmcMapObj).length > 0) ? amcMAp = selectedAmcMapObj[element.amc_id] : amcMAp = amc.amcId;
            (Object.keys(selectedSchemeMapObj).length > 0) ? schemeMap = selectedSchemeMapObj[element.id] : schemeMap = amc.schemeId;
          }
          // amc.mutualFund.forEach(mf => {
            
          if (element.folioNumber == amc.folioNumber && famMap == amc.familyMemberId &&  amcMAp == amc.amcId && schemeMap == amc.schemeId) {
            selectedFolioMapObj[element.folioNumber] = element.folioNumber;
            const obj = {
              amc_name: amc.amcName,
              schemeName: amc.schemeName,
              schemeCode: amc.schemeCode,
              mutualFund: amc.mutualFund,
              id: amc.schemeId,
              familyMemberId:amc.familyMemberId,
              amc_id: amc.amcId,
              selected: true,
              showInFilter: true

            };
            const obj3 = {
              amc_name: amc.amcName,
              schemeName: amc.schemeName,
              schemeCode: amc.schemeCode,
              mutualFund: amc.mutualFund,
              id: amc.schemeId,
              amc_id: amc.amcId,
              selected: true,
              showInFilter: true,
              familyMemberId:amc.familyMemberId,


            };
            const obj1 = {
              name: amc.ownerName,
              familyMemberId: amc.familyMemberId,
              selected: true, showInFilter: true
            };

            const obj2 = {
              category: amc.categoryName,
              categoryId: amc.categoryId,
              selected: true, showInFilter: true, familyMemberId:amc.familyMemberId,
              amc_id: amc.amcId,
              id: amc.schemeId,
              folioNumber: amc.folioNumber,
            };
            filterData.push(obj);
            filterData4.push(obj3);
            filterData1.push(obj1);
            filterData3.push(obj2);
          }
          // });
        });
      } else {
        element.showInFilter = false;
      }
    });
    this.selectedFolioMap = selectedFolioMapObj;
    // let filterFamData = filterData1;
    // filterFamData = [...new Map(filterFamData.map(item => [item.familyMemberId, item])).values()];
    // this.familyMember.forEach(element => {
    //   if (element.selected == true) {
    //     filterFamData = filterFamData.filter(item => item.familyMemberId === element.familyMemberId);
    //   }
    // });
    filterData1 = [...new Map(filterData1.map(item => [item.familyMemberId, item])).values()];
    filterData = [...new Map(filterData.map(item => [item.amc_id, item])).values()];
    filterData4 = [...new Map(filterData4.map(item => [item.id, item])).values()];

    this.FilterAmcOnlySelcted(filterData1, this.familyMember, 'familyMemberId', 'familyMemberId');
    this.FilterAmcOnlySelcted(filterData, this.amc, 'amc_id', 'amc_id');
    this.FilterAmcOnlySelcted(filterData4, this.scheme, 'id', 'id');

    // this.category = this.matchDataFunction(filterData3,this.category,'categoryId','categoryId');
    // this.scheme = [...new Map(filterData.map(item => [item.id, item])).values()];
    // this.amc = [...new Map(filterData.map(item => [item.amc_id, item])).values()];
    // this.familyMember = [...new Map(filterFamData.map(item => [item.familyMemberId, item])).values()];
    this.category = [...new Map(filterData3.map(item => [item.categoryId, item])).values()];
    console.log(this.amc);
    this.changeSelect('', '');
  }


  FilterAmcOnlySelcted(filterData, orgData, filterId, orgId) {
    orgData.forEach(item => item.selected = false);

    if (filterData.length > 0) {
      if (orgData.length > 0) {
        filterData.forEach(element => {
          orgData.forEach(item => {
            if (item[filterId] == element[orgId] && item.showInFilter) {
              item.selected = true;
            }
          });
        });
      }
    }
    // orgData = [...new Map(orgData.map(item => [item[orgId], item])).values()];
    // return orgData;
  }

  matchDataFunction(filterData, orgData, filterId, orgId) {
    let newARr = [];
    if (orgData.length > 0) {

      filterData.forEach(element => {
        orgData.forEach(item => {
          if (item[orgId] === element[filterId]) {
            newARr.push(element);
          }
        });
        // newARr =orgData.filter(item => item[orgId] === element[filterId]);
      });
    } else {
      newARr = filterData;
    }


    newARr = [...new Map(newARr.map(item => [item[orgId], item])).values()];

    return newARr;
  }

  changeFilterScheme() {
    (this.schemeObj.length == 0) ? this.showError = null : (this.schemeObj.length == 1 && !this.schemeObj[0].selected) ? this.showError = 'scheme' : this.showError = null;
    let filterData = [];
    const filterData2 = this._data.mfData.mutualFundList;
    let filterData1 = [];
    const filterData3 = [];
    let filterData4 = [];
    this.checkFlag = true;
    let famMap ={};
    let amcMAp ={};
    let schemeCheck = this.checkFlag;
    let famCheck = this.familyChecked;
    let amcCheck = this.amcChecked;
        let whichFilterAmc = this.whichFilter;
    let selectedFamilyMapObj = this.selectedFamilyMap;
    let selectedAmcMapObj =this.selectedAmcMap;
    let selectedSchemeMapObj ={}
    this.scheme.filter(function (element) {
      if (element.selected == true) {
        element.showInFilter = true;
        filterData2.forEach(amc => {
          if((famCheck &&  amcCheck && schemeCheck) && whichFilterAmc == 'scheme'){
            famMap =  amc.familyMemberId ;
            amcMAp =  amc.amcId ;
          }else{
            (Object.keys(selectedFamilyMapObj).length > 0) ? famMap = selectedFamilyMapObj[element.familyMemberId] : famMap = amc.familyMemberId;
            (Object.keys(selectedAmcMapObj).length > 0) ? amcMAp = selectedAmcMapObj[element.amc_id] : amcMAp = amc.amcId;
          }
          // amc.mutualFund.forEach(mf => {
        
          if (element.id == amc.schemeId && famMap == amc.familyMemberId &&  amcMAp == amc.amcId) {
            selectedSchemeMapObj[element.id] = element.id;

            const obj = {
              amc_name: amc.amcName,
              schemeName: amc.schemeName,
              schemeCode: amc.schemeCode,
              mutualFund: amc.mutualFund,
              id: amc.schemeId,
              amc_id: amc.amcId,
              selected: true, showInFilter: true,
              familyMemberId:amc.familyMemberId

            };
            const obj1 = {
              name: amc.ownerName,
              familyMemberId: amc.familyMemberId,
              selected: true, showInFilter: true,
              amc_id: amc.amcId,
              id: amc.schemeId,
            };
            const obj4 = {
              folioNumber: amc.folioNumber,
              selected: true, showInFilter: true,
              familyMemberId:amc.familyMemberId,
              amc_id: amc.amcId,
              id: amc.schemeId,
            };
            const obj2 = {
              category: amc.categoryName,
              categoryId: amc.categoryId,
              selected: true, showInFilter: true,
              familyMemberId:amc.familyMemberId,
              amc_id: amc.amcId,
              id: amc.schemeId,
            };
            filterData.push(obj);
            filterData1.push(obj1);
            filterData3.push(obj2);
            filterData4.push(obj4);
          }
          // });
        });
      } else {
        element.showInFilter = false;
      }
    });
    // let filterFamData = filterData1;
    // filterFamData = [...new Map(filterFamData.map(item => [item.familyMemberId, item])).values()];
    // this.familyMember.forEach(element => {
    //   if (element.selected == true) {
    //     filterFamData = filterFamData.filter(item => item.familyMemberId === element.familyMemberId);
    //   }
    // });
    this.selectedSchemeMap = selectedSchemeMapObj;
    filterData1 = [...new Map(filterData1.map(item => [item.familyMemberId, item])).values()];

    filterData = [...new Map(filterData.map(item => [item.amc_id, item])).values()];

    this.FilterAmcOnlySelcted(filterData1, this.familyMember, 'familyMemberId', 'familyMemberId');
    console.log(' this.amc pre : ', this.amc);
    this.FilterAmcOnlySelcted(filterData, this.amc, 'amc_id', 'amc_id');
    console.log(' this.amc : ', this.amc);
    // this.folio = this.matchDataFunction(filterData4,this.folio,'folioNumber','folioNumber');
    // this.category = this.matchDataFunction(filterData3,this.category,'categoryId','categoryId');
    // this.amc = [...new Map(filterData.map(item => [item.amc_id, item])).values()];
    // this.familyMember = [...new Map(filterFamData.map(item => [item.familyMemberId, item])).values()];
    this.folio = [...new Map(filterData4.map(item => [item.folioNumber, item])).values()];
    this.category = [...new Map(filterData3.map(item => [item.categoryId, item])).values()];

    this.changeSelect('', '');
  }

  changeReportFilter(value) {
    this.reportType.forEach(element => {
      if (element.name != value.name) {
        element.selected = false;
      }
    });
    this.changeSelect('', '');
  }

  changeFormatFilter(value) {
    (this.reportFormatObj.length == 0) ? this.showError = null : (this.reportFormatObj.length == 1 && !this.reportFormatObj[0].selected) ? this.showError = 'report format' : this.showError = null;
    this.reportFormat.forEach(element => {
      if (element.name != value.name) {
        element.selected = false;
      }
    });
    this.changeSelect('', '');
  }

  changeFinancialYear(value) {
    value.selected = true;
    (this.financialYearsObj.length == 0) ? this.showError = null : (this.financialYearsObj.length == 1 && !this.financialYearsObj[0].selected) ? this.showError = 'financial year' : this.showError = null;
    if (value.from <= 2017) {
      this.showGrandfathering = false;
      this.summaryFilerForm.get('grandfathering').setValue('2');
    } else {
      this.showGrandfathering = true;
      this.summaryFilerForm.get('grandfathering').setValue('1');
    }
    this.financialYears.forEach(element => {
      if (element.from != value.from) {
        element.selected = false;
      }
    });
    this.changeSelect('', '');
  }

  saveFilterCall() {
    const ReportFilterConfigModel = [];
    let reportId;
    switch (this._data.name) {
      case 'Overview Report':
        reportId = 1;
        break;
      case 'SUMMARY REPORT':
        reportId = 2;
        break;
      case 'ALL TRANSACTION REPORT':
        reportId = 3;
        break;
      case 'UNREALIZED TRANSACTION REPORT':
        reportId = 4;
        break;
    }
    const trnOrder = [];
    if (this._data.name == 'Overview Report') {
      this.overviewFilter.forEach((element, ind) => {
        const obj = {
          advisorId: this.advisorId,
          clientId: (this.saveFilters[0].selected == true) ? this.clientId : 0,
          transactionOrder: ind,
          columnName: element.name,
          selected: element.selected,
          reportType: (this.reportTypeobj.length > 0) ? this.reportTypeobj[0].name : 'Sub Category wise',
          transactionReportType: (this._data.name == 'UNREALIZED TRANSACTION REPORT') ? 'Unrealized report' : (this._data.name == 'ALL TRANSACTION REPORT') ? 'Transaction report' : '-',
          showZeroFolios: (this.summaryFilerForm.controls.showFolios.value == '1') ? 'true' : 'false',
          reportId,
        };
        ReportFilterConfigModel.push(obj);
      });
    } else {
      this.transactionView.forEach((element, ind) => {
        const obj = {
          advisorId: this.advisorId,
          clientId: (this.saveFilters[0].selected == true) ? this.clientId : 0,
          transactionOrder: ind,
          columnName: element.displayName,
          selected: element.selected,
          reportType: (this.reportTypeobj.length > 0) ? this.reportTypeobj[0].name : 'Sub Category wise',
          transactionReportType: (this._data.name == 'UNREALIZED TRANSACTION REPORT') ? 'Unrealized report' : (this._data.name == 'ALL TRANSACTION REPORT') ? 'Transaction report' : '-',
          showZeroFolios: (this.summaryFilerForm.controls.showFolios.value == '1') ? 'true' : 'false',
          reportId,
        };
        ReportFilterConfigModel.push(obj);
      });
    }

    const obj = {
      ReportFilterConfigModel
    };
    this.custumService.AddSaveFilters(obj).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  changeSaveFilterSelection(value) {
    this.saveFilters.forEach(element => {
      if (element.value != value.value) {
        element.selected = false;
      }
    });
    if (this.saveFilters[0].selected == true || this.saveFilters[1].selected == true) {
      this.saveFilterCall();
    }
  }

  changeSelect = function (data, i) {
    this.sendTransactionView = this._data.transactionView;
    if (this._data.name == 'Overview Report') {
      if (this.overviewFilter != undefined) {
        this.overviewFilterCount = 0;
        this.overviewFilter.forEach(item => {
          if (item.selected) {
            this.overviewFilterCount++;
          }
        });
      }
    } else {
      if (data.selected == true) {
        this.sendTransactionView.push(i);
      } else if (data.selected == false) {
        this.sendTransactionView.splice(i, 1);
      }
      console.log('data ==', this.sendTransactionView);
    }
    if (this.familyMember != undefined) {
      const filter = [];
      this.countFamily = 0;
      this.familyMember.forEach(item => {
        if ((this.whichFilter == 'family') ? item.selected : item.showInFilter && item.selected) {
          item.selected = true;
          this.countFamily++;
          filter.push(item);
        } else if (this.whichFilter != 'family') {
          item.selected = false;
        }
      });
      this.familyMemObj = filter;
    }
    if (this.amc != undefined) {
      const filter = [];
      this.countAmc = 0;
      this.amc.forEach(item => {
        if ((this.whichFilter == 'amc') ? item.selected : item.showInFilter && item.selected) {
          item.selected = true;
          this.countAmc++;
          filter.push(item);
        } else {
          (this.whichFilter != 'amc') ? item.selected = false : '';
        }
      });
      this.amcObj = filter;
    }
    if (this.scheme != undefined) {
      const filter = [];
      this.countScheme = 0;
      this.scheme.forEach(item => {
        if ((this.whichFilter == 'scheme') ? item.selected : item.showInFilter && item.selected) {
          item.selected = true;
          this.countScheme++;
          filter.push(item);
        } else {
          (this.whichFilter != 'scheme') ? item.selected = false : '';
        }
      });
      this.schemeObj = filter;
    }
    if (this.folio != undefined) {
      const filter = [];
      this.countFolio = 0;
      this.folio.forEach(item => {
        if ((this.whichFilter == 'folio') ? item.selected : item.showInFilter && item.selected) {
          item.selected = true;
          this.countFolio++;
          filter.push(item);
        } else {
          (this.whichFilter != 'folio') ? item.selected = false : '';
        }
      });
      this.folioObj = filter;
    }
    if (this.transactionView != undefined) {
      if (data != '') {
        (this.transactionView.length == 0) ? this.showError = null : (this.transactionView.length == 1 && !this.transactionView[0].selected) ? this.showError = 'transaction view' : this.showError = null;
      }
      this.countTranView = 0;
      this.transactionView.forEach(item => {
        if (item.selected) {
          this.countTranView++;
        }
      });

    }
    if (this.category != undefined) {
      const filter = [];
      this.countCategory = 0;
      this.category.forEach(item => {
        if ((this.whichFilter == 'category') ? item.selected : item.showInFilter && item.selected) {
          item.selected = true;
          this.countCategory++;
          filter.push(item);
        } else {
          (this.whichFilter != 'category') ? item.selected = false : '';
        }
      });
      this.categoryObj = filter;
    }
    if (this.reportType != undefined) {
      const filter = [];
      this.reportType.forEach(item => {
        if (item.selected) {
          filter.push(item);
        }
      });
      this.reportTypeobj = filter;
    }
    if (this.reportFormat != undefined) {
      const filter = [];
      this.reportFormat.forEach(item => {
        if (item.selected) {
          filter.push(item);
        }
      });
      this.reportFormatObj = filter;
    }
    if (this.financialYears != undefined) {
      const filter = [];
      this.financialYears.forEach(item => {
        if (item.selected) {
          filter.push(item);
        }
      });
      this.financialYearsObj = filter;
    }

    if (this._data.name == 'Overview Report') {
      let array = [];
      array = this.overviewFilter.filter(item => item.selected == false);
      if (array.length == this.overviewFilter.length) {
        this.showError = 'filter view';
      }
    }
  };

  selectAll(value, filter) {

    this.whichFilter = filter;

    if (value.checked) {
      this.checkFlag = true;
      this.uncheckFlag = false;
      // this.selectUnselctAllFlag = value.checked;
      this.familyMember.forEach(item => item.selected = true);
      this.amc.forEach(item => item.selected = true);
      this.scheme.forEach(item => item.selected = true);
      this.folio.forEach(item => item.selected = true);
      // this.transactionView.forEach(item => item.selected = true);
      this.category.forEach(item => item.selected = true);
      this.showError = '';

    } else {
      this.uncheckFlag = true;
      this.checkFlag = false;
      this.familyMember.forEach(item => item.selected = false);
      this.amc.forEach(item => item.selected = false);
      this.scheme.forEach(item => item.selected = false);
      this.folio.forEach(item => item.selected = false);
      // this.transactionView.forEach(item => item.selected = false);
      this.category.forEach(item => item.selected = false);
      // this.selectUnselctAllFlag = value.checked;
      this.showError = 'filter';
    }
    switch (this.whichFilter) {
      case 'family':
        this.selectUnselctAllFlagFam = value.checked
        if (value.checked) {
          this.familyChecked=true;
          this.familyMember.forEach(item => item.showInFilter = true);
          this.changeFilterFamily()
        }else{
          this.familyChecked=false;
        }
        break;

      case 'amc':
        this.selectUnselctAllFlagAmc = value.checked
        if (value.checked) {
          this.amcChecked=true;
          this.amc.forEach(item => item.showInFiler = true);
          this.changeFilterAmc()
        }else{
          this.amcChecked=false;
        }
        break;

      case 'scheme':
        this.selectUnselctAllFlagScheme = value.checked
        if (value.checked) {
          this.schemeChecked=true;
          this.scheme.forEach(item => item.showInFiler = true);
          this.changeFilterScheme()
        }else{
          this.schemeChecked=false;
        }
        break;
      case 'folio':
        this.selectUnselctAllFlagFolio = value.checked
        if (value.checked) {
          this.folioChecked=true;
          this.folio.forEach(item => item.showInFiler = true);
          this.changeFilterFolio()
        }else{
          this.folioChecked=false;
        }
        break;
      case 'category':
        this.selectUnselctAllFlagCategory = value.checked
        if (value.checked) {
          this.categoryChecked=true;
          this.category.forEach(item => item.showInFiler = false);
          this.changeFilterCategory(this.category)
        }else{
          this.categoryChecked=false;
        }
        break;

      default:
        break;
    }
    this.changeSelect('', '');
  }

  generateReport() {
    this.barButtonOptions.active = true;
    const todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    if (this.transactionPeriod == false && this._data.name != 'CAPITAL GAIN REPORT') {
      if (this.summaryFilerForm.get('reportAsOn').invalid) {
        this.summaryFilerForm.get('reportAsOn').markAsTouched();
        return;
      }
    }
    this.dataToSend = {
      familyMember: (this.familyMemObj) ? this.familyMemObj : this.familyMember,
      amc: (this.amcObj) ? this.amcObj : this.amc,
      scheme: (this.schemeObj) ? this.schemeObj : this.scheme,
      folio: (this.folioObj) ? this.folioObj : this.folio,
      category: (this.categoryObj) ? this.categoryObj : this.category,
      reportType: (this.reportTypeobj) ? this.reportTypeobj : this.reportType,
      reportFormat: (this.reportFormatObj) ? this.reportFormatObj : this.reportFormat,
      financialYear: (this.financialYears) ? this.financialYearsObj : this.financialYears,
      overviewFilter: this.overviewFilter,
      transactionView: this.transactionView,
      reportAsOn: (this.summaryFilerForm.controls.reportAsOn.value) ? this.datePipe.transform(this.summaryFilerForm.controls.reportAsOn.value, 'yyyy-MM-dd') : new Date(),
      fromDate: this.datePipe.transform(this.summaryFilerForm.controls.fromDate.value, 'yyyy-MM-dd'),
      toDate: this.datePipe.transform(this.summaryFilerForm.controls.toDate.value, 'yyyy-MM-dd'),
      showFolio: parseInt(this.summaryFilerForm.controls.showFolios.value),
      grandfathering: parseInt(this.summaryFilerForm.controls.grandfathering.value),
      capitalGainData: this._data.capitalGainData,
      name: this._data.name,
      transactionPeriodCheck: this.transactionPeriodCheck,
      transactionPeriod: this.transactionPeriod,
      transactionType: this.transactionType
    };
    console.log('dataToSend---------->', this.dataToSend);

    this.finalFilterData = this.mfService.filterFinalData(this._data.mfData, this.dataToSend);
    this.finalFilterData.transactionView = this.transactionView;
    console.log('this.sendTransactionView ====', this.finalFilterData);
    console.log(this.finalFilterData);

    if (this._data.name != 'CAPITAL GAIN REPORT') {
      this.obj = {
        advisorId: this.advisorId,
        clientId: this.clientId,
        toDate: (this.finalFilterData.reportAsOn) ? JSON.stringify(this.finalFilterData.reportAsOn) : JSON.stringify(this.finalFilterData.toDate),
        id: this.finalFilterData.categoryWiseMfList
      };
      if (this._data.name == 'Overview Report') {
        this.obj.toDate = todayDate;
      }
      this.custumService.getMutualFund(this.obj).subscribe(
        data => {
          console.log(data);
          this.barButtonOptions.active = false;
          this.finalFilterData.mfData = data;
          this.Close(this.finalFilterData);
        }
      );
    } else {
      this.barButtonOptions.active = false;
      this.Close(this.finalFilterData);
    }

  }


  Close(data) {
    this.subInjectService.changeNewRightSliderState({state: 'close', data});
  }
}
