import { Component, OnInit } from '@angular/core';

import { UtilService } from "../../../../../../../services/util.service";
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

export interface PeriodicElement {
  position: string;
  name: string;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'Fixed Deposit', name: 'Continue till maturity', weight: '13,000', symbol: '5,28,000' },
  { position: 'LIC Jeevan Saral', name: 'Pre close this asset', weight: '13,000', symbol: '5,28,000' },
];

@Component({
  selector: 'app-goals-plan',
  templateUrl: './goals-plan.component.html',
  styleUrls: ['./goals-plan.component.scss']
})
export class GoalsPlanComponent implements OnInit {

  constructor(private subInjectService: SubscriptionInject, private eventService: EventService, ) {
  }
  isLoading = false;
  ngOnInit() {
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'icons'];
  dataSource = ELEMENT_DATA;

  openMfAllocation(data) {
    console.log('hello mf button clicked');
    const fragmentData = {
      flag: 'openMfAllocation',
      data,
      componentName: MfAllocationsComponent,
      id: 1,
      state: 'open70'
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
  openPreferences(data) {
    console.log('hello mf button clicked');
    const fragmentData = {
      flag: 'openPreferences',
      data,
      componentName: PreferencesComponent,
      id: 1,
      state: 'open40'
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
  openallocations(data) {
    console.log('hello mf button clicked');
    const fragmentData = {
      flag: 'openallocations',
      data,
      componentName: AddGoalComponent,
      id: 1,
      state: 'open25'
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
  openKeyinfo(data) {
    console.log('hello mf button clicked');
    const fragmentData = {
      flag: 'openKeyinfo',
      data,
      componentName: KeyInfoComponent,
      id: 1,
      state: 'open25'
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
  openEdit(data) {
    console.log('hello mf button clicked');
    const fragmentData = {
      flag: 'openEdit',
      data,
      componentName: EditNoteGoalComponent,
      id: 1,
      state: 'open65'
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
  openView(data) {
    console.log('hello mf button clicked');
    const fragmentData = {
      flag: 'openView',
      data,
      componentName: ViewPastnotGoalComponent,
      id: 1,
      state: 'open35'
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

  openCalculators(data) {
    console.log('hello mf button clicked');
    const fragmentData = {
      flag: 'openCalculators',
      data,
      componentName: CalculatorsComponent,
      id: 1,
      state: 'open'
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

  openAddgoals(data) {
    console.log('hello mf button clicked');
    const fragmentData = {
      flag: 'openAddgoals',
      id: 1,
      data,
      direction: 'top',
      componentName: AddGoalsComponent,
      state: 'open'
    };

    const subscription = this.eventService.changeUpperSliderState(fragmentData).subscribe(
      upperSliderData => {
        if (UtilService.isDialogClose(upperSliderData)) {
          // this.getClientSubscriptionList();
          subscription.unsubscribe();
        }
      }
    );
  }
}


