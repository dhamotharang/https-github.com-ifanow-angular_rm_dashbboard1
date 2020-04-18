import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../../../settings.service';
import { EventService } from 'src/app/Data-service/event.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/auth-service/authService';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { OrgSettingServiceService } from '../../../../org-setting-service.service';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.scss']
})
export class AddTeamMemberComponent implements OnInit, OnDestroy {
  usersForm: FormGroup;
  subscription: Subscription = new Subscription();
  isLoading: boolean;
  filteredUsers: any;
  selectedUser: any = {};
  @Input() data: any = {};
  advisorId: any;
  teamMember: FormGroup;
  teamMembers: any;
  selectedMember: any;
  showSpinner = false;

  constructor(
    private settingsService: SettingsService,
    private eventService: EventService,
    private fb: FormBuilder,
    private subInjectService : SubscriptionInject,
    private orgSetting: OrgSettingServiceService,
  ) {
    this.advisorId = AuthService.getAdvisorId();
  }

  ngOnInit() {
    this.createForm();
    this.getdataForm('')
    this.getTeamMembers()
    if (this.data) {
      this.initializeUserDetails();
    }
    // this.subscribeValueChange();
  }

  initializeUserDetails() {

  }
  chooseMember() { }
  createForm() {
    this.usersForm = this.fb.group({
      userInput: [''],
    })
  }
  getdataForm(data) {
    this.teamMember = this.fb.group({
      userInput: [(!data) ? '' : (data.fullName), [Validators.required]],
      emailId: [(!data) ? '' : data.emailId, [Validators.required]],
      mobileNo: [(!data) ? '' : data.mobileNo, [Validators.required]],
      userName: [(!data) ? '' : data.userName, [Validators.required]],
    });
  }
  getTeamMembers() {
    this.showSpinner = true
    const dataObj = {
      advisorId: this.advisorId
    }
    this.orgSetting.getTeamMember(dataObj).subscribe((res) => {
      console.log('team member details', res)
      this.showSpinner = false
      this.teamMembers = res;
    });
  }
  getFormControl(): any {
    return this.teamMember.controls;
  }
  Close(flag: boolean) {
    this.subInjectService.changeNewRightSliderState({ state: 'close', refreshRequired: flag });
  }
  selectTeamMember(teamMember) {
    console.log(teamMember)
    this.selectedMember = teamMember
  }
  saveTeamMember(){
    let obj = {
      id: this.data.id,
      ChildId: this.data.childId,
      emailId: this.selectedMember.email,
      mobileNo: this.selectedMember.mobile,
      parentName: this.selectedMember.fullName,
      parentId: this.selectedMember.adminAdvisorId,
      roleName: this.selectedMember.role.roleName,
    }
    this.orgSetting.updateAccessControl(obj).subscribe((res) => {
      console.log('team member details', res)
      this.teamMembers = res;
      this.eventService.openSnackBar("Reporting Manager Updated Successfully");
      this.close(true);
    }, (err) => {
      console.error(err);
      this.eventService.openSnackBar("Error occured.");
    });
  }
  
  chooseUser() {
    this.selectedUser = this.usersForm.get('userInput').value;
  }

  close(status = false){
    this.subInjectService.changeNewRightSliderState({state: 'close', refreshRequired: status});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
