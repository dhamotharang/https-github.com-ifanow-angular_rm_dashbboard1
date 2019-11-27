import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubscriptionService } from '../../../subscription.service';
import { EventService } from 'src/app/Data-service/event.service';
import { SubscriptionInject } from '../../../subscription-inject.service';
import { AuthService } from "../../../../../../../auth-service/authService";
import { UtilService } from "../../../../../../../services/util.service";

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

  showLoader;

  planSettingData;
  advisorId;

  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.getSettingsPlanData();
    // this.openFragment('', 'plan');
  }

  getSettingsPlanData() {
    this.showLoader = true;
    const obj = {
      // advisorId: 12345
      advisorId: this.advisorId,
      mapped: false
    };
    this.subService.getSubscriptionPlanSettingsData(obj).subscribe(
      data => this.getSettingsPlanResponse(data),
      err => this.getFilerrorResponse(err)
    );
  }

  getSettingsPlanResponse(data) {
    console.log('get plan', data);
    this.planSettingData = data;
    this.showLoader = false;
  }

  getFilerrorResponse(err) {
    this.dataService.openSnackBar(err, 'Dismiss');
  }

  openFragment(singlePlan, data) {
    this.subinject.pushUpperData(singlePlan);
    // singlePlan.flag = data;
    (singlePlan == '') ? singlePlan = data : singlePlan.flag = data
    const fragmentData = {
      flag: 'app-subscription-upper-slider',
      data: singlePlan,
      state: 'open'
    };
    const subscription = this.eventService.changeUpperSliderState(fragmentData).subscribe(
      upperSliderData => {
        if (UtilService.isDialogClose(upperSliderData)) {
          this.getSettingsPlanData();
          subscription.unsubscribe();
        }
      }
    );

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
  }
}
