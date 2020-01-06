import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubscriptionService } from '../../../subscription.service';
import { EventService } from 'src/app/Data-service/event.service';
import { SubscriptionInject } from '../../../subscription-inject.service';
import { AuthService } from "../../../../../../../auth-service/authService";
import { UtilService } from "../../../../../../../services/util.service";
import { SubscriptionUpperSliderComponent } from '../../common-subscription-component/upper-slider/subscription-upper-slider.component';

@Component({
  selector: 'app-plans-settings',
  templateUrl: './plans-settings.component.html',
  styleUrls: ['./plans-settings.component.scss']
})
export class PlansSettingsComponent implements OnInit {

  constructor(public dialog: MatDialog, private subService: SubscriptionService,
    private dataService: EventService, private eventService: EventService, private subinject: SubscriptionInject) {
  }

  button: any;

  //showLoader;

  planSettingData = [{}, {}, {}];
  isLoading = false;
  advisorId;

  ngOnInit() {

    this.advisorId = AuthService.getAdvisorId();
    this.getSettingsPlanData();
    // this.openFragment('', 'plan');
  }

  getSettingsPlanData() {
    this.isLoading = true;
    const obj = {
      // advisorId: 12345
      advisorId: this.advisorId,
      mapped: false
    };
    this.planSettingData = [{}, {}, {}];

    this.subService.getSubscriptionPlanSettingsData(obj).subscribe(
      data => this.getSettingsPlanResponse(data), (error) => {
        this.eventService.openSnackBar('Somthing went worng!', 'dismiss');
        // this.planSettingData = [];
        this.isLoading = false;
      }
    );
  }

  getSettingsPlanResponse(data) {
    this.isLoading = false;
    console.log('get plan', data);
    this.planSettingData = data;
    //this.showLoader = false;
  }

  getFilerrorResponse(err) {
    this.dataService.openSnackBar(err, 'Dismiss');
  }

  // openFragment(singlePlan, data) {
  //   this.subinject.pushUpperData(singlePlan);
  //   (singlePlan == '') ? singlePlan = data : singlePlan.flag = data
  //   const fragmentData = {
  //     flag: 'app-subscription-upper-slider',
  //     data: singlePlan,
  //     state: 'open'
  //   };
  //   const subscription = this.eventService.changeUpperSliderState(fragmentData).subscribe(
  //     upperSliderData => {
  //       if (UtilService.isDialogClose(upperSliderData)) {
  //         this.getSettingsPlanData();
  //         subscription.unsubscribe();
  //       }
  //     }
  //   );

  // /* const dialogRef = this.dialog.open(UpperSliderComponent, {
  //    width: '1400px',
  //    data: Fragmentdata,
  //    autoFocus: false,
  //    panelClass: 'dialogBox',
  //
  //  });
  //
  //  dialogRef.afterClosed().subscribe(result => {
  //
  //  });*/

  openFragment(singlePlan, data) {
    (singlePlan == '') ? singlePlan = data : singlePlan.flag = data
    console.log('hello mf button clicked');
    const fragmentData = {
      flag: 'openUpper',
      id: 1,
      data: singlePlan,
      direction: 'top',
      componentName: SubscriptionUpperSliderComponent,
      state: 'open'
    };

    const subscription = this.eventService.changeUpperSliderState(fragmentData).subscribe(
      upperSliderData => {
        if (UtilService.isDialogClose(upperSliderData)) {
          // this.getClientSubscriptionList();
          this.getSettingsPlanData();

          subscription.unsubscribe();
        }
      }
    );
  }
}
