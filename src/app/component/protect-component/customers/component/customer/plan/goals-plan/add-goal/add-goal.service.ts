import { Injectable } from '@angular/core';
import { EventService } from 'src/app/Data-service/event.service';
import { PlanService } from '../../plan.service';
import { Subject } from 'rxjs';
import { copyArrayItem } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class AddGoalService {

  constructor(
    private eventService: EventService,
    private plansService: PlanService,
  ) { }

  refreshObservable = new Subject();

  allocateAssetToGoal(event, advisor_client_id, selectedGoal){

    let asset:any = event.item.data;
    let obj = {
      ...advisor_client_id,
      assetId: asset.assetId,
      assetType: asset.assetType,
      goalId: selectedGoal.remainingData.id,
      goalType: selectedGoal.goalType,
      percentAllocated: 100
    }
    this.plansService.allocateOtherAssetToGoal(obj).subscribe(res => {
      this.refreshObservable.next();
      this.plansService.assetSubject.next(res);
      this.eventService.openSnackBar("Asset allocated to goal", "Dismiss");
    }, err => {
      this.eventService.openSnackBar(err);
    })
  }
}
