import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
// import * as $ from 'jquery';
import { BackOfficeService } from '../../../../back-office.service';
import { EventService } from 'src/app/Data-service/event.service';
import { AumComponent } from '../aum.component';
import { AuthService } from 'src/app/auth-service/authService';
import { ExcelMisService } from '../excel-mis.service';
import { MfServiceService } from 'src/app/component/protect-component/customers/component/customer/accounts/assets/mutual-fund/mf-service.service';
@Component({
  selector: 'app-category-wise',
  templateUrl: './category-wise.component.html',
  styleUrls: ['./category-wise.component.scss']
})
export class CategoryWiseComponent implements OnInit {
  category;
  subcategory;
  showLoader = true;
  isLoading = false;
  teamMemberId = 2929;
  advisorId = AuthService.getAdvisorId();
  subCategoryList: any[] = [];
  totalAumForSubSchemeName: any;
  amcWiseData: any;
  @Input() data;

  arrayOfHeaders: any[][] = [
    [
      'Sr. No.',
      'Category Name',
      'Current Value',
      '% Weight'
    ],
    [
      'Sr. No.',
      'Sub Category Name',
      'Current Name',
      '% Weight'
    ],
    [
      'Sr. No.',
      'Scheme Name',
      'Current Value',
      '% Weight'
    ],
    [
      'Applicant Name',
      'Balance Unit',
      'Folio',
      'Current Amount',
      '% Weight'
    ]
  ];
  arrayOfHeaderStyles: { width: number; key: string; }[][] = [
    [
      { width: 10, key: 'Sr. No.' },
      { width: 50, key: 'Category Name' },
      { width: 30, key: 'Current Value' },
      { width: 10, key: '% Weight' }
    ],
    [
      { width: 10, key: 'Sr. No.' },
      { width: 50, key: 'Sub Category Name' },
      { width: 30, key: 'Current Value' },
      { width: 10, key: '% Weight' }
    ],
    [
      { width: 10, key: 'Sr. No.' },
      { width: 50, key: 'Scheme Name' },
      { width: 30, key: 'Current Name' },
      { width: 10, key: '% Weight' }
    ],
    [
      { width: 50, key: 'Applicant Name' },
      { width: 30, key: 'Balance Unit' },
      { width: 30, key: 'Folio' },
      { width: 30, key: 'Current Amount' },
      { width: 10, key: '% Weight' },
    ]
  ];
  arrayOfExcelData: any[] = [];
  @Output() changedValue = new EventEmitter();
  selectedSubCategory: any;
  selectedClientIndex: any;
  totalCurrentValue=0;
  totalWeight=0;
  propertyName: any;
  propertyName2: any;
  propertyName3: any;
  propertyName4: any;
  reverse=true;
  reverse2=true;
  reverse3=true;
  reverse4=true;
  parentId: any;
  clientId: any;
  constructor(
    private backoffice: BackOfficeService, private dataService: EventService, public aum: AumComponent,private mfService:MfServiceService
  ) { }
  selectedCategory;
  ngOnInit() {
    this.clientId = AuthService.getClientId();
    this.parentId = AuthService.getParentId() ? AuthService.getParentId() : this.advisorId;
    this.getSubCatSchemeName();


    // this.clientFolioWise();
    // this.getSubCatAum();
  }
  sortBy(applicant,propertyName){
    this.propertyName = propertyName;
    this.reverse = (propertyName !== null && this.propertyName === propertyName) ? !this.reverse : false;
    if (this.reverse === false){
      applicant=applicant.sort((a, b) =>
         a[propertyName] > b[propertyName] ? 1 : (a[propertyName] === b[propertyName] ? 0 : -1)
        );
    }else{
      applicant=applicant.sort((a, b) => 
        a[propertyName] > b[propertyName] ? -1 : (a[propertyName] === b[propertyName] ? 0 : 1)
      );
    }
  }
  sortBySubCat(applicant,propertyName){
    this.propertyName2 = propertyName;
    this.reverse2 = (propertyName !== null && this.propertyName2 === propertyName) ? !this.reverse2 : false;
    if (this.reverse2 === false){
      applicant=applicant.sort((a, b) =>
         a[propertyName] > b[propertyName] ? 1 : (a[propertyName] === b[propertyName] ? 0 : -1)
        );
    }else{
      applicant=applicant.sort((a, b) => 
        a[propertyName] > b[propertyName] ? -1 : (a[propertyName] === b[propertyName] ? 0 : 1)
      );
    }
  }
  sortByScheme(applicant,propertyName){
    this.propertyName3 = propertyName;
    this.reverse3 = (propertyName !== null && this.propertyName3 === propertyName) ? !this.reverse3 : false;
    if (this.reverse3 === false){
      applicant=applicant.sort((a, b) =>
         a[propertyName] > b[propertyName] ? 1 : (a[propertyName] === b[propertyName] ? 0 : -1)
        );
    }else{
      applicant=applicant.sort((a, b) => 
        a[propertyName] > b[propertyName] ? -1 : (a[propertyName] === b[propertyName] ? 0 : 1)
      );
    }
  }
  sortByApplicant(applicant,propertyName){
    this.propertyName4 = propertyName;
    this.reverse4 = (propertyName !== null && this.propertyName4 === propertyName) ? !this.reverse4 : false;
    if (this.reverse4 === false){
      applicant=applicant.sort((a, b) =>
         a[propertyName] > b[propertyName] ? 1 : (a[propertyName] === b[propertyName] ? 0 : -1)
        );
    }else{
      applicant=applicant.sort((a, b) => 
        a[propertyName] > b[propertyName] ? -1 : (a[propertyName] === b[propertyName] ? 0 : 1)
      );
    }
  }
  getSubCatSchemeName() {
    this.isLoading = true;
    this.category = [{}, {}, {}];
    const obj = {
      advisorId: (this.parentId) ? 0 : (this.data.arnRiaDetailId != -1) ? 0 : [this.data.adminAdvisorIds],
      arnRiaDetailsId: (this.data) ? this.data.arnRiaDetailId : -1,
      parentId: (this.data) ? this.data.parentId : -1
    }
    this.backoffice.getTotalByAumScheme(obj).subscribe(
      data => this.getFileResponseDataForSubSchemeName(data),
      err => this.getFilerrorResponse(err)
    )
  }

  clientFolioWise() {
    const obj = {
      amcName: 'Aditya Birla',
      teamMemberId: this.teamMemberId
    }
    this.backoffice.getClientFolioWiseInCategory(obj).subscribe(
      data => {
      },
      err => this.getFilerrorResponse(err)
    )
  }

  showSubTableList(index, category, catIndex) {

    this.selectedCategory = index;
    category.showCategory = !category.showCategory;
    if (!category.showCategory) {
      if (this.category[this.selectedCategory].hasOwnProperty('subCategoryList') && this.category[this.selectedCategory].subCategoryList.length !== 0) {
        this.appendingOfValuesInExcel(this.category[this.selectedCategory].subCategoryList, index, 'sub-category');
      }
    } else {
      // remove
      this.removeValuesFromExcel('sub-category', index);
    }
  }

  removeValuesFromExcel(whichList, index) {
    switch (whichList) {
      case 'sub-category':
        this.arrayOfExcelData[index].subCatList = [];
        break;
      case 'schemes':
        this.arrayOfExcelData[this.selectedCategory].subCatList[index].schemeList = [];
        break;
      case 'applicant':
        this.arrayOfExcelData[this.selectedCategory].subCatList[this.selectedSubCategory].schemeList[index].applicantList = [];
        break;
    }
  }

  getFileResponseDataForSubSchemeName(data) {
    this.isLoading = false;
    this.showLoader = false;
    if (data) {
      this.category = data.categories;
      this.totalAumForSubSchemeName = data.totalAum;
      // excel init
      this.excelInitOfCategories();
    }else{
      this.category=[];
    }

    // this.excelSheetInitialization();
    this.category.forEach(o => {
      o.showCategory = true;
      this.totalCurrentValue += o.totalAum;
      this.totalWeight += o.weightInPercentage;
      this.subCategoryList.push(o.subCategoryList);

      o.subCategoryList.forEach(sub => {
        sub.showSubCategory = true;
      })
    });

  }
  showSchemeName(subcatshowSubcat, index, catIndex) {
    this.selectedSubCategory = index;
    this.selectedCategory = catIndex;
    subcatshowSubcat.showSubCategory = !subcatshowSubcat.showSubCategory
    subcatshowSubcat.schemes.forEach(element => {
      element.showScheme = true;
    });
    if (!subcatshowSubcat.showSubCategory) {
      this.appendingOfValuesInExcel(this.category[this.selectedCategory].subCategoryList[this.selectedSubCategory].schemes, index, 'schemes');
    } else {
      this.removeValuesFromExcel('schemes', index);
    }
  }

  showApplicantName(schemeData, index, catIndex) {
    this.selectedClientIndex = index;
    schemeData.showScheme = !schemeData.showScheme;
    if (!schemeData.showScheme) {
      this.appendingOfValuesInExcel(this.category[this.selectedCategory].subCategoryList[this.selectedSubCategory].schemes[this.selectedClientIndex].clientList, index, 'applicant');
    } else {
      this.removeValuesFromExcel('applicant', index);
    }
  }

  aumReport() {
    this.changedValue.emit(true);
    this.category.forEach(element => {
      element.showCategory = true
    });
  }

  getFilerrorResponse(err) {
    this.isLoading=false;
    this.category=[];
    this.dataService.openSnackBar(err, 'Dismiss')
  }

  excelInitOfCategories() {
    let dataValue = {};

    this.category.forEach((element, index1) => {
      dataValue = {
        index: index1 + 1,
        categoryName: element.name,
        totalAum: this.mfService.mutualFundRoundAndFormat(element.totalAum, 0),
        weightInPerc: element.weightInPercentage,
        subCatList: []
      };
      this.arrayOfExcelData.push(dataValue);
    });
  }

  appendingOfValuesInExcel(iterable, index, choice) {

    switch (choice) {
      case 'sub-category':
        // categories
        iterable.forEach((element, index1) => {
          this.arrayOfExcelData[index].subCatList.push({
            index: index1 + 1,
            name: element.name,
            totalAum:this.mfService.mutualFundRoundAndFormat(element.totalAum, 0),
            weightInPerc: element.weightInPercentage,
            schemeList: []
          });
        });
        break;
      case 'schemes':
        // sub categories
        iterable.forEach((element, index1) => {
          this.arrayOfExcelData[this.selectedCategory].subCatList[index].schemeList.push({
            index: index1 + 1,
            name: element.schemeName,
            totalAum: this.mfService.mutualFundRoundAndFormat(element.totalAum, 0),
            weightInPerc: element.weightInPercentage,
            applicantList: []
          });
        });
        break;
      case 'applicant':
        iterable.forEach((element, index1) => {
          this.arrayOfExcelData[this.selectedCategory].subCatList[this.selectedSubCategory]
            .schemeList[index].applicantList.push({
              name: element.name,
              balanceUnit: this.mfService.mutualFundRoundAndFormat(element.balanceUnit, 2),
              folioNumber: element.folioNumber,
              totalAum: this.mfService.mutualFundRoundAndFormat(element.totalAum, 0),
              weightInPerc: element.weightInPercentage
            });
        });
        break;
    }
  }

  categoryWiseExcelSheet() {
    ExcelMisService.exportExcel2(this.arrayOfHeaders, this.arrayOfHeaderStyles, this.arrayOfExcelData, 'Category wise MIS Report', 'category-wise-aum-mis', {
      categoryList: false,
      subCatList: false,
      schemeList: false,
      applicantList: false
    });
  }

  subCategoryWiseExcelSheet(index) {
    let copyOfExcelData = JSON.parse(JSON.stringify(this.arrayOfExcelData));

    copyOfExcelData.forEach((element, index1) => {
      if (index1 === index) {
        return;
      } else {
        if (element.subCatList.length !== 0) {
          element.subCatList = [];
        }
      }
    });

    ExcelMisService.exportExcel2(this.arrayOfHeaders, this.arrayOfHeaderStyles, copyOfExcelData, 'Category wise MIS Report', 'category-wise-aum-mis', {
      categoryList: true,
      subCatList: false,
      schemeList: false,
      applicantList: false
    });
  }

  applicantWiseExcelSheet(index) {
    let applicantList = this.arrayOfExcelData[this.selectedCategory].subCatList[this.selectedSubCategory].schemeList[this.selectedClientIndex].applicantList;
    let newarr = [];
    applicantList.forEach(element => {
      newarr.push({
        field1: element.name,
        field2: this.mfService.mutualFundRoundAndFormat(element.balanceUnit, 2),
        field3: element.folioNumber,
        field4: this.mfService.mutualFundRoundAndFormat(element.totalAum, 0),
        field5: element.weightInPerc
      });
    })
    ExcelMisService.exportExcel(this.arrayOfHeaderStyles[3], this.arrayOfHeaders[3], newarr, [], 'Applicant Wise MIS Report');
  }

  schemeWiseExcelSheet(index) {
    let copyOfExcelData = JSON.parse(JSON.stringify(this.arrayOfExcelData));

    copyOfExcelData.forEach((element, index1) => {
      if (index1 === index) {
        return;
      } else {
        if (element.subCatList.length !== 0) {
          element.subCatList.forEach(element => {
            element.schemeList = [];
          });
        }
      }
    });
    ExcelMisService.exportExcel2(this.arrayOfHeaders, this.arrayOfHeaderStyles, copyOfExcelData, 'Category wise MIS Report', 'category-wise-aum-mis', {
      categoryList: true,
      subCatList: true,
      schemeList: false,
      applicantList: false
    });
  }

  exportToExcelReport(choice, index) {
    switch (choice) {
      case 'category':
        this.categoryWiseExcelSheet();
        break;
      case 'sub-category':
        this.subCategoryWiseExcelSheet(index);
        break;
      case 'schemes':
        this.schemeWiseExcelSheet(index);
        break;
      case 'applicant':
        this.applicantWiseExcelSheet(index);
        break;
    }
  }
}