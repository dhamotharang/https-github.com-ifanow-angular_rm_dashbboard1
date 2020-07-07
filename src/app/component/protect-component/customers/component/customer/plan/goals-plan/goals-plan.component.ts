import { Component, OnInit } from '@angular/core';

import { UtilService, LoaderFunction } from "../../../../../../../services/util.service";
import { SubscriptionInject } from "../../../../../AdviserComponent/Subscriptions/subscription-inject.service";
import { MfAllocationsComponent } from './mf-allocations/mf-allocations.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AddGoalComponent } from './add-goal/add-goal.component';
import { KeyInfoComponent } from './key-info/key-info.component';
import { CalculatorsComponent } from './calculators/calculators.component';
import { AddGoalsComponent } from '../add-goals/add-goals.component';
import { EventService } from 'src/app/Data-service/event.service';
import { EditNoteGoalComponent } from './edit-note-goal/edit-note-goal.component';
import { ViewPastnotGoalComponent } from './view-pastnot-goal/view-pastnot-goal.component';
import { PlanService } from '../plan.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/auth-service/authService';
import { ConfirmDialogComponent } from 'src/app/component/protect-component/common-component/confirm-dialog/confirm-dialog.component';
import * as Highcharts from 'highcharts';
import { MatDialog } from '@angular/material';
import { P } from '@angular/cdk/keycodes';

export interface PeriodicElement {
  position: string;
  name: string;
  weight: string;
  symbol: string;
}

@Component({
  selector: 'app-goals-plan',
  templateUrl: './goals-plan.component.html',
  styleUrls: ['./goals-plan.component.scss'],
  providers: [LoaderFunction]
})
export class GoalsPlanComponent implements OnInit {
  clientFamily: any[];

  isLoading = false;
  advisor_client_id: any = {
    advisorId: '',
    clientId: ''
  }
  selectedGoal: any = {};
  allGoals: any[] = [];
  hasCostOfDelay: boolean = false;

  // options set for bar charts
  // Reference - https://api.highcharts.com/highcharts/
  options: any = {
    chart: {
      type: 'bar',
      height: 200
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          align: 'left',
          inside: false
        }
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: ''
    },
    xAxis: {
      type: 'category',
      lineWidth: 0,
      tickWidth: 0
    },
    yAxis: {
      visible: false
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [{ data: [] }]
  }

  // options set for donut chart
  // TODO:- remove 'series' legend from the tooltip
  donutOptions = {
    chart: {
      type: 'pie',
      height: 170
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: ' <b>{point.percentage:.1f}%</b>'
    },
    credits: {
      enabled: false
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    plotOptions: {
      pie: {
        shadow: false
      }
    },
    legend: {
      floating: false,
    },
    series: []
  }

  constructor(
    private subInjectService: SubscriptionInject,
    private eventService: EventService,
    private plansService: PlanService,
    private dialog: MatDialog,
    public loaderFn: LoaderFunction
  ) {
    this.advisor_client_id.advisorId = AuthService.getAdvisorId();
    this.advisor_client_id.clientId = AuthService.getClientId();
  }


  ngOnInit() {
    // TODO:- implement loader fundtion
    this.loadAllGoals();
  }

  // load all goals created for the client and select the first goal
  loadAllGoals() {
    this.loaderFn.increaseCounter();
    this.allGoals = [{}, {}, {}];
    this.plansService.getAllGoals(this.advisor_client_id).subscribe((data: any[]) => {
      if (data) {
        this.allGoals = data.reverse().map(goal => this.mapGoalDashboardData(goal));
        this.loadSelectedGoalData(this.allGoals[0]);
        this.loaderFn.decreaseCounter();
      }
    }, err => {
      this.eventService.openSnackBar(err, "Dismiss");
      this.loaderFn.decreaseCounter();
    });
  }


  createChart(res) {
    const colors = ['green', 'blue', 'yellow', 'red'];
    const costDelay: Object = res.remainingData.costDelay;
    if (costDelay && costDelay.hasOwnProperty(0)) {
      this.hasCostOfDelay = true;
    } else {
      this.hasCostOfDelay = false;
      return;
    }

    let lumpsumSeries = JSON.parse(JSON.stringify(this.options));
    let sipSeries = JSON.parse(JSON.stringify(this.options));
    let count = 0;
    for (let k in costDelay) {
      if (costDelay.hasOwnProperty(k)) {
        lumpsumSeries.series[0].data.push({
          y: Math.round(costDelay[k].lumpsum_total),
          name: k + ' years',
          color: colors[count],
        })
        sipSeries.series[0].data.push({
          y: Math.round(costDelay[k].sip_total),
          name: k + ' years',
          color: colors[count]
        })
        count++;
      }
    }
    Highcharts.chart('monthly-chart-container-main', sipSeries);
    Highcharts.chart('lumpsum-chart-container-main', lumpsumSeries);

    if (res.remainingData.loan) {
      const loan = res.remainingData.loan;
      const chart = {
        data: [["Loan Amt", parseInt(loan.loanAmount)], ["Down Amt", parseInt(loan.downPayment)]],
        size: '100%',
        innerSize: '55%',
        showInLegend: true,
        dataLabels: {
          enabled: false
        }
      }
      this.donutOptions.series = [chart];
      Highcharts.chart('donut-chart-container', this.donutOptions);
    }
  }


  mapGoalDashboardData(goal: any) {
    let mapData: any = {};

    /**
     * TODO:- need to correct the logics for the following
     * 1. goal progress
     * 2. achieved value -- fix on html as well
     * 3. image for multi year goal
     */

    mapData.id = goal.id;
    mapData.goalType = goal.goalType;
    mapData.singleOrMulti = goal.singleOrMulti;
    if (goal.singleOrMulti == 1) {
      const goalSubData = goal.singleGoalModel;
      mapData.img = goalSubData.imageUrl;
      mapData.year = (new Date(goalSubData.goalStartDate).getFullYear()) + ' - ' + (new Date(goalSubData.goalStartDate).getFullYear());
      mapData.goalName = goalSubData.goalName;
      mapData.gv = goalSubData.goalFV;
      mapData.goalStartDate = goalSubData.goalStartDate;
      mapData.goalEndDate = goalSubData.goalStartDate; // because start hote hi khatam ho gaya
      mapData.achievedValue = goalSubData.achievedValue;
      mapData.dashboardData = {
        goalYear: new Date(goalSubData.goalStartDate).getFullYear(),
        presentValue: goalSubData.goalPresentValue,
        futureValue: goalSubData.goalFV,
        equity_monthly: goalSubData.equitySipAmount || 0,
        debt_monthly: goalSubData.debtSipAmount || 0,
        lump_equity: goalSubData.lumpsumEquityReqOnSSD || 0,
        lump_debt: goalSubData.lumpsumDebtReqOnSSD || 0,
        goalProgress: (goalSubData.achievedValue / goalSubData.goalFV * 100),
      }
      mapData.remainingData = goalSubData;
      mapData.remainingData.differentGoalYears = [goalSubData.goalStartDate];
    } else {
      const goalSubData: any = goal.multiYearGoalPlan;
      mapData.img = goalSubData.imageUrl;
      mapData.year = (new Date(goalSubData.differentGoalYears[0]).getFullYear()) + ' - ' + (new Date(goalSubData.differentGoalYears[goalSubData.differentGoalYears.length - 1]).getFullYear());
      mapData.goalName = goalSubData.name;
      mapData.gv = goalSubData.futureValue;
      mapData.achievedValue = goalSubData.achievedValue;
      mapData.goalStartDate = goalSubData.differentGoalYears[0];
      mapData.goalEndDate = goalSubData.differentGoalYears[goalSubData.differentGoalYears.length - 1];
      mapData.dashboardData = {
        goalYear: new Date(goalSubData.goalEndDate || goalSubData.vacationEndYr).getFullYear(),
        presentValue: goalSubData.presentValue,
        futureValue: goalSubData.futureValue,
        equity_monthly: this.getSumOfJsonMap(goalSubData.sipAmoutEquity),
        debt_monthly: this.getSumOfJsonMap(goalSubData.sipAmoutDebt),
        lump_equity: this.getSumOfJsonMap(goalSubData.lumpSumAmountEquity),
        lump_debt: this.getSumOfJsonMap(goalSubData.lumpSumAmountDebt),
        goalProgress: (goalSubData.achievedValue / goalSubData.futureValue * 100),
      }
      mapData.remainingData = goalSubData;
    }
    return mapData;
  }

  getSumOfJsonMap(json: Object = {}) {
    let sum = 0;
    for (let k in json) {
      if (json.hasOwnProperty(k)) {
        sum += json[k];
      }
    }
    return sum;
  }

  loadGlobalAPIs() {
    this.plansService.getListOfFamilyByClient(this.advisor_client_id).subscribe((data) => {
      this.clientFamily = data.familyMembersList.sort((a, b) => {
        return a.relationshipId - b.relationshipId;
      });
    }, (err) => { this.eventService.openSnackBar(err, "Dismiss") });
  }

  openAddgoals() {
    let data = {}
    const fragmentData = {
      flag: 'openAddgoals',
      id: 1,
      data: data,
      direction: 'top',
      componentName: AddGoalsComponent,
      state: 'open'
    };

    const sub = this.eventService.changeUpperSliderState(fragmentData).subscribe(
      upperSliderData => {
        if (UtilService.isRefreshRequired(upperSliderData)) {
          this.loadAllGoals();
          sub.unsubscribe();
        }
      }
    );
  }

  openInSideBar(data, flag) {
    let fragmentData = {
      flag: flag,
      id: 1,
      data: this.selectedGoal,
      componentName: undefined,
      state: 'open'
    };

    switch (flag) {
      case 'openCalculators':
        fragmentData.componentName = CalculatorsComponent;
        break;
      case 'openPreferences':
        fragmentData.componentName = PreferencesComponent;
        fragmentData.state = 'open40';
        break;
      case 'openView':
        fragmentData.componentName = ViewPastnotGoalComponent;
        fragmentData.state = 'open35';
        break;
      case 'openEdit':
        fragmentData.componentName = EditNoteGoalComponent;
        fragmentData.state = 'open65';
        break;
      case 'openKeyinfo':
        fragmentData.componentName = KeyInfoComponent;
        fragmentData.state = 'open25';
        fragmentData.data = this.selectedGoal.dashboardData;
        break;
      case 'openallocations':
        fragmentData.componentName = AddGoalComponent;
        fragmentData.data = this.clientFamily;
        fragmentData['isOverlayVisible'] = false;
        fragmentData.state = 'open25';
        break;
      case 'openMfAllocation':
        fragmentData.componentName = MfAllocationsComponent;
        fragmentData.state = 'open70';
        break;
      default:
        console.error('Undefiend flag found');
        return;
    }

    const subscription = this.subInjectService.changeNewRightSliderState(fragmentData).subscribe(sideBarData => {
      if (UtilService.isDialogClose(sideBarData)) {
        if (UtilService.isRefreshRequired(sideBarData)) {
          this.loadAllGoals();
        }
        subscription.unsubscribe();
      }
    });
  }

  loadSelectedGoalData(goalData) {
    this.selectedGoal = goalData;
    setTimeout(() => {
      this.createChart(this.selectedGoal);
    }, 100);
  }

  deleteGoal() {
    const dialogData = {
      header: 'DELETE',
      body: 'Are you sure you want to delete this goal?',
      body2: 'This cannot be undone.',
      btnYes: 'CANCEL',
      btnNo: 'DELETE',
      positiveMethod: () => {
        let deleteObj = {
          goalId: this.selectedGoal.id,
          goalType: this.selectedGoal.goalType
        }
        this.plansService.deleteGoal(deleteObj).subscribe((data) => {
          this.eventService.openSnackBar("Goal has been deleted successfully", "Dismiss");
          this.allGoals = this.allGoals.filter(goal => goal.id != this.selectedGoal.id);
          this.loadSelectedGoalData(this.allGoals[0]);
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

  // drag drop for assets brought from allocations tab
  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer.data[event.currentIndex]);
    let asset = event.previousContainer.data[event.currentIndex];
    // let obj = {
    //   ...this.advisor_client_id,
    //   assetId: asset.assetId,
    //   assetType: asset.assetType
    // }
    // this.plansService.allocateOtherAssetToGoal(obj).subscribe(res => {
    //   this.todo.push(res);
    //   this.eventService.openSnackBar("Asset allocated to goal", "Dismiss");
    // })
  }

  // dummy for allocation dragdrop list
  todo: any[] = [];
  logger(event) {
    // console.log(event)
  }
}


