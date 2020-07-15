import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/Data-service/event.service';
import { PlanService } from '../../plan.service';
import { Subscription, Subscriber } from 'rxjs';
import { AuthService } from 'src/app/auth-service/authService';
import { AddGoalService } from '../add-goal/add-goal.service';
import { ValidatorType } from 'src/app/services/util.service';
import { MatProgressButtonOptions } from 'src/app/common/progress-button/progress-button.component';

@Component({
  selector: 'app-reallocate-asset',
  templateUrl: './reallocate-asset.component.html',
  styleUrls: ['./reallocate-asset.component.scss']
})
export class ReallocateAssetComponent implements OnInit {

  remainingAllocation:string = '0';
  availableAllocation:number = 0;
  reallocationFG:FormGroup;
  allocationData:any = {};
  goalData:any = {};
  subscriber = new Subscriber();
  advisorId:any;
  clientId:any;
  decimalValidator = ValidatorType;
  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Save',
    buttonColor: 'accent',
    barColor: 'accent',
    raised: true,
    stroked: false,
    mode: 'determinate',
    value: 10,
    disabled: false,
    fullWidth: false,
  };

  constructor(
    public dialogRef: MatDialogRef<ReallocateAssetComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb:FormBuilder,
    private eventService:EventService,
    private plansService:PlanService,
    private allocateOtherAssetService: AddGoalService
  ) {
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
    this.allocationData = this.dialogData.allocationData;
    this.goalData = this.dialogData.goalData;
  }

  ngOnInit() {
    let allocationToThisGoal = 0;
    const otherAllocated = this.allocationData.goalAssetMapping.filter(map => {
      if(map.goalId == this.goalData.remainingData.id && map.goalType == this.goalData.remainingData.goalType) {
        allocationToThisGoal = map.percentAllocated;
        return false;
      } else {
        return map.percentAllocated;
      }
    })
    
    this.reallocationFG = this.fb.group({
      allocatedPercentage: [allocationToThisGoal, [Validators.required]]
    });

    this.subscriber.add(
      this.reallocationFG.controls.allocatedPercentage.valueChanges.subscribe((value:string) => {
        if(value) {
          this.remainingAllocation = (this.availableAllocation - parseFloat(value)).toFixed(2);
        } else {
          this.remainingAllocation = '0';
        }
      })
    )

    this.availableAllocation = 100 - otherAllocated.reduce((a, v) => a + v, 0);
  }

  reallocate(){
    if(this.reallocationFG.invalid || this.barButtonOptions.active) {
      this.reallocationFG.markAllAsTouched();
      return;
    }
    this.barButtonOptions.active = true;
    let obj = {
      advisorId: this.advisorId,
      clientId:this.clientId,
      assetId: this.allocationData.assetId,
      assetType: this.allocationData.assetType,
      goalId: this.goalData.remainingData.id,
      goalType: this.goalData.goalType,
      percentAllocated: parseFloat(this.reallocationFG.controls.allocatedPercentage.value).toFixed(2)
    }
    this.plansService.allocateOtherAssetToGoal(obj).subscribe(res => {
      this.eventService.openSnackBar("Asset allocation updated");
      this.allocateOtherAssetService.refreshObservable.next();
      this.dialogRef.close();
    }, err => {
      this.eventService.openSnackBar(err);
      this.barButtonOptions.active = false;
    })
  }

}