import { Component, OnInit, SimpleChanges, EventEmitter, Output, Input } from '@angular/core';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { EventService } from 'src/app/Data-service/event.service';
import { UtilService } from 'src/app/services/util.service';
import { CustomerService } from '../../../../customer.service';
import { AuthService } from 'src/app/auth-service/authService';
import { MfServiceService } from '../mf-service.service';
import { map } from 'rxjs/operators';
import { SettingsService } from 'src/app/component/protect-component/AdviserComponent/setting/settings.service';

@Component({
  selector: 'app-mutual-fund',
  templateUrl: './mutual-fund.component.html',
  styleUrls: ['./mutual-fund.component.scss']
})
export class MutualFundComponent implements OnInit {
  @Output() sendData = new EventEmitter();
  viewMode: string;
  mfData: any;
  advisorId: any;
  clientId: any;
  subCategoryData: any[];
  schemeWise: any[];
  mutualFundList: any[];
  mfDataUnrealised: any;
  isLoading = true;

  dataHolder: any = {};
  isShow;
  capitalGainData: any;
  inputData: any;
  showSelector: boolean = false;
  @Input()
  set data(data) {
    this.inputData = data;
    this.showSelector = true
    console.log('This is Input data ', data);
  }
  get data() {
    this.changeViewMode(this.inputData)
    return this.inputData;
    
  }
  
  constructor(public subInjectService: SubscriptionInject, public utilService: UtilService,
    public eventService: EventService, private custumService: CustomerService,
    private mfService: MfServiceService, private settingService: SettingsService) {
  }

  ngOnInit() {
    this.mfService.getMutualFundShowDropdown()
      .subscribe(res => {
        this.isShow = res;
      })

    this.viewMode = 'Overview Report';
    if(this.inputData){
      this.changeViewMode(this.inputData)
      this.viewMode = this.inputData
    }else{
      this.mfService.changeViewMode(this.viewMode);
    }
    this.advisorId = AuthService.getAdvisorId();
    // // this.advisorId = 2929;

    this.clientId = AuthService.getClientId() !== undefined ? AuthService.getClientId() : -1;
    // this.getMutualFund();



  }
  // getPersonalDetails(data){
  //   const obj={
  //     id:data
  //   }
  //   this.settingService.getProfileDetails(obj).subscribe(
  //     data => {
  //       console.log(data);
  //       this.mfData.advisorData = data;
  //     }
  //   );
  // }
  getMutualFund() {
    this.isLoading = true;
    const obj = {
      advisorId: this.advisorId,
      clientId: this.clientId,
    };
    this.custumService.getMutualFund(obj).pipe(map((data) => {
      return this.doFiltering(data);
    })).subscribe(
      data => this.getMutualFundResponse(data), (error) => {
        this.eventService.showErrorMessage(error);
      }
    );
  }
  doFiltering(data) {
    data.subCategoryData = this.mfService.filter(data.mutualFundCategoryMastersList, 'mutualFundSubCategoryMaster');
    data.schemeWise = this.mfService.filter(data.subCategoryData, 'mutualFundSchemeMaster');
    data.mutualFundList = this.mfService.filter(data.schemeWise, 'mutualFund');
    return data;
  }
  getMutualFundResponse(data) {
    if (data) {
      this.isLoading = false;
      this.mfData = data;
      this.mfData.viewMode = this.viewMode;
      if (this.mfData) {
        this.mfData.advisorData = this.mfService.getPersonalDetails(this.advisorId);
      }
    }
    this.isLoading = false;
  }
  unrealiseTransaction() {
    this.mfDataUnrealised = this.mfData;
  }

  changeViewMode(data) {
    this.viewMode = data;
    this.mfService.changeViewMode(this.viewMode);
    this.sendData.emit(data);
    // this.mfData.viewMode = data;
  }

  changeInput(value) {
    this.isShow = value;
  }

  refreshMFData(value) {
    if (value) {
    }
  }
}


