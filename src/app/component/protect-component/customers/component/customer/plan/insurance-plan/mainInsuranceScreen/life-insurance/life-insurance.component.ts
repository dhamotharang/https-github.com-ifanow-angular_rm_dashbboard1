import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AddPlaninsuranceComponent } from '../../add-planinsurance/add-planinsurance.component';
import { UtilService } from 'src/app/services/util.service';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { CustomerService } from '../../../../customer.service';
import { EventService } from 'src/app/Data-service/event.service';
import { AddSuggestPolicyComponent } from '../../add-suggest-policy/add-suggest-policy.component';
import { AddRecommendationsInsuComponent } from '../../add-recommendations-insu/add-recommendations-insu.component';
import { PlanService } from '../../../plan.service';
import { AuthService } from 'src/app/auth-service/authService';
import { ConfirmDialogComponent } from 'src/app/component/protect-component/common-component/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatAccordion } from '@angular/material';
import { forkJoin } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ShowHealthPlanningComponent } from '../../show-health-planning/show-health-planning.component';
import { InsurancePlanningServiceService } from '../../insurance-planning-service.service';
import { SuggestHealthInsuranceComponent } from '../../suggest-health-insurance/suggest-health-insurance.component';
import { PersonalInsuranceComponent } from '../personal-insurance/personal-insurance.component';
import { CriticalInsuranceComponent } from '../critical-insurance/critical-insurance.component';
import { MotorInsuranceComponent } from '../motor-insurance/motor-insurance.component';
import { TravelInsuranceComponent } from '../travel-insurance/travel-insurance.component';
import { HouseholdersInsuranceComponent } from '../householders-insurance/householders-insurance.component';
import { FireInsuranceComponent } from '../fire-insurance/fire-insurance.component';

@Component({
  selector: 'app-life-insurance',
  templateUrl: './life-insurance.component.html',
  styleUrls: ['./life-insurance.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LifeInsuranceComponent implements OnInit {
  blockExpansion = true;
  panelOpenState = false;
  isClick = false;
  displayedColumnsNeedAnalysis: string[] = ['details', 'outstanding', 'consider', 'edit'];
  displayedColumns = ['pname', 'sum2', 'premium2', 'status', 'empty'];
  dataSource = ELEMENT_DATA;
  displayedColumns1 = ['name', 'sum', 'premium', 'returns', 'advice', 'icon'];
  displayedColumns3 = ['name', 'sum', 'premium', 'status','icons'];
  // displayedColumns3 = ['name', 'weight', 'symbol', 'position'];
  // dataSouce3=ELEMENT_DATA4;

  dataSouce3 = [{}, {}, {}]
  dataSource1 = [{}, {}, {}];
  expandedElement: PeriodicElement | null;
  displayedColumns2 = ['name', 'annual', 'amt', 'icons'];
  dataSource2 = ELEMENT_DATA2;
  inputData: any;
  plannerObj = {
    existingAsset: 0, liabilities: 0, lifeInsurancePremiums: 0, livingExpense: 0, dependantNeeds: 0, goalsMeet: 0, GrossLifeinsurance: 0, incomeSource: 0,
    existingLifeInsurance: 0, additionalLifeIns: 0
  }
  setLogo = [{
    heading: 'Life insurance',
    logo: '/assets/images/svg/LIbig.svg',
    bigLogo:'/assets/images/svg/LIbig.svg',

  }, {
    value: '1',
    header: 'Add Health Insurance',
    smallHeading: 'health insurance',
    insuranceType: 5,
    logo: '/assets/images/svg/helth-insurance.svg',
    bigLogo:'/assets/images/svg/HIbig.svg',
    heading: 'Health insurance',
    subHeading: 'Select how you’d like to proceed with planning for health insurance policies.'
  }, {
    value: '2',
    logo: '/assets/images/svg/Criticalillness.svg',
    bigLogo:'/assets/images/svg/CIbig.svg',
    header: 'Add Critical Illness',
    smallHeading: 'critical illness',
    insuranceType: 6,
    heading: 'Critical illness',
    subHeading: 'Select how you’d like to proceed with planning for critical insurance policies.'
  }, {
    value: '3',
    logo: '/assets/images/svg/Cancercare.svg',
    bigLogo:'/assets/images/svg/CCbig.svg',
    header: 'Add Cancer Care',
    smallHeading: 'cancer care',
    insuranceType: 11,
    heading: 'Cancer care',
    subHeading: 'Select how you’d like to proceed with planning for cancer insurance policies.'
  }, {
    value: '4',
    logo: '/assets/images/svg/Personalaccident.svg',
    bigLogo:'/assets/images/svg/PAbig.svg',
    header: 'Add Personal Accident',
    heading: 'Personal accident',
    smallHeading: 'personal accident',
    insuranceType: 7,
    subHeading: 'Select how you’d like to proceed with planning for personal insurance policies.'
  }, {
    value: '5',
    logo: '/assets/images/svg/Householders.svg',
    bigLogo:'/assets/images/svg/Hbig.svg',
    header: 'Add Householders',
    smallHeading: 'householders',
    insuranceType: 9,
    heading: 'Householders',
    subHeading: 'Select how you’d like to proceed with planning for householders insurance policies.'
  }, {
    value: '6',
    logo: '/assets/images/svg/Fireinsurance.svg',
    bigLogo:'/assets/images/svg/Fibig.svg',
    header: 'Add Fire Insurance',
    smallHeading: 'fire insurance',
    insuranceType: 10,
    heading: 'Fire insurance',
    subHeading: 'Select how you’d like to proceed with planning for fire insurance policies.'
  },
  {
    value: '7',
    logo: '/assets/images/svg/Fireinsurance.svg',
    bigLogo:'/assets/images/svg/PAbig.svg',
    header: 'Add Travel Insurance',
    smallHeading: 'travel insurance',
    insuranceType: 8,
    heading: 'Travel insurance',
    subHeading: 'Select how you’d like to proceed with planning for travel insurance policies.'
  },{
    value: '8',
    logo: '/assets/images/svg/Fireinsurance.svg',
    bigLogo:'/assets/images/svg/PAbig.svg',
    header: 'Add Motor Insurance',
    smallHeading: 'motor insurance',
    insuranceType: 4,
    heading: 'Motor insurance',
    subHeading: 'Select how you’d like to proceed with planning for motor insurance policies.'
  }]

  logo: any;
  getData: any;
  advisorId: any;
  clientId: any;
  counter: any;
  isLoading: boolean;
  insuranceDetails: any;
  isLoadingPlan = true;
  @ViewChild('firstAccordion', { static: false }) firstAccordion: MatAccordion;
  @Output() outputChange = new EventEmitter<any>();
  @Output() stopLoaderWhenReponse = new EventEmitter<any>();
  inputReceive: any;
  needAnalysisData: any;
  dataSourceLiability: any;
  dataSourceLifeInsurance: any;
  dataSourceGoals: any;
  dataSourceIncome: any;
  dataSourceAsset: any;
  needAnalysisLoaded: any;
  clicked =false;
  pushArray =[];
  storedData: any;
  isRefreshRequired=false;
  loadedData: any;
  needAnalysisSavedData: any;
  displayList: any;

  constructor(private subInjectService: SubscriptionInject,
    private custumService: CustomerService,
    private utils: UtilService,
    private eventService: EventService,
    private planService: PlanService,
    private dialog: MatDialog,
    private ipService:InsurancePlanningServiceService
  ) {
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
  }

  @Input()
  set data(data) {
    this.inputData = data;
    // if(this.inputData && this.inputData.hasOwnProperty('insuranceType') && this.inputData.insuranceType == 1){
    //   this.displayedColumns3 = ['name', 'sum', 'premium', 'status','icons'];
    // }else{
    //   this.displayedColumns3 = ['name', 'sum', 'premium','status'];
    // }
    console.log('this life insurance', data)
    this.ipService.getIpData()
    .subscribe(res => {
      this.storedData = '';
      this.storedData = res;
    })
    this.setDetails(data)
    this.getGlobalDataInsurance();
  }

  get data() {
    return this.inputData;
  }
  @Input()
  set isLoaders(data) {
    this.dataSource1 = [{}, {}, {}];
    this.dataSouce3 = [{}, {}, {}];
    this.insuranceDetails = '';
    this.loader(1);
    this.isLoadingPlan = true;
    console.log(data)
  }

  get isLoaders() {
    return this.inputReceive;
  }
  ngOnInit() {
    this.panelOpenState = false;
    console.log('inputData', this.inputData)
  }
  getGlobalDataInsurance() {
    const obj = {};
    this.custumService.getInsuranceGlobalData(obj).subscribe(
      data => {
        console.log(data),
          this.displayList = data;
      }
    );
  }
  changeClick(){
    this.isClick =! this.isClick
  }
  suggestPolicyGi(data,value) {
    data.data= value;
    data.insuranceTypeId=  2;
    data.insuranceSubTypeId=  data.insuranceType;
    data.displayList=  this.displayList;
    data.showInsurance=  this.inputData;
    data.inputData = this.inputData;
    data.flag='ExistingSuggestNew';
  const fragmentData = {
    flag: 'suggestExistingPolicy',
    data:data,
    componentName: null,
    id: 1,
    state: 'open',
  };
  switch (data.insuranceType) {
    case 5:
      fragmentData.componentName = SuggestHealthInsuranceComponent;
      break;
    case 7:
      fragmentData.componentName = PersonalInsuranceComponent;
      break;
    case 6:
      fragmentData.componentName = CriticalInsuranceComponent;
      break;
    case 4:
      fragmentData.componentName = MotorInsuranceComponent;
      break;
    case 8:
      fragmentData.componentName = TravelInsuranceComponent;
      break;
    case 9:
      fragmentData.componentName = HouseholdersInsuranceComponent;
      break;
    case 10:
      fragmentData.componentName = FireInsuranceComponent;
      break;
    default:
      fragmentData.componentName = SuggestHealthInsuranceComponent;
      break;

  }
  const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
    sideBarData => {
      console.log('this is sidebardata in subs subs : ', sideBarData);
      if (UtilService.isDialogClose(sideBarData)) {
        if(sideBarData.refreshRequired){
          // this.addGeneralInsurance(sideBarData.data.id);
          this.getDetailsInsurance()
        }
        console.log('this is sidebardata in subs subs 2: ', sideBarData);
        rightSideDataSub.unsubscribe();
      }
    }
  );
}
  setDetails(data) {
    if (this.inputData) {
      this.getData = data
      this.setLogo.forEach(element => {
        if (element.heading == data.heading) {
          this.logo = element.bigLogo
          this.needAnalysisData = element
          this.needAnalysisData.id = data.id
          // Object.assign( this.needAnalysisData.id, {id: data.id});
          //Object.assign( this.needAnalysisData, {id: data.id});
        }
      });
      if(data.dataLoaded){
        if(this.callApiData(data)){
          this.getDetailsInsurance()
        }else{
          this.getForkJoinResponse(this.loadedData)
          this.loadedData ='';
        }
      }
    }
  }
  callApiData(data){
    // if(this.isRefreshRequired){
    //   return true
    // }else{
      if(this.storedData){
        this.storedData.forEach(element => {
          if(element.id == this.inputData.id){
            this.loadedData = element
          }
          });
      }
      let refreshData = this.isRefreshRequired;
      this.isRefreshRequired = false;
      return this.loadedData && refreshData ? true  : this.loadedData ? false:  true
    // }

  }
  formatNumber(data, noOfPlaces: number = 0) {
    if (data) {
      data = parseFloat(data)
      if (isNaN(data)) {
        return data;
      } else {
        // console.log(' original ', data);
        const formattedValue = parseFloat((data).toFixed(noOfPlaces)).toLocaleString('en-IN', { 'minimumFractionDigits': noOfPlaces, 'maximumFractionDigits': noOfPlaces });
        // console.log(' original / roundedValue ', data, ' / ', formattedValue);
        return formattedValue;
      }
    } else {
      return '0';
    }
    return data;
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
        if(this.inputData.insuranceType == 1){
          this.planService.deleteSuggestPolicy(data.id).subscribe(
            data => {
              this.eventService.openSnackBar('Insurance is deleted', 'Dismiss');
              this.getDetailsInsurance()
              dialogRef.close();
              this.isRefreshRequired = true;
            },
            error => this.eventService.showErrorMessage(error)
          );
        }else{
          this.planService.deleteSuggestNew(data.id).subscribe(
            data => {
              this.eventService.openSnackBar('Insurance is deleted', 'Dismiss');
              this.getDetailsInsurance()
              dialogRef.close();
              this.isRefreshRequired = true;
            },
            error => this.eventService.showErrorMessage(error)
          );
        }

        

      },
      negativeMethod: () => {
        console.log('2222222222222222222222222222222222222');
      }
    };
    console.log(dialogData + '11111111111111');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
      autoFocus: false,

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  deleteInsurance() {
    const obj={
        id:this.inputData.id,
        clientId :this.clientId,
        familyMemberId:[],
        insuranceTypeId:this.inputData.heading == 'Life insurance' ? 1 : 2,
        insuranceSubTypeId:this.inputData.insuranceType
    }
    this.inputData.owners.forEach(element => {
      obj.familyMemberId.push(element.ownerId ? element.ownerId : this.clientId);
    });
    const dialogData = {
      header: 'DELETE INSURANCE',
      body: 'Are you sure you want to delete this insurance?',
      body2: 'This cannot be undone.',
      btnYes: 'CANCEL',
      btnNo: 'DELETE',
    
      positiveMethod: () => {
        this.planService.deleteInsurancePlanning(obj).subscribe((data) => {
          this.eventService.openSnackBar("insurance has been deleted successfully", "Dismiss");
          this.isRefreshRequired = true;
          this.outputChange.emit({id : '',isRefreshRequired:true});
          // this.getDetailsInsurance()
          dialogRef.close()
        }, (err) => { this.eventService.openSnackBar(err, "Dismiss") })
      },
      negativeMethod: () => {
      }
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
      autoFocus: false,
    });
  }
  getDetailsInsurance() {
    this.dataSource1 = [{}, {}, {}];
    this.dataSouce3 = [{}, {}, {}];
    this.insuranceDetails = '';
    let obj = {
      // clientId: this.clientId,
      // familyMemberId: [],
      id: this.inputData.id,
    }
    let obj2 = {
      clientId: this.clientId,
      familyMemberId: [],
      advisorId: this.advisorId,
    }
    let obj3={
      id:[this.inputData.id],
      insuranceType:this.inputData.insuranceType
    }
    this.inputData.owners.forEach(element => {
      // obj.familyMemberId.push(element.ownerId);
      obj2.familyMemberId.push(element.ownerId);
    });
    this.loader(1);
    this.isLoadingPlan = true;
    // this.planService.getDetailsInsurance(obj).subscribe(
    //   data => this.getDetailsInsuranceRes(data),
    //   err => {
    //     this.eventService.openSnackBar(err, 'Dismiss');
    //     this.loader(-1);
    //     this.isLoadingPlan = false;
    //   }
    // );
    const detailofInsurance = this.planService.getDetailsInsurance(obj);
    // const suggestPolicyGetGi = this.planService.getGeneralInsuranceSuggestPolicy(this.inputData.id);
    const suggestPolicyGetGi = this.planService.getGeneralInsuranceNeedAnalysis(obj3);
    const recommndationGetGi = this.planService.getGeneralInsuranceAdvice(this.inputData.id);
    const suggestPolicyGet = this.planService.getSuggestPolicy(obj2);
    const recommndationGet = this.planService.getInsuranceAdvice(obj2);
    const needAnalysis = this.planService.getNeedBasedDetailsLifeInsurance(this.inputData.id);
    const sendPolicy = this.inputData.insuranceType != 1 ? suggestPolicyGetGi : suggestPolicyGet;
    const sendRecommendation = this.inputData.insuranceType != 1 ? recommndationGetGi : recommndationGet;
    forkJoin(detailofInsurance, sendPolicy, sendRecommendation, needAnalysis).subscribe(result => {
      result['id'] = this.inputData.id;
      this.plannerObj = this.setAll(this.plannerObj, 0);
      this.pushArray.push(result);
      this.ipService.setIpData(this.pushArray);
      this.getForkJoinResponse(result);
    }, err => {
      this.eventService.openSnackBar(err, 'Dismiss');
      this.stopLoaderWhenReponse.emit(true);
      this.insuranceDetails = '';
      this.dataSource1 = [];
      this.dataSouce3 = [];
      this.loader(-1);
      this.isLoadingPlan = false;
    })
  }
  setAll(obj, val) {
    Object.keys(obj).forEach(function (index) {
      obj[index] = val
    });
    return obj;
  }
  getForkJoinResponse(result){
    this.needAnalysisSavedData = result[3]
    this.panelOpenState = false;
    this.getNeedAnalysisData(result[3]);
    this.getDetailsInsuranceRes(result[0])
    let suggestedData = result[1];
    if (suggestedData) {
      if(this.inputData.insuranceType != 1){
        let current = suggestedData.current.length > 0 ? suggestedData.current[0] : [];
        let suggested = suggestedData.suggested.length > 0 ? suggestedData.suggested : []
        let mergeArray = [...suggested];
        mergeArray.forEach(element => {
          element.insurance = element.insuranceDetails
          element.expanded = false;
        });
        this.dataSouce3 =this.getFilterDataNeedAnalysis(mergeArray) ;
      }else{
        suggestedData.forEach(element => {
          element.expanded = false;
          element.displayHolderSumInsured = element.insurance.sumAssured ? element.insurance.sumAssured : element.insurance.sumInsuredIdv
        });
        this.dataSouce3 = suggestedData;
      }

    } else {
      this.dataSouce3 = [];
    }
    if (result[2]) {
      this.dataSource1 = result[2];
    } else {
      this.dataSource1 = [];
    }
    this.stopLoaderWhenReponse.emit(true);
    this.isLoadingPlan = false;
    if (this.inputData.insuranceType == 1) {
      this.firstAccordion ? this.firstAccordion.closeAll() : '';
    }
  }
  getFilterDataNeedAnalysis(array){
    if(array){
      this.getSumAssured(array);
      array.forEach(singleInsuranceData => {
        singleInsuranceData.insuranceDetails = singleInsuranceData.insurance ? singleInsuranceData.insurance : singleInsuranceData.insuranceDetails;
        if (singleInsuranceData.insuranceDetails && singleInsuranceData.insuranceDetails.insuredMembers.length > 0) {
          singleInsuranceData.displayHolderName = singleInsuranceData.insuranceDetails.insuredMembers[0].name;
          singleInsuranceData.displayHolderSumInsured = this.formatNumber(singleInsuranceData.insuranceDetails.insuredMembers[0].sumInsured ? singleInsuranceData.insuranceDetails.insuredMembers[0].sumInsured : singleInsuranceData.insuranceDetails.sumInsuredIdv);
          if (singleInsuranceData.insuranceDetails.insuredMembers.length > 1) {
            for (let i = 1; i < singleInsuranceData.insuranceDetails.insuredMembers.length; i++) {
              if (singleInsuranceData.insuranceDetails.insuredMembers[i].name) {
                const firstName = (singleInsuranceData.insuranceDetails.insuredMembers[i].name as string).split(' ')[0];
                singleInsuranceData.displayHolderName += ', ' + firstName;
                if(singleInsuranceData.insuranceDetails.insuredMembers[i].sumInsured){
                  singleInsuranceData.insuranceDetails.insuredMembers[i].sumInsured = this.formatNumber(singleInsuranceData.insuranceDetails.insuredMembers[i].sumInsured,0);
                  const firstSumInsured = (singleInsuranceData.insuranceDetails.insuredMembers[i].sumInsured as string).split(' ')[0];
                  singleInsuranceData.displayHolderSumInsured +=', ₹' + firstSumInsured;
                }else{
                  singleInsuranceData.displayHolderSumInsured = singleInsuranceData.insuranceDetails.sumInsuredIdv ? singleInsuranceData.insuranceDetails.sumInsuredIdv : 0;
                }
              }
            }
          }
        } else {
          singleInsuranceData.displayHolderSumInsured = singleInsuranceData.insuranceDetails.sumInsuredIdv;;
        }
      });
    }else{
      array=[]
    }

    return array;
  }
  getSumAssured(data){
    data.forEach(element => {
      element.insuranceDetails = element.insurance ? element.insurance : element.insuranceDetails;
       element.sumAssured = 0;
          if (element.insuranceDetails && element.insuranceDetails.hasOwnProperty('insuredMembers') && element.insuranceDetails.insuredMembers.length > 0) {
            element.insuranceDetails.insuredMembers.forEach(ele => {
              ele.sumAssured += ele.sumInsured;
            });
          } else if (element.insuranceDetails && element.insuranceDetails.hasOwnProperty('policyFeatures') && element.insuranceDetails.policyFeatures.length > 0) {
            element.insuranceDetails.policyFeatures.forEach(ele => {
              element.insuranceDetails.sumInsuredIdv += ele.featureSumInsured;
            });
          } else {
            element.insuranceDetails.sumInsuredIdv= element.insuranceDetails.sumInsuredIdv;
          }

          if (!element.insuranceDetails.sumInsuredIdv && element.insuranceDetails && element.insuranceDetails.hasOwnProperty('addOns') && element.insuranceDetails.addOns.length > 0) {
            element.insuranceDetails.addOns.forEach(ele => {
              element.insuranceDetails.sumInsuredIdv += ele.addOnSumInsured;
            });
          }
    });

  }
  recommend(data) {
    const obj = {
      id: this.inputData.id,
      insuranceId: data.insurance.id
    }
    if (this.inputData.insuranceType == 1) {
      this.planService.updateRecommendationsLI(obj).subscribe(
        data => {
          this.getDetailsInsurance()
          console.log(data)
        },
        err => {
          this.eventService.openSnackBar(err, 'Dismiss');
        }
      );
    } else {
      this.planService.updateRecommendationsGI(obj).subscribe(
        data => {
          this.getDetailsInsurance()
          console.log(data)
        },
        err => {
          this.eventService.openSnackBar(err, 'Dismiss');
        }
      );
    }

  }
  getDetailsInsuranceRes(data) {
    console.log('getDetailsInsuranceRes res', data)
    if (data) {
      this.insuranceDetails = data
      this.insuranceDetails.needAnalysis.plannerNotes = this.insuranceDetails.needAnalysis.plannerNotes ? this.insuranceDetails.needAnalysis.plannerNotes.replace(/(<([^>]+)>)/ig, '') : '-';
      this.dataSource1 = ELEMENT_DATA1;
    }

  }
  getNeedAnalysisData(data) {
    if (data) {
      this.needAnalysisLoaded = data;
      this.dataSourceLiability = this.getFilterData(data[1], 'liabilities', 'name', 'total_loan_outstanding');
      this.plannerObj.lifeInsurancePremiums = data[2.1][0].total_amount;
      this.dataSourceLifeInsurance = this.getFilterData(data[2.2], 'dependantNeeds', 'name', 'amount');
      this.plannerObj.livingExpense = 0;
      this.dataSourceLifeInsurance.forEach(element => {
        if (element.selected) {
          this.plannerObj.livingExpense += (element.amount * element.percent) / 100;
        }
      });
      this.dataSourceGoals = this.getFilterData(data[3], 'goalsMeet', 'goalName', 'goalFV')
      this.plannerObj.GrossLifeinsurance = data[4][0].total_amount;
      this.dataSourceIncome = this.getFilterData(data[5], 'incomeSource', 'name', 'amount')
      this.plannerObj.existingLifeInsurance = data[6][0].total_amount;
      this.dataSourceAsset = this.getFilterData(data[7], 'existingAsset', 'ownerName', 'currentValue')
      this.plannerObj.additionalLifeIns = data[8][0].total_amount;
    } else {
      this.plannerObj = this.setAll(this.plannerObj, 0);
      this.needAnalysisLoaded = '';
    }



  }
  getFilterData(data, totalAmount, name, amount) {
    if (data) {
      data.forEach(element => {
        element[name] = element.name;
        element[amount] = element.amount;
        element.percent = element.percentage;
        element.selected = element.is_selected ? true : false;
      });
      data = data.filter(item => item[amount] > 0)
      this.plannerObj[totalAmount] = data[0].total_amount
    } else {
      data = [];
    }

    return data;
  }
  isExpansionDisabled(): string {
    if (this.blockExpansion) {
      return 'disabled-pointer';
    }
    return '';
  }
  changeValue(array, ele) {
    this.clicked = true;
    // ele.expanded = true;
    array.filter(element => {
      element.insurance.suggestion= element.insurance.suggestion ? element.insurance.suggestion.replace(/(<([^>]+)>)/ig, '') : null;
      if(element.insurance.id == ele.insurance.id && ele.expanded == true){
        element.expanded = false;
      }else if(element.insurance.id != ele.insurance.id){
        element.expanded = false;
      }else{
        element.expanded = this.isClick ? false : true;

      }
    });
  }
  loader(increamenter) {
    this.counter += increamenter;
    if (this.counter == 0) {
      this.isLoading = false;
    } else {
      this.isLoading = true;
    }
  }
  getDataInv(data) {
    data.expanded = !data.expanded;
    console.log(data);
  }
  needAnalysis(data) {
    if (this.inputData.insuranceType == 1) {
      this.inputData.insuranceDetails = this.insuranceDetails;
      this.inputData.needAnalysisSaved = this.needAnalysisSavedData ? this.needAnalysisSavedData : null;
      const fragmentData = {
        flag: 'opencurrentpolicies',
        data: this.inputData,
        componentName: AddPlaninsuranceComponent,
        id: 1,
        state: 'open',
      };
      const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
        sideBarData => {
          console.log('this is sidebardata in subs subs : ', sideBarData);
          if (UtilService.isDialogClose(sideBarData)) {
            if (sideBarData.data) {
              // this.getDetailsInsurance();
              this.isRefreshRequired = sideBarData.data;
              this.outputChange.emit({id : this.inputData.id,isRefreshRequired:sideBarData.data});
            }
            console.log('this is sidebardata in subs subs 2: ', sideBarData);
            rightSideDataSub.unsubscribe();
          }
        }
      );
    } else {
      const fragmentData = {
        flag: 'app-customer',
        id: 1,
        data: this.needAnalysisData,
        direction: 'top',
        componentName: ShowHealthPlanningComponent,
        state: 'open'
      };
      const subscription = this.eventService.changeUpperSliderState(fragmentData).subscribe(
        upperSliderData => {
          if (UtilService.isDialogClose(upperSliderData)) {
            // this.getClientSubscriptionList();
            this.isRefreshRequired = upperSliderData['data'].isRefreshRequired;
            this.outputChange.emit({id : this.inputData.id,isRefreshRequired:upperSliderData['data'].isRefreshRequired});
            subscription.unsubscribe();
          }
        }
      );
    }



  }

  suggestPolicy(data) {
    if(data){
      data.inputData = this.inputData
    }else{
      data = this.inputData
    }
    const fragmentData = {
      flag: 'opencurrentpolicies',
      data: data,
      componentName: AddSuggestPolicyComponent,
      id: 1,
      state: 'open',
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          if (UtilService.isRefreshRequired(sideBarData)) {
            // this.isRefreshRequired = true;
            this.getDetailsInsurance();
          }
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
          rightSideDataSub.unsubscribe();
        }
      }
    );
  }

  recommendationsPolicy(data) {
    const fragmentData = {
      flag: 'opencurrentpolicies',
      data: this.inputData,
      componentName: AddRecommendationsInsuComponent,
      id: 1,
      state: 'open',
    };
    const rightSideDataSub = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(
      sideBarData => {
        console.log('this is sidebardata in subs subs : ', sideBarData);
        if (UtilService.isDialogClose(sideBarData)) {
          console.log('this is sidebardata in subs subs 2: ', sideBarData);
          rightSideDataSub.unsubscribe();
        }
      }
    );
  }




}
export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: "HDFC Ergo My Health Suraksha", name: '7,00,000', weight: "19,201", symbol: 'Waiting for approval' },
];

export interface PeriodicElement1 {
  name: string;
  sum: string;
  premium: string;
  returns: string;
  advice: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
  { name: "LIC Jeevan Saral", sum: '20,00,000', premium: "27,000", returns: '4.78%', advice: 'Stop paying premiums' },
];

export interface PeriodicElement2 {

  name: string;
  annual: string;
  amt: string;

}

const ELEMENT_DATA2: PeriodicElement2[] = [
  { name: "LIC Jeevan Saral", annual: "-", amt: '12,000,00' },
  { name: "LIC Jeevan Saral", annual: "-", amt: '12,000,00' },
  { name: "LIC Jeevan Saral", annual: "-", amt: '12,000,00' },
  { name: "LIC Jeevan Saral", annual: "-", amt: '12,000,00' },
  { name: "LIC Jeevan Saral", annual: "-", amt: '12,000,00' },
  { name: "LIC Jeevan Saral", annual: "-", amt: '12,000,00' },
  { name: "LIC Jeevan Saral", annual: "-", amt: '12,000,00' },
  { name: "LIC Jeevan Saral", annual: "-", amt: '12,000,00' },

];
export interface PeriodicElement4 {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA4: PeriodicElement4[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];