import { AddNscComponent } from './../common-component/add-nsc/add-nsc.component';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AuthService } from 'src/app/auth-service/authService';
import { CustomerService } from '../../../../customer.service';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { UtilService } from 'src/app/services/util.service';
import { ConfirmDialogComponent } from 'src/app/component/protect-component/common-component/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { EventService } from 'src/app/Data-service/event.service';
import { DetailedNscComponent } from './detailed-nsc/detailed-nsc.component';
import { FormatNumberDirective } from 'src/app/format-number.directive';
import { ExcelService } from '../../../../excel.service';

@Component({
  selector: 'app-nsc-scheme',
  templateUrl: './nsc-scheme.component.html',
  styleUrls: ['./nsc-scheme.component.scss']
})
export class NscSchemeComponent implements OnInit {
  advisorId: any;
  clientId: number;
  noData: string;
  // isLoading: boolean = true;
  isLoading = false;
  nscData: any;
  sortedData: any;
  sumOfCurrentValue: number;
  sumOfMaturityValue: number;
  data: Array<any> = [{}, {}, {}];
  SumOfMaturityValue;
  SumOfCurrentValue;
  datasource = new MatTableDataSource(this.data);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChildren(FormatNumberDirective) formatNumber;

  excelData: any[];
  footer;

  constructor(private excel: ExcelService, public dialog: MatDialog, private eventService: EventService,
    private cusService: CustomerService, private subInjectService: SubscriptionInject) {
  }

  displayedColumns17 = ['no', 'owner', 'cvalue', 'rate', 'mvalue', 'mdate', 'number', 'desc', 'status', 'icons'];


  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
    this.getNscSchemedata();
    this.footer = [];
  }

  async ExportTOExcel(value) {
    this.excelData = [];
    let data = [];
    const headerData = [{ width: 20, key: 'Owner' },
    { width: 20, key: 'Current Value' },
    { width: 10, key: 'Rate' },
    { width: 15, key: ' Maturity Value' },
    { width: 15, key: 'Maturity Date' },
    { width: 25, key: 'Certificate Number' },
    { width: 15, key: 'Description' },
    { width: 10, key: 'Status' },];
    const header = ['Owner', 'Current Value', 'Rate', ' Maturity Value',
      'Maturity Date', 'Certificate Number', 'Description', 'Status'];
    this.datasource.filteredData.forEach(element => {
      data = [element.ownerName, this.formatNumber.first.formatAndRoundOffNumber(element.currentValue), (element.rate),
      this.formatNumber.first.formatAndRoundOffNumber(element.maturityValue), new Date(element.maturityDate), element.certificateNumber, element.description, element.status];
      this.excelData.push(Object.assign(data));
    });
    const footerData = ['Total',
      this.formatNumber.first.formatAndRoundOffNumber(this.sumOfCurrentValue), '',
      this.formatNumber.first.formatAndRoundOffNumber(this.sumOfMaturityValue), '', '', '', ''];
    this.footer.push(Object.assign(footerData));
    ExcelService.exportExcel(headerData, header, this.excelData, this.footer, value);
  }

  getNscSchemedata() {
    this.isLoading = true;
    const obj = {
      advisorId: this.advisorId,
      clientId: this.clientId
    };
    this.datasource.data = [{}, {}, {}];
    this.cusService.getSmallSavingSchemeNSCData(obj).subscribe(
      data => this.getNscSchemedataResponse(data), (error) => {
        this.eventService.showErrorMessage(error);
        this.datasource.data = [];
        this.isLoading = false;
      }
    );
  }

  getNscSchemedataResponse(data) {
    this.isLoading = false;
    if (data == undefined) {
      this.noData = 'No scheme found';
      this.datasource.data = [];
    } else if (data && data.NationalSavingCertificate.length != 0) {
      console.log(data, 'getNscSchemedataResponse');
      this.datasource.data = data.NationalSavingCertificate;
      this.datasource.sort = this.sort;
      UtilService.checkStatusId(this.datasource.filteredData);
      this.SumOfCurrentValue = data.SumOfCurrentValue;
      this.SumOfMaturityValue = data.SumOfMaturityValue
      this.nscData = data;
    } else {
      this.noData = 'No scheme found';
      this.datasource.data = []
    }
  }

  deleteModal(value, data) {
    const dialogData = {
      data: value,
      header: 'DELETE',
      body: 'Are you sure you want to delete?',
      body2: 'This cannot be undone.',
      btnYes: 'CANCEL',
      btnNo: 'DELETE',
      positiveMethod: () => {
        this.cusService.deleteNSC(data.id).subscribe(
          data => {
            this.eventService.openSnackBar('NSC is deleted', 'dismiss');
            dialogRef.close();
            this.getNscSchemedata();
          },
          error => this.eventService.showErrorMessage(error)
        );
      },
      negativeMethod: () => {
        console.log('2222222222222222222222222222222222222');
      }
    };
    console.log(dialogData + '11111111111111');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openAddNSC(data, flag) {
    let popupHeaderText = !!data ? 'Edit National savings certificate (NSC)' : 'Add National savings certificate (NSC)';
    const fragmentData = {
      flag: 'addNsc',
      data,
      id: 1,
      state: (flag == 'detailedNsc') ? 'open35' : 'open',
      componentName: (flag == 'detailedNsc') ? DetailedNscComponent : AddNscComponent
    };
    if(flag != 'detailedNsc') {
      fragmentData['popupHeaderText'] = popupHeaderText;
    }
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          if (UtilService.isRefreshRequired(sideBarData)) {
            this.getNscSchemedata();
            console.log('this is sidebardata in subs subs 3 ani: ', sideBarData);

          }
          rightSideDataSub.unsubscribe();
        }

      }
    );
  }
}
