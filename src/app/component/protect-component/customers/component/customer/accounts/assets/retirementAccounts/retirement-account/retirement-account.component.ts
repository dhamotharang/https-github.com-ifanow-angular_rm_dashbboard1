import { AddEPSComponent } from './../add-eps/add-eps.component';
import { AddSuperannuationComponent } from './../add-superannuation/add-superannuation.component';
import { AddGratuityComponent } from './../add-gratuity/add-gratuity.component';
import { NpsSummaryPortfolioComponent } from './../add-nps/nps-summary-portfolio/nps-summary-portfolio.component';
import { AddEPFComponent } from './../add-epf/add-epf.component';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { CustomerService } from '../../../../customer.service';
import { EventService } from 'src/app/Data-service/event.service';
import { UtilService } from 'src/app/services/util.service';
import { AuthService } from 'src/app/auth-service/authService';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/component/protect-component/common-component/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatSort, MatBottomSheet } from '@angular/material';
import { NpsSchemeHoldingComponent } from '../add-nps/nps-scheme-holding/nps-scheme-holding.component';
import { DetailedViewEPFComponent } from '../add-epf/detailed-view-epf/detailed-view-epf.component';
import { DetailedViewEPSComponent } from '../add-eps/detailed-view-eps/detailed-view-eps.component';
import { DetailedViewGratuityComponent } from '../add-gratuity/detailed-view-gratuity/detailed-view-gratuity.component';
import { DetaildedViewSuperannuationComponent } from '../add-superannuation/detailded-view-superannuation/detailded-view-superannuation.component';
import { FormatNumberDirective } from 'src/app/format-number.directive';
import { ExcelService } from '../../../../excel.service';
import { DetailedViewNpsComponent } from '../add-nps/detailed-view-nps/detailed-view-nps.component';
import { ExcelGenService } from 'src/app/services/excel-gen.service';
import { PdfGenService } from 'src/app/services/pdf-gen.service';
import { DatailedViewNpsHoldingsComponent } from '../add-nps/datailed-view-nps-holdings/datailed-view-nps-holdings.component';
import { FileUploadServiceService } from '../../file-upload-service.service';
import { BottomSheetComponent } from '../../../../../common-component/bottom-sheet/bottom-sheet.component';
import { AssetValidationService } from '../../asset-validation.service';
import { RoleService } from 'src/app/auth-service/role.service';
import { CustomerOverviewService } from '../../../../customer-overview/customer-overview.service';


@Component({
  selector: 'app-retirement-account',
  templateUrl: './retirement-account.component.html',
  styleUrls: ['./retirement-account.component.scss']
})
export class RetirementAccountComponent implements OnInit {
  @Output() changeCount = new EventEmitter();
  showRecurring = '1';
  getObject: {};
  advisorId: any;
  clientId: any;
  sumOfcurrentEpfBalance: any;
  sumOfcurrentEpsBalance: any;
  sumOfcurrentValue: any;
  sumOfemployeesMonthlyContribution: any;
  sumOfemployersMonthlyContribution: any;
  sumOfAmountReceived: any;
  sumOfAnnualEmployeeContribution: any;
  sumOfAnnualEmployerContribution: any;
  totalNotionalValue: any;
  totalPensionAmount: any;
  totalContribution: any;
  totalCurrentValue: any;
  data: Array<any> = [{}, {}, {}];
  isLoading = false;
  filterFixedIncome;
  dataSource: any = new MatTableDataSource();
  @ViewChild('tableEl', { static: false }) tableEl;
  @ViewChild('epfListTable', { static: false }) epfListTableSort: MatSort;
  @ViewChild('npsListTable', { static: false }) npsListTableSort: MatSort;
  @ViewChild('gratuityListTable', { static: false }) gratuityListTableSort: MatSort;
  @ViewChild('superAnnuationListTable', { static: false }) superAnnuationListTableSort: MatSort;
  @ViewChild('epsListTable', { static: false }) epsListTableSort: MatSort;
  @ViewChild('EPF', { static: false }) EPF: ElementRef;
  @ViewChild('NPS', { static: false }) NPS: ElementRef;
  @ViewChild('Superannuation', { static: false }) Superannuation: ElementRef;
  @ViewChild('Gratuity', { static: false }) Gratuity: ElementRef;
  @ViewChild('EPS', { static: false }) EPS: ElementRef;
  @ViewChildren(FormatNumberDirective) formatNumber;
  @Output() loaded = new EventEmitter();
  @Input() finPlanObj: any;//finacial plan pdf input
  @ViewChild('EpsTemp', { static: false }) EpsTemp: ElementRef;
  @ViewChild('NpsTemp', { static: false }) NpsTemp: ElementRef;
  @ViewChild('GratuityTemp', { static: false }) GratuityTemp: ElementRef;
  title = 'Excel';
  excelData: any;
  footer = [];
  noData: any;
  fileUploadData: any;
  file: any;
  isLoadingUpload: boolean = false;
  clientData: any;
  myFiles: any;
  epfDatalist: any;
  npsDatalist: any;
  gratuityDatalist: any;
  userInfo: any;
  getOrgData: any;
  reportDate: Date;
  fragmentData = { isSpinner: false };
  returnValue: any;
  retirementAccCapability: any = {};

  // async ExportTOExcel(value) {
  //   this.excelData = []
  //   var data = []
  //   if (value == 'EPS') {
  //     var headerData = [{ width: 20, key: 'Owner' },
  //     { width: 20, key: 'Notional value' },
  //     { width: 25, key: 'Commencement date' },
  //     { width: 25, key: 'Pension amount' },
  //     { width: 18, key: ' Pension payout frequency' },
  //     { width: 15, key: 'Description' },
  //     { width: 10, key: 'Status' },]
  //     var header = ['Owner', 'Notional value', 'Commencement date', 'Pension amount', ' Pension payout frequency', 'Description', 'Status'];
  //     this.dataSource.filteredData.forEach(element => {
  //       data = [element.ownerName, this.formatNumber.first.formatAndRoundOffNumber(element.totalNotionalValue),
  //       new Date(element.commencementDate),
  //       this.formatNumber.first.formatAndRoundOffNumber(element.pensionAmount),
  //       this.formatNumber.first.formatAndRoundOffNumber(element.pensionPayoutFrequencyId),
  //       element.description, element.status]
  //       this.excelData.push(Object.assign(data))
  //     });
  //     var footerData = ['Total',
  //       this.formatNumber.first.formatAndRoundOffNumber(this.totalNotionalValue), '',
  //       this.formatNumber.first.formatAndRoundOffNumber(this.totalPensionAmount), '', '', '',]
  //     this.footer.push(Object.assign(footerData))
  //   } else if (value == 'Gratuity') {
  //     var headerData = [
  //       { width: 20, key: 'Owner' },
  //       { width: 20, key: 'Name of the organization' },
  //       { width: 25, key: 'Number of completed years' },
  //       { width: 25, key: 'Year of receipt' },
  //       { width: 18, key: 'Amount recieved' },
  //       { width: 18, key: 'Reason of receipt' },
  //       { width: 15, key: 'Description' },
  //       { width: 10, key: 'Status' },
  //     ];
  //     var header = ['Owner', 'Name of the organization', 'Number of completed years',
  //       'Year of receipt', 'Amount recieved', 'Reason of receipt', 'Description', 'Status'];
  //     this.dataSource.filteredData.forEach(element => {
  //       data = [element.ownerName, (element.organizationName),
  //       (element.yearsCompleted), (element.yearReceipt),
  //       this.formatNumber.first.formatAndRoundOffNumber(element.amountReceived),
  //       (element.reasonOfReceipt), element.description, element.status]
  //       this.excelData.push(Object.assign(data))
  //     });
  //     var footerData = ['Total', '', '', '',
  //       this.formatNumber.first.formatAndRoundOffNumber(this.sumOfAmountReceived), '', '', '', '']
  //     this.footer.push(Object.assign(footerData))
  //   } else if (value == 'Superannuation') {
  //     var headerData = [
  //       { width: 20, key: 'Owner' },
  //       { width: 20, key: 'Annual employer contribution' },
  //       { width: 25, key: 'Annual employee contribution' },
  //       { width: 25, key: 'Assumed rate' },
  //       { width: 18, key: 'Growth rate employer contribution' },
  //       { width: 18, key: 'Growth rate employee contribution' },
  //       { width: 18, key: 'Date of first contribution' },
  //       { width: 15, key: 'Description' },
  //       { width: 10, key: 'Status' },
  //     ];
  //     var header = ['Owner', 'Annual employer contribution', 'Annual employee contribution', 'Assumed rate',
  //       'Growth rate employer contribution', 'Growth rate employee contribution',
  //       'Date of first contribution', 'Description', 'Status'];
  //     this.dataSource.filteredData.forEach(element => {
  //       data = [element.ownerName, this.formatNumber.first.formatAndRoundOffNumber(element.annualEmployerContribution),
  //       this.formatNumber.first.formatAndRoundOffNumber(element.annualEmployeeContribution),
  //       this.formatNumber.first.formatAndRoundOffNumber(element.assumedRateOfReturn),
  //       this.formatNumber.first.formatAndRoundOffNumber(element.growthRateEmployerContribution),
  //       this.formatNumber.first.formatAndRoundOffNumber(element.growthRateEmployeeContribution),
  //       new Date(element.firstContributionDate), element.maturityYear, element.description, element.status]
  //       this.excelData.push(Object.assign(data))
  //     });
  //     var footerData = ['Total', this.formatNumber.first.formatAndRoundOffNumber(this.sumOfAnnualEmployeeContribution),
  //       this.formatNumber.first.formatAndRoundOffNumber(this.sumOfAnnualEmployerContribution), '', '', '', '', '', '']
  //   } else if (value == 'EPF') {
  //     var headerData = [
  //       { width: 20, key: 'Owner' },
  //       { width: 20, key: 'Current value' },
  //       { width: 25, key: 'Employee’s contribution' },
  //       { width: 25, key: 'Employer’s contribution' },
  //       { width: 18, key: 'Rate of return' },
  //       { width: 18, key: 'Balance mentioned' },
  //       { width: 20, key: 'Balance as on' },
  //       { width: 15, key: 'Maturity year' },
  //       { width: 15, key: 'Description' },
  //       { width: 10, key: 'Status' },
  //     ];
  //     var header = ['Owner', 'Current value', 'Employee’s contribution', 'Employer’s contribution',
  //       'Rate of return', 'Balance mentioned', 'Balance as on', 'Maturity year', 'Description', 'Status'];
  //     this.dataSource.filteredData.forEach(element => {
  //       data = [element.ownerName, (element.currentValue == undefined) ? 0 : this.formatNumber.first.formatAndRoundOffNumber(element.currentValue),
  //       (element.employeesMonthlyContribution == undefined) ? 0 : this.formatNumber.first.formatAndRoundOffNumber(element.employeesMonthlyContribution),
  //       (element.employersMonthlyContribution == undefined) ? 0 : this.formatNumber.first.formatAndRoundOffNumber(element.employersMonthlyContribution),
  //       (element.rateOfReturn == undefined) ? 0 : this.formatNumber.first.formatAndRoundOffNumber(element.rateOfReturn),
  //       this.formatNumber.first.formatAndRoundOffNumber(element.currentEpfBalance),
  //       new Date(element.balanceAsOnDate), element.maturityYear, element.description, element.status]
  //       this.excelData.push(Object.assign(data))
  //     });
  //     var footerData = ['Total', this.formatNumber.first.formatAndRoundOffNumber(this.sumOfcurrentValue),
  //       this.formatNumber.first.formatAndRoundOffNumber(this.sumOfemployersMonthlyContribution),
  //       this.formatNumber.first.formatAndRoundOffNumber(this.sumOfemployeesMonthlyContribution), '',
  //       this.formatNumber.first.formatAndRoundOffNumber(this.sumOfcurrentEpfBalance), '', '', '', '']
  //     this.footer.push(Object.assign(footerData))

  //   } else {
  //     var headerData = [{ width: 20, key: 'Owner' },
  //     { width: 20, key: 'Current value' },
  //     { width: 25, key: 'Total contribution' },
  //     { width: 18, key: 'Scheme choice' },
  //     { width: 18, key: 'PRAN' },
  //     { width: 15, key: 'Description' },
  //     { width: 10, key: 'Status' },]
  //     var header = ['Owner', 'Current value', 'Total contribution', 'Scheme choice', 'PRAN', 'Description', 'Status'];
  //     this.dataSource.filteredData.forEach(element => {
  //       data = [element.ownerName, this.formatNumber.first.formatAndRoundOffNumber(element.currentValuation),
  //       this.formatNumber.first.formatAndRoundOffNumber(element.contributionAmount), (element.schemeChoice), (element.pran),
  //       element.description, element.status]
  //       this.excelData.push(Object.assign(data))
  //     });
  //     var footerData = ['Total', this.formatNumber.first.formatAndRoundOffNumber(this.totalCurrentValue),
  //       this.formatNumber.first.formatAndRoundOffNumber(this.totalContribution), '', '', '', '']
  //     this.footer.push(Object.assign(footerData))

  //   }
  //   ExcelService.exportExcel(headerData, header, this.excelData, this.footer, value)
  // }
  constructor(private ref: ChangeDetectorRef, private excel: ExcelGenService, private pdfGen: PdfGenService,
    private subInjectService: SubscriptionInject,
    private fileUpload: FileUploadServiceService,
    private custumService: CustomerService, private eventService: EventService,
    public utils: UtilService, public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private assetValidation: AssetValidationService,
    public roleService: RoleService,
    private customerOverview: CustomerOverviewService) {
    this.clientData = AuthService.getClientData()
  }

  displayedColumns11 = ['no', 'owner', 'cvalue', 'bal', 'emp', 'employer', 'vol', 'rate', 'desc', 'status', 'icons'];
  datasource11;
  displayedColumns12 = ['no', 'owner', 'cvalue', 'total', 'scheme', 'pran', 'desc', 'status', 'icons'];
  datasource12;
  displayedColumns13 = ['no', 'owner', 'name', 'joint', 'number', 'amt', 'salary', 'desc', 'status', 'icons'];
  datasource13;
  displayedColumns14 = ['no', 'owner', 'aemp', 'aempe', 'rate', 'date', 'desc', 'status', 'icons'];
  datasource14;
  displayedColumns15 = ['no', 'owner', 'nvalue', 'date', 'amt', 'pay', 'desc', 'status', 'icons'];
  datasource15;
  displayedColumns16 = ['no', 'owner', 'cvalue', 'rate', 'amt', 'number', 'mdate', 'desc', 'status', 'icons'];
  datasource16;
  // isLoading = true;
  ngOnInit() {
    this.retirementAccCapability = this.roleService.portfolioPermission.subModule.assets.subModule.realEstate.capabilityList
    this.reportDate = new Date();
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
    this.clientData = AuthService.getClientData()
    this.userInfo = AuthService.getUserInfo();
    this.getOrgData = AuthService.getOrgDetails();
    this.showRecurring = '1';
    this.isLoading = true;
    this.getObject = {
      clientId: this.clientId,
      advisorId: this.advisorId
    };

    this.noData = "No scheme found";
    if (this.finPlanObj) {
      if (this.finPlanObj.sectionName == 'EPF') {
        this.showRecurring = '1'
        this.getfixedIncomeData(1);
      } else if (this.finPlanObj.sectionName == 'NPS') {
        this.showRecurring = '2'
        this.getfixedIncomeData(2);
      } else {
        this.showRecurring = '3'
        this.getfixedIncomeData(3)
      }
    } else {
      this.getfixedIncomeData(1);
    }
    // this.dataSource = new MatTableDataSource(this.data);
  }

  Excel(tableTitle) {
    let rows = this.tableEl._elementRef.nativeElement.rows;
    this.excel.generateExcel(rows, tableTitle)
  }

  fetchData(value, fileName, element, type) {
    element['subCatTypeId'] = type;
    this.isLoadingUpload = true
    let obj = {
      advisorId: this.advisorId,
      clientId: element.clientId,
      familyMemberId: (element.ownerList[0].isClient == 1) ? 0 : element.ownerList[0].familyMemberId,
      asset: value,
      element: element
    }
    this.myFiles = [];
    for (let i = 0; i < fileName.target.files.length; i++) {
      this.myFiles.push(fileName.target.files[i]);
    }
    const bottomSheetRef = this._bottomSheet.open(BottomSheetComponent, {
      data: this.myFiles,
    });
    this.fileUploadData = this.fileUpload.fetchFileUploadData(obj, this.myFiles);
    if (this.fileUploadData) {
      this.file = fileName
      this.fileUpload.uploadFile(fileName)
    }
    setTimeout(() => {
      this.isLoadingUpload = false
    }, 7000);
  }
  pdf(template, tableTitle) {
    let rows = this.tableEl._elementRef.nativeElement.rows;
    this.fragmentData.isSpinner = true;
    const para = document.getElementById(template);
    const obj = {
      htmlInput: para.innerHTML,
      name: tableTitle,
      landscape: true,
      key: '',
      svg: ''
    };
    let header = null
    this.returnValue = this.utils.htmlToPdf(header, para.innerHTML, tableTitle, false, this.fragmentData, '', '', true);
    console.log('return value ====', this.returnValue);
    return obj;
    //this.pdfGen.generatePdf(rows, tableTitle);
  }
  getfixedIncomeData(value) {
    this.showRecurring = value;
    // this.isLoading = true;
    if (value == '2') {
      if (this.npsDatalist || this.assetValidation.npsDatalist) {
        this.getNPSRes(this.npsDatalist ? this.npsDatalist : this.assetValidation.npsDatalist);
        // this.dataSource.data = this.npsDatalist;
      } else {
        this.dataSource = new MatTableDataSource([{}, {}, {}]);
        this.getListNPS()
      }
    } else if (value == '3') {
      if (this.gratuityDatalist || this.assetValidation.gratuityDatalist) {
        // this.dataSource.data = this.gratuityDatalist;
        this.getGrauityRes(this.gratuityDatalist ? this.gratuityDatalist : this.assetValidation.gratuityDatalist);
      } else {
        this.dataSource = new MatTableDataSource([{}, {}, {}]);
        this.getListGratuity()
      }
    } else if (value == '4') {
      this.dataSource = new MatTableDataSource([{}, {}, {}]);
      this.getListSuperannuation()
    } else if (value == '5') {
      this.dataSource = new MatTableDataSource([{}, {}, {}]);
      this.getListEPS()
    } else {
      if (this.epfDatalist || this.assetValidation.epfDatalist) {
        // this.dataSource.data = this.epfDatalist;
        this.getEPFRes(this.epfDatalist ? this.epfDatalist : this.assetValidation.epfDatalist);
      } else {
        this.getListEPF();
        this.dataSource = new MatTableDataSource(this.data);
      }
    }
  }

  openRetirement(value, state, data) {
    const fragmentData = {
      flag: value,
      data,
      id: 1,
      state
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        if (value == 'added') {
          this.getListEPF();
        } else if (value == 'addedGratuity') {
          this.getListGratuity();
        } else if (value == 'addedEps') {
          this.getListEPS();
        } else if (value == 'addedSuperannuation') {
          this.getListSuperannuation();
        } else {
          this.getListNPS();
        }
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isRefreshRequired(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
        }
        rightSideDataSub.unsubscribe();
      }
    );
  }

  addDataFromSideBar(data, flag) {
    let fragmentData = {
      flag: flag,
      data,
      id: 1,
      state: 'open',
      componentName: undefined,
      popupHeaderText: (!!data ? 'Edit ' : 'Add '),
    }

    switch (flag) {
      case 'addEPS':
        fragmentData.popupHeaderText += 'EPF/VPF/EPS';
        fragmentData.componentName = AddEPSComponent;
        break;
      case 'addSuperannuation':
        fragmentData.popupHeaderText += 'Superannuation';
        fragmentData.componentName = AddSuperannuationComponent;
        break;
      case 'addGratuity':
        fragmentData.popupHeaderText += 'Gratuity';
        fragmentData.componentName = AddGratuityComponent;
        break;
      case 'addSummaryPort':
        fragmentData.popupHeaderText += 'Portfolio summary';
        fragmentData.componentName = NpsSummaryPortfolioComponent;
        break;
      case 'addEPF':
        fragmentData.popupHeaderText += 'Employees providend fund (EPF)';
        fragmentData.componentName = AddEPFComponent;
        break;
      case 'addSchemeHolding':
        fragmentData.popupHeaderText += 'Scheme level holdings';
        fragmentData.componentName = NpsSchemeHoldingComponent;
        break;
      default:
        console.error('A Non flagged parameter was called');
        return;
    }


    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(sideBarData => {
      console.log('this is sidebardata in subs subs : ', sideBarData);
      if (UtilService.isDialogClose(sideBarData)) {
        if (UtilService.isRefreshRequired(sideBarData)) {
          switch (flag) {
            case 'addEPS':
              this.getListEPS();
              break;
            case 'addSuperannuation':
              this.getListSuperannuation();
              break;
            case 'addGratuity':
              if (!data || sideBarData.data) {
                if (!this.gratuityDatalist) {
                  this.gratuityDatalist = { assetList: [sideBarData.data] };
                  this.gratuityDatalist['sumOfAmountReceived'] = sideBarData.data.amountReceived;
                  this.gratuityDatalist['sumOfGratuityReceived'] = sideBarData.data.gratuityReceived;
                }
                else {
                  if (fragmentData.popupHeaderText == 'Edit Gratuity') {
                    this.gratuityDatalist.assetList = this.gratuityDatalist.assetList.filter(x => x.id != sideBarData.data.id)
                  }
                  this.gratuityDatalist.assetList.push(sideBarData.data);
                  this.gratuityDatalist.sumOfAmountReceived += sideBarData.data.amountReceived;
                  this.gratuityDatalist.sumOfGratuityReceived += sideBarData.data.gratuityReceived;
                }
                // this.getNPSRes(this.npsDatalist);
                this.getGrauityRes(this.gratuityDatalist)
              }
              else {
                this.getListGratuity();
              }
              // this.getListGratuity();
              break;
            case 'addSummaryPort':
              if (!data || sideBarData.data) {
                if (!this.npsDatalist) {
                  this.npsDatalist = { assetList: [sideBarData.data] };
                  this.npsDatalist['sumOfAmountInvested'] = sideBarData.data.totalAmountInvested;
                  this.npsDatalist['sumOfCurrentValue'] = sideBarData.data.currentValuation;
                }
                else {
                  if (fragmentData.popupHeaderText == 'Edit Portfolio summary') {
                    this.npsDatalist.assetList = this.npsDatalist.assetList.filter(x => x.id != sideBarData.data.id)
                  }
                  this.npsDatalist.assetList.push(sideBarData.data);
                  this.npsDatalist.sumOfAmountInvested += sideBarData.data.totalAmountInvested;
                  this.npsDatalist.sumOfCurrentValue += sideBarData.data.currentValuation;
                }
                this.getNPSRes(this.npsDatalist);
              }
              else {
                this.getListNPS();
              }
              break;
            case 'addEPF':
              // this.epfDatalist.assetList.push(sideBarData.data)
              // this.epfDatalist.sumOfEpfBalanceTillToday+=;
              // this.epfDatalist.sumOfEpsBalanceTillToday+=;

              // this.getEPFRes(this.epfDatalist);
              if (!data || sideBarData.data) {
                if (!this.epfDatalist) {
                  this.epfDatalist = { assetList: [sideBarData.data] };
                  this.epfDatalist['sumOfEpfBalanceTillToday'] = sideBarData.data.currentEpfValue;
                  this.epfDatalist['sumOfEpsBalanceTillToday'] = sideBarData.data.currentEpsValue;
                  // this.epfDatalist['sumOfcurrentValue'] = sideBarData.data.maturityValue;
                  this.epfDatalist['sumOfemployeesMonthlyContribution'] = sideBarData.data.currentValue;
                  this.epfDatalist['sumOfemployersMonthlyContribution'] = sideBarData.data.maturityValue;
                }
                else {
                  if (fragmentData.popupHeaderText == 'Edit Employees providend fund (EPF)') {
                    this.epfDatalist.assetList = this.epfDatalist.assetList.filter(x => x.id != sideBarData.data.id)
                  }
                  this.epfDatalist.assetList.push(sideBarData.data);
                  this.epfDatalist.sumOfEpfBalanceTillToday += sideBarData.data.currentEpfValue;
                  this.epfDatalist.sumOfEpsBalanceTillToday += sideBarData.data.currentEpsValue;
                  // this.epfDatalist.sumOfcurrentValue+= sideBarData.data.maturityValue;
                  this.epfDatalist.sumOfemployeesMonthlyContribution += sideBarData.data.employeesMonthlyContribution;
                  this.epfDatalist.sumOfemployersMonthlyContribution += sideBarData.data.employersMonthlyContribution;

                }
                this.getEPFRes(this.epfDatalist);
              }
              else {
                this.getListEPF();
              }
              break;
            case 'addSchemeHolding':
              if (!data || sideBarData.data) {
                if (!this.npsDatalist) {

                  this.npsDatalist = { assetList: [sideBarData.data] };
                  this.npsDatalist['sumOfAmountInvested'] = sideBarData.data.totalAmountInvested;
                  this.npsDatalist['sumOfCurrentValue'] = sideBarData.data.currentValuation;
                }
                else {
                  if (fragmentData.popupHeaderText == 'Edit Scheme level holdings') {
                    this.npsDatalist.assetList = this.npsDatalist.assetList.filter(x => x.id != sideBarData.data.id)
                  }
                  this.npsDatalist.assetList.push(sideBarData.data);
                  this.npsDatalist.sumOfAmountInvested += sideBarData.data.totalAmountInvested;
                  this.npsDatalist.sumOfCurrentValue += sideBarData.data.currentValuation;
                }
                this.getNPSRes(this.npsDatalist);
              }
              else {
                this.getListNPS();
              }
              break;
            default:
              console.error('A non flagged parameter was called');
              break;
          }
          console.log('this is sidebardata in subs subs 3 ani: ', sideBarData);
        }
        rightSideDataSub.unsubscribe();
      }
    });
  }

  openDetailedView(data, flag) {
    let component = (flag == 'detailedViewEpf') ? DetailedViewEPFComponent : (flag == 'detailedViewNps') ? DetailedViewNpsComponent : (flag == 'detailedViewGratuity') ? DetailedViewGratuityComponent : (flag == 'detailedViewSuperannuation') ? DetaildedViewSuperannuationComponent : flag == 'detailedViewNpsHolding' ? DatailedViewNpsHoldingsComponent : DetailedViewEPSComponent;
    const fragmentData = {
      flag: 'addEPF',
      data,
      id: 1,
      state: 'open35',
      componentName: component
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isRefreshRequired(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
        }
        rightSideDataSub.unsubscribe();
      }
    );
  }

  deleteModal(value, element) {
    const dialogData = {
      data: value,
      header: 'DELETE',
      body: 'Are you sure you want to delete?',
      body2: 'This cannot be undone.',
      btnYes: 'CANCEL',
      btnNo: 'DELETE',
      positiveMethod: () => {
        if (value == 'EPF') {
          this.custumService.deleteEPF_EPS(element.id).subscribe(
            data => {
              dialogRef.close();
              this.assetValidation.addAssetCount({ type: 'Delete', value: 'retirementAccounts' })
              this.customerOverview.portFolioData = null;
              this.customerOverview.assetAllocationChart = null;
              this.customerOverview.summaryLeftsidebarData = null;
              this.customerOverview.aumGraphdata = null;
              this.customerOverview.assetAllocationChart = null;
              this.customerOverview.summaryCashFlowData = null;
              // this.getListEPF();
              this.epfDatalist.assetList = this.epfDatalist.assetList.filter(x => x.id != element.id);
              // this.dataSource.data = this.epfDatalist.assetList;
              this.epfDatalist.sumOfEpfBalanceTillToday -= element.currentEpfValue;
              this.epfDatalist.sumOfEpsBalanceTillToday -= element.currentEpsValue;
              // this.epfDatalist.sumOfcurrentValue+= sideBarData.data.maturityValue;
              this.epfDatalist.sumOfemployeesMonthlyContribution -= element.employeesMonthlyContribution;
              this.epfDatalist.sumOfemployersMonthlyContribution -= element.employersMonthlyContribution;
              this.getEPFRes(this.epfDatalist);
              this.eventService.openSnackBar("Deleted successfully!", "Dismiss");
            },
            error => this.eventService.showErrorMessage(error)
          );
        } else if (value == 'NPS') {
          this.custumService.deleteNPS(element.id).subscribe(
            data => {
              dialogRef.close(); this.assetValidation.addAssetCount({ type: 'Delete', value: 'retirementAccounts' })
              this.customerOverview.portFolioData = null;
              this.customerOverview.assetAllocationChart = null;
              this.customerOverview.summaryLeftsidebarData = null;
              this.customerOverview.aumGraphdata = null;
              this.customerOverview.assetAllocationChart = null;
              this.customerOverview.summaryCashFlowData = null;
              // this.getListNPS();
              this.npsDatalist.assetList = this.npsDatalist.assetList.filter(x => x.id != element.id);
              this.npsDatalist.sumOfAmountInvested -= element.totalAmountInvested;
              this.npsDatalist.sumOfCurrentValue -= element.currentValuation;
              this.getNPSRes(this.npsDatalist);
              // this.dataSource.data = this.npsDatalist.assetList;
              this.eventService.openSnackBar("Deleted successfully!", "Dismiss");
            },
            error => this.eventService.showErrorMessage(error)
          );
        } else if (value == 'GRATUITY') {
          this.custumService.deleteGratuity(element.id).subscribe(
            data => {
              dialogRef.close(); this.assetValidation.addAssetCount({ type: 'Delete', value: 'retirementAccounts' })
              this.customerOverview.portFolioData = null;
              this.customerOverview.assetAllocationChart = null;
              this.customerOverview.summaryLeftsidebarData = null;
              this.customerOverview.aumGraphdata = null;
              this.customerOverview.assetAllocationChart = null;
              this.customerOverview.summaryCashFlowData = null;
              // this.getListGratuity();
              this.gratuityDatalist.assetList = this.gratuityDatalist.assetList.filter(x => x.id != element.id);
              this.gratuityDatalist.sumOfAmountReceived -= element.amountReceived;
              this.gratuityDatalist.sumOfGratuityReceived -= element.gratuityReceived;
              // this.getNPSRes(this.npsDatalist);
              this.getGrauityRes(this.gratuityDatalist);
              this.eventService.openSnackBar("Deleted successfully!", "Dismiss");
            },
            error => this.eventService.showErrorMessage(error)
          );
        } else if (value == 'SUPERANNUATION') {
          this.custumService.deleteSuperAnnuation(element.id).subscribe(
            data => {
              dialogRef.close();
              this.getListSuperannuation();
              this.eventService.openSnackBar("Deleted successfully!", "Dismiss");
            },
            error => this.eventService.showErrorMessage(error)
          );
        } else {
          this.custumService.deleteEPS(element.id).subscribe(
            data => {
              dialogRef.close();
              this.getListEPS();
              this.eventService.openSnackBar("Deleted successfully!", "Dismiss");
            },
            error => this.eventService.showErrorMessage(error)
          );
        }
      },
      negativeMethod: () => {
      }
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  getListEPF() {
    this.isLoading = true;
    const obj = this.getObject;
    this.dataSource.data = [{}, {}, {}];
    this.custumService.getEPF_EPS(obj).subscribe(
      data => this.getEPFRes(data), (error) => {
        this.eventService.showErrorMessage(error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }
  getEPFRes(data) {
    this.isLoading = false;
    if (data != undefined) {

      if (data.assetList) {
        // this.assetValidation.getAssetCountGLobalData();
        this.epfDatalist = data;
        this.dataSource.data = this.epfDatalist.assetList;
        this.sumOfcurrentEpfBalance = this.epfDatalist.sumOfEpfBalanceTillToday;
        this.sumOfcurrentEpsBalance = this.epfDatalist.sumOfEpsBalanceTillToday;
        this.sumOfcurrentValue = this.epfDatalist.sumOfcurrentValue;
        this.sumOfemployeesMonthlyContribution = this.epfDatalist.sumOfemployeesMonthlyContribution;
        this.sumOfemployersMonthlyContribution = this.epfDatalist.sumOfemployersMonthlyContribution;
        this.dataSource.sort = this.epfListTableSort;
        console.log('getEPFRes =', this.dataSource.data);

        var d = new Date();
        const n = d.getFullYear();
        this.dataSource.filteredData.forEach(element => {
          if (element.maturityYear < n) {
            element.statusId = 'MATURED';
          } else {
            element.statusId = 'LIVE';
          }
        });
      }
    }
    else {
      this.noData = "No scheme found";
      this.dataSource.data = [];
    }
    this.ref.detectChanges();
    this.loaded.emit(this.EpsTemp.nativeElement);
  }
  getListGratuity() {
    this.isLoading = true;
    const obj = this.getObject;
    this.dataSource.data = [{}, {}, {}];
    this.custumService.getGrauity(obj).subscribe(
      data => this.getGrauityRes(data), (error) => {
        this.eventService.showErrorMessage(error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );

  }

  sumOfGratuityReceived: any;
  getGrauityRes(data) {
    this.isLoading = false;
    if (data != undefined) {
      if (data.assetList) {
        this.gratuityDatalist = data;
        this.sumOfAmountReceived = this.gratuityDatalist.sumOfAmountReceived;
        this.sumOfGratuityReceived = this.gratuityDatalist.sumOfGratuityReceived;
        // this.assetValidation.getAssetCountGLobalData();
        console.log('getGrauityRes =', data);
        this.dataSource.data = this.gratuityDatalist.assetList;
        this.dataSource.sort = this.gratuityListTableSort;
        UtilService.checkStatusId(this.dataSource.filteredData);
      }
    }
    else {
      this.noData = "No gratuity found";
      this.dataSource.data = [];
    }
    this.ref.detectChanges();
    this.loaded.emit(this.GratuityTemp.nativeElement);
  }
  getListNPS() {
    this.isLoading = true;
    const obj = this.getObject;
    this.dataSource.data = [{}, {}, {}];
    this.custumService.getNPS(obj).subscribe(
      data => this.getNPSRes(data), (error) => {
        this.eventService.showErrorMessage(error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }
  getNPSRes(data) {
    this.isLoading = false;

    if (data != undefined) {
      if (data.assetList) {
        // this.assetValidation.getAssetCountGLobalData();
        console.log('getNPSRes =', data);
        this.npsDatalist = data
        this.dataSource.data = this.npsDatalist.assetList;
        this.dataSource.sort = this.npsListTableSort;
        this.totalContribution = this.npsDatalist.sumOfAmountInvested;
        this.totalCurrentValue = this.npsDatalist.sumOfCurrentValue;
        UtilService.checkStatusId(this.dataSource.filteredData);
      }
    }
    else {
      this.noData = "No NPS found";
      this.dataSource.data = [];
    }
    this.ref.detectChanges();
    this.loaded.emit(this.NpsTemp.nativeElement);
  }
  getListSuperannuation() {
    this.isLoading = true;
    const obj = this.getObject;
    this.dataSource.data = [{}, {}, {}];
    this.custumService.getSuperannuation(obj).subscribe(
      data => this.getSuperannuationRes(data), (error) => {
        this.eventService.showErrorMessage(error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }
  getSuperannuationRes(data) {
    this.isLoading = false;
    if (data != undefined) {
      this.sumOfAnnualEmployeeContribution = data.sumOfAnnualEmployeeContribution;
      this.sumOfAnnualEmployerContribution = data.sumOfAnnualEmployerContribution;
      if (data.superannuationList) {
        console.log('getSuperannuationRes =', data);
        this.dataSource.data = data.superannuationList;
        this.dataSource.sort = this.superAnnuationListTableSort;
        UtilService.checkStatusId(this.dataSource.filteredData);
      }
    }
    else {
      this.noData = "No superannuation found";
      this.dataSource.data = [];
    }
  }
  getListEPS() {
    this.isLoading = true;
    const obj = this.getObject;
    this.dataSource.data = [{}, {}, {}];
    this.custumService.getEPS(obj).subscribe(
      data => this.getEPSRes(data), (error) => {
        this.eventService.showErrorMessage(error);
        this.dataSource.data = [];
        this.isLoading = false;
      }
    );
  }

  getEPSRes(data) {
    this.isLoading = false;

    if (data != undefined) {
      this.totalNotionalValue = data.totalNotionalValue;
      this.totalPensionAmount = data.totalPensionAmount;
      if (data.epsList) {

        // this.assetValidation.getAssetCountGLobalData();
        // console.log('getEPSRes =', data);
        this.dataSource.data = data.epsList;
        this.dataSource.sort = this.epsListTableSort;
        UtilService.checkStatusId(this.dataSource.filteredData);
      }
    }
    else {
      this.noData = "No EPS found";
      this.dataSource.data = [];
    }
  }

  activeFilter: any = 'All';
  filterretirementAccounts(key: string, value: any, data: any, type: string) {
    this.sumOfcurrentEpfBalance = 0;
    this.sumOfcurrentEpsBalance = 0;
    this.sumOfcurrentValue = 0;
    this.sumOfemployeesMonthlyContribution = 0;
    this.sumOfemployersMonthlyContribution = 0;
    // this.sumMaturityValue = 0;

    this.totalContribution = 0;
    this.totalCurrentValue = 0;

    this.sumOfAmountReceived = 0;
    this.sumOfGratuityReceived = 0;

    let dataFiltered = [];
    this.activeFilter = value;
    if (value == "All") {
      if (type == 'EPF') {
        this.getEPFRes(data)
      }
      else if (type == 'NPS') {
        this.getNPSRes(data)
      }
      else {
        this.getGrauityRes(data)
      }
    }
    else {
      data.assetList.forEach(item => {
        if (item[key] === value) {
          if (item.currentValue) {
            this.sumOfcurrentValue += item.currentValue;
            this.totalCurrentValue += item.currentValue;
          }
          if (item.currentEpfValue) {
            this.sumOfcurrentEpfBalance += item.currentEpfValue;
          }

          if (item.currentEpsValue) {
            this.sumOfcurrentEpsBalance += item.currentEpsValue;
          }
          if (item.employeesMonthlyContribution) {
            this.sumOfemployeesMonthlyContribution += item.employeesMonthlyContribution;
          }
          if (item.employersMonthlyContribution) {
            this.sumOfemployersMonthlyContribution += item.employersMonthlyContribution;
          }
          if (item.totalAmountInvested) {
            this.totalContribution += item.totalAmountInvested;
          }
          if (item.amountReceived) {
            this.sumOfAmountReceived += item.amountReceived
          }
          if (item.gratuityReceived) {
            this.sumOfGratuityReceived += item.gratuityReceived
          }
        }
      });
      dataFiltered = data.assetList.filter(function (item) {
        return item[key] === value;
      });
      // if (dataFiltered.length <= 0) {
      //   this.hideFilter = false;
      // }
      this.dataSource.data = dataFiltered;
    }

    // this.isretirementAccountsFiltered = true;

    // this.dataSource = new MatTableDataSource(data);
    // this.dataSource.sort = this.retirementAccountsTableSort;
  }

  ngOnDestroy() {
    this.assetValidation.epfDatalist = this.epfDatalist ? this.epfDatalist : null;
    this.assetValidation.gratuityDatalist = this.gratuityDatalist ? this.gratuityDatalist : null;
    this.assetValidation.npsDatalist = this.npsDatalist ? this.npsDatalist : null;
  }
}
export interface PeriodicElement11 {
  no: string;
  owner: string;
  cvalue: string;
  bal: string;
  emp: string;
  //empc: string;
  rate: string;

  bacla: string;
  year: string;
  desc: string;
  status: string;
}
export interface PeriodicElement12 {
  no: string;
  owner: string;
  cvalue: string;
  total: string;
  pran: string;
  scheme: string;
  desc: string;
  status: string;
}
export interface PeriodicElement13 {
  no: string;
  owner: string;
  name: string;
  number: string;
  year: string;
  amt: string;
  reason: string;
  desc: string;
  status: string;
}
export interface PeriodicElement15 {
  no: string;
  owner: string;
  nvalue: string;
  date: string;
  amt: string;
  pay: string;
  desc: string;
  status: string;

}
export interface PeriodicElement16 {
  no: string;
  owner: string;
  cvalue: string;
  rate: string;
  amt: string;
  number: string;
  mdate: string;
  desc: string;
  status: string;

}
export interface PeriodicElement14 {
  no: string;
  owner: string;
  aemp: string;
  aempe: string;
  rate: string;
  date: string;
  desc: string;
  status: string;

}

