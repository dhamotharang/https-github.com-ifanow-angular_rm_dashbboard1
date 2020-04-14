import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth-service/authService';
import { OrgSettingServiceService } from '../org-setting-service.service';
import { EventService } from 'src/app/Data-service/event.service';
import { OpenEmailVerificationComponent } from './open-email-verification/open-email-verification.component';
import { MatDialog } from '@angular/material';
import { CommonFroalaComponent } from '../../Subscriptions/subscription/common-subscription-component/common-froala/common-froala.component';
import { UtilService } from 'src/app/services/util.service';
import { SubscriptionInject } from '../../Subscriptions/subscription-inject.service';
import { ConfirmDialogComponent } from '../../../common-component/confirm-dialog/confirm-dialog.component';
import { EmailOnlyComponent } from '../../Subscriptions/subscription/common-subscription-component/email-only/email-only.component';

@Component({
  selector: 'app-setting-preference',
  templateUrl: './setting-preference.component.html',
  styleUrls: ['./setting-preference.component.scss']
})
export class SettingPreferenceComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight'];
  displayedColumns1: string[] = ['position', 'name', 'weight', 'symbol'];
  viewMode = 'tab1';
  advisorId: any;
  portfolio: any;
  mutualFund: any;
  mutualFund2: any;
  mutualFund3: any;
  factSheet: any;
  planSec1: any;
  planSection: any;
  domainSetting: any;
  updateDomain: any;
  emailDetails: any;
  element: any;
  emailList: any;
  normalDomain: any;
  whiteLabledDomain: any;
  emailTemplateList: any;
  showUpdate = false;
  normalLable;
  whiteLable;
  domain: any;
  domainS: any;
  clientData
  userId: any;
  showUpdateWhite = false;
  isLoading = false
  brandVisibility: any;
  showUpdateBrand: boolean = false;
  brandVisible: any;
  constructor(private orgSetting: OrgSettingServiceService,
    public subInjectService: SubscriptionInject, private eventService: EventService, public dialog: MatDialog, private fb: FormBuilder, ) {
      
    this.advisorId = AuthService.getAdvisorId()
    this.userId = AuthService.getUserId()
  }

  ngOnInit() {
    console.log('3456893469 ===', this.userId)
    this.getPortfolio()
    this.getdataForm('')
    this.isLoading = false
    this.emailList = []
    this.planSection = []
    this.emailTemplateList = []
  }
  getdataForm(data) {
    this.domainS = this.fb.group({
      normalLable: [(!data) ? '' : data.emailId, [Validators.required]],
      whiteLable: [(!data) ? '' : data.emailId, [Validators.required]],
      brandVisible: [(!data) ? '' : data.emailId, [Validators.required]]
    });
  }

  getFormControl(): any {
    return this.domainS.controls;
  }
  getDomain() {
    let obj = {
      advisorId: this.advisorId
    }
    this.orgSetting.getDomainSetting(obj).subscribe(
      data => this.getDomainSettingRes(data),
      err => this.eventService.openSnackBar(err, "Dismiss")
    );
  }
  getDomainSettingRes(data) {
    console.log(data)
    this.domainSetting = data
    this.normalDomain = this.domainSetting.filter(element => element.domainOptionId == 1)
    this.whiteLabledDomain = this.domainSetting.filter(element => element.domainOptionId == 2)
    this.brandVisibility = this.domainSetting.filter(element => element.domainOptionId == 3)
    this.normalLable = this.normalDomain[0].optionValue
    this.whiteLable = this.whiteLabledDomain[0].optionValue
    this.brandVisible = (this.brandVisibility[0].optionValue == null) ? '' : this.brandVisibility[0].optionValue
    this.domainS.controls.normalLable.setValue(this.normalLable)
    this.domainS.controls.whiteLable.setValue(this.whiteLable)
    this.domainS.controls.brandVisible.setValue(this.brandVisible)
    console.log('normalDomain', this.normalDomain)
    console.log('whiteLabled', this.whiteLabledDomain)
  }
  updateDomainSetting(event, value) {
    console.log(event)
    this.domainSetting.forEach(element => {
      if (element.domainOptionId == value.domainOptionId) {
        if (value.domainOptionId == 1) {
          element.optionValue = this.domainS.controls.normalLable.value;
        } else if (value.domainOptionId == 2) {
          element.optionValue = this.domainS.controls.whiteLable.value;
        } else {
          element.optionValue = this.domainS.controls.brandVisible.value;
        }
      }
      element.advisorId = this.advisorId;
    });
    this.orgSetting.updateDomainSetting(this.domainSetting).subscribe(
      data => this.updateDomainSettingRes(data),
      err => this.eventService.openSnackBar(err, "Dismiss")
    );
  }
  updateDomainSettingRes(data) {
    console.log(data)
    this.updateDomain = data
    this.getDomain()
  }
  editDomain(flag, event, value) {
    if (flag == true) {
      if (event == 'white') {
        this.showUpdateWhite = true
      } else if (event == 'normal') {
        this.showUpdate = true
      } else {
        this.showUpdateBrand = true
      }

    } else {
      if (event == 'white') {
        this.showUpdateWhite = false
      } else if (event == 'normal') {
        this.showUpdate = false
      } else {
        this.showUpdateBrand = false
      }
      this.updateDomainSetting(event, value)
    }
  }
  getPortfolio() {
    this.isLoading = true;
    let obj = {
      advisorId: this.advisorId
    }
    this.orgSetting.getPortfolio(obj).subscribe(
      data => this.getPortfolioRes(data),
      err => this.eventService.openSnackBar(err, "Dismiss")
    );
  }
  getPortfolioRes(data) {
    this.isLoading = false
    console.log('getPortfolioReslase == ', data)
    this.portfolio = data
    this.mutualFund = this.portfolio.find(element => element.portfolioOptionId == 1)
    this.mutualFund2 = this.portfolio.find(element => element.portfolioOptionId == 2)
    this.mutualFund3 = this.portfolio.find(element => element.portfolioOptionId == 3)
  }

  getPlan() {
    this.isLoading = true
    let obj = {
      advisorId: this.advisorId
    }
    this.orgSetting.getPlans(obj).subscribe(
      data => this.getPlanRes(data),
      err => this.eventService.openSnackBar(err, "Dismiss")
    );
  }
  
  selectMutualFund(event, value) {
    this.portfolio.forEach(element => {
      if (element.portfolioOptionId == value.portfolioOptionId) {
        element.selectedOrDeselected = (event.checked == true) ? 1 : 0;
        value.selectedOrDeselected = element.selectedOrDeselected;
      }
      element.advisorId = this.advisorId;
    });

    if(value.portfolioOptionId == 2 && !event.checked) {
      this.mutualFund3.selectedOrDeselected = 0;
      this.mutualFund3 = JSON.parse(JSON.stringify(this.mutualFund3));
      this.portfolio.forEach(element => {
        if (element.portfolioOptionId == this.mutualFund3.portfolioOptionId) {
          element.selectedOrDeselected = this.mutualFund3.selectedOrDeselected;
        }
      });
    }
    
    const obj = this.portfolio
    this.orgSetting.updatePortFolio(obj).subscribe(
      data => this.updatePortFolioRes(data),
      err => this.eventService.openSnackBar(err, "Dismiss")
    );
  }
  updatePortFolioRes(data) {
    console.log('updatePortFolio', data)
  }
  selectPlan(event, value) {
    this.planSection.forEach(element => {
      if (element.planOptionId == value.planOptionId) {
        element.selectedOrDeselected = (event.checked == true) ? 1 : 0;
      }
      element.advisorId = this.advisorId;
    });
    console.log(this.planSection)
    var obj = this.planSection
    this.orgSetting.updatePlanSection(obj).subscribe(
      data => this.updatePlanSectionRes(data),
      err => this.eventService.openSnackBar(err, "Dismiss")
    );
  }
  updatePlanSectionRes(data) {
    console.log('updatePlanSectionRes ==', data)
  }
  verifyEmail(value) {
    const dialogRef = this.dialog.open(OpenEmailVerificationComponent, {
      width: '400px',
      data: { bank: value, animal: this.element }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        return
      }
      console.log('The dialog was closed');
      this.element = result;
      console.log('result -==', this.element)
      let obj = {
        id: this.element.id,
        emailAddress: this.element.emailAddress,
        userId: this.userId
      }
      this.orgSetting.addEmailVerfify(obj).subscribe(
        data => this.addEmailVerfifyRes(data),
        err => this.eventService.openSnackBar(err, "Dismiss")
      );
      //  this.bankDetailsSend.emit(result);
    });
  }
  addEmailVerfifyRes(data) {
    console.log(data)
    this.getEmailVerification()
  }
  deleteEmailModal(value, data) {
    const dialogData = {
      data: value,
      header: 'DELETE',
      body: 'Are you sure you want to delete?',
      body2: 'This cannot be undone.',
      btnYes: 'CANCEL',
      btnNo: 'DELETE',
      positiveMethod: () => {
        this.orgSetting.deleteEmailVerify(data.id).subscribe(
          data => {
            dialogRef.close();
            this.getEmailVerification();
            this.eventService.openSnackBar("Deleted successfully!", "Dismiss");
          },
          error => this.eventService.showErrorMessage(error)
        );
      },
      negativeMethod: () => {
        console.log('2222222222222222222222222222222222222');
      }
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
      autoFocus: false,

    });
  }
  getPlanRes(data) {
    this.isLoading = false
    console.log('getPortfolioRes == ', data)
    if (data) {
      this.planSection = data
      this.planSec1 = this.planSection.filter(element => element.planOptionId == 1)
      this.planSec1 = this.planSec1[0]
      console.log('planSec1 ', this.planSec1)
    } else {
      this.isLoading = false
      this.planSection = []
    }

  }
  getEmailVerification() {
    this.isLoading = true
    let obj = {
      userId: this.userId,
      // advisorId: this.advisorId
    }
    this.orgSetting.getEmailVerification(obj).subscribe(
      data => this.getEmailVerificationRes(data),
      err => this.eventService.openSnackBar(err, "Dismiss")
    );
  }
  getEmailVerificationRes(data) {
    this.isLoading = false
    console.log('email verify == get', data)
    if (data) {
      this.emailDetails = data
      this.emailList = data.listItems
    } else {
      this.emailList = []
    }

  }
  getEmailTemplate() {
    this.isLoading = true
    let obj = {
      advisorId: this.advisorId
    }
    this.orgSetting.getEmailTempalate(obj).subscribe(
      data => this.getEmailTempalatRes(data),
      err => this.eventService.openSnackBar(err, "Dismiss")
    );
  }
  getEmailTempalatRes(data) {
    this.isLoading = false
    if (data) {
      console.log('emailTemplate', data)
      this.emailTemplateList = data
    } else {
      this.emailTemplateList = []
    }

  }
  OpenEmail(value, data) {
    if (this.isLoading) {
      return;
    }
    let obj = {
      clientData: {documentText: data.body},
      showfromEmail: true,
      fromEmail: data.fromEmail || '',
      documentList: [],
      id: data.id,
      subject: data.subject,
      emailTemplateTypeId: data.emailTemplateTypeId,
      subjectChange: !data.subjectEditable,
      bodyChange: !data.bodyEditable,
      component_type: 'email_template',
      email_header: data.title,
    }
    const fragmentData = {
      flag: value,
      data: obj,
      id: 1,
      state: 'open',
      componentName: EmailOnlyComponent
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          if (UtilService.isRefreshRequired(sideBarData)) {
            this.getEmailTemplate();
            console.log('this is sidebardata in subs subs 3 ani: ', sideBarData);
            this.getEmailTemplate()
          }
          rightSideDataSub.unsubscribe();
        }
      }
    );
  }
}