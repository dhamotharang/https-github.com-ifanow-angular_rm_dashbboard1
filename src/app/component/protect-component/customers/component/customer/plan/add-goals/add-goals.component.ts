import {Component, OnInit, Input} from '@angular/core';
import {SubscriptionInject} from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import {EventService} from 'src/app/Data-service/event.service';
import {PlanService} from '../plan.service';
import {AuthService} from 'src/app/auth-service/authService';

@Component({
  selector: 'app-add-goals',
  templateUrl: './add-goals.component.html',
  styleUrls: ['./add-goals.component.scss']
})
export class AddGoalsComponent implements OnInit {
  goalTypeData: any;
  showGoalType: any;
  goalTypeFirstRowListData: any;
  goalTypeSecondRowListData: any;
  advisorId: any;
  familyList:any[] = [];
  @Input() data;

  constructor(public subInjectService: SubscriptionInject, private eventService: EventService, private planService: PlanService) { }

  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.getGoalGlobalData();
    this.familyList = this.data.familyList;
  }

  close() {
    this.eventService.changeUpperSliderState({state: 'close'});
  }

  // load goal types and related images to display
  getGoalGlobalData() {
    let obj = {
      advisorId: this.advisorId
    }
    this.planService.getGoalGlobalData(obj).subscribe(
      data => this.getGoalGlobalDataRes(data),
      error => this.eventService.showErrorMessage(error)
    )
  }

  // Set questionnaires for all the 
  getGoalGlobalDataRes(data) {
    data.forEach(element => {
      switch (element.id) {
        case 1: // Retirement
          element.imageUrl = '/assets/images/svg/retierment.svg';
          break;
        case 2: // House
          element.questions = {
            Q: 'Who are you planning this for?',
            Q1: 'When do you want to buy house?',
            Q2: "House's cost as on today?",
            Q3: 'Give this goal a name',
            Q4: 'Notes'
          }
          element.imageUrl = '/assets/images/svg/retierment.svg';
          element.validations = {
            minAgeFromPresent: 0,
            maxAgeFromPresent: 60,
            minCost: 500000,
            maxCost: 100000000,
            showAge: true,
            placeHolder: 'Age'
          }
          break;
        case 3: // Car
          element.questions = {
            Q1: 'When do you want to buy car?',
            Q2: "Car's cost as on today?",
            Q3: 'Give this goal a name',
            Q4: 'Notes'
          }
          element.imageUrl = '/assets/images/svg/car.svg';
          element.validations = {
            minAgeFromPresent: 0,
            maxAgeFromPresent: 20,
            minCost: 500000,
            maxCost: 50000000,
            showAge: true,
            placeHolder: 'Age'
          }
          break;
        case 4: // Marriage
          element.questions = {
            Q: 'Who are you planning this for?',
            Q1: 'Member"s age at the time of marriage?',
            Q2: 'Marriage"s expenses as on today?',
            Q3: 'Give this goal a name',
            Q4: 'Notes'
          }
          element.imageUrl = '/assets/images/svg/wedding.svg';
          element.validations = {
            minAge: 18,
            maxAge: 60,
            minCost: 100000,
            maxCost: 100000000,
            showAge: true,
            placeHolder: 'Age'
          }
          break;
        case 5: // Vacation
        element.questions = {
          Q1: 'Which year you plan to travel',
          Q2: 'Travel expense in today\'s value',
          Q3: 'Give this goal a name',
          Q4: 'Notes'
        }
          element.imageUrl = '/assets/images/svg/retierment.svg';
          element.validations = {
            minAgeFromPresent: 0,
            maxAgeFromPresent: 50,
            minCost: 25000,
            maxCost: 2500000,
            showAge: false,
            placeHolder: 'Year'
          }
          break;
        case 6: // Education
        element.questions = {
          Q: 'Who are you planning this for?',
          Q1: 'Member"s age at the time of course?',
          Q2: 'Annual Course expenses in today\'s value',
          Q3: 'Give this goal a name',
          Q4: 'Notes'
        }
          element.imageUrl = '/assets/images/svg/wedding.svg';
          element.validations = {
            minAge: 2,
            maxAge: 60,
            minCost: 50000,
            maxCost: 50000000,
            showAge: true,
            placeHolder: 'Age'
          }
          break;
        case 7: // Emergency
          element.questions = {
            Q1: 'Set a time frame to achieve this fund',
            Q2: 'Emergency fund you want to accumulate?',
            Q3: 'Give this goal a name',
            Q4: 'Notes'
          }
          element.imageUrl = '/assets/images/svg/wedding.svg';
          element.validations = {
            minAge: 1,
            maxAge: 60,
            minCost: 10000,
            maxCost: 10000000,
            showAge: true, // here age is true as we want fixed numbers
            placeHolder: 'Months'
          }
          break;
        case 8: // Wealth Creation
          element.questions = {
            Q: 'Who are you planning this for?',
            Q1: 'When do you want to it?',
            Q2: "wahts the target amount?",
            Q3: 'Give this goal a name',
            Q4: 'Notes'
          }
          element.imageUrl = '/assets/images/svg/wedding.svg';
          element.validations = {
            minAgeFromPresent: 2,
            maxAgeFromPresent: 28,
            minCost: 75000,
            maxCost: 100000000,
            showAge: true,
            placeHolder: 'Age'
          }
          break;
        case 9: // Big Spends
          element.questions = {
            Q1: 'When year do you plan this to happen?',
            Q2: 'How much does it cost today',
            Q3: 'Give this goal a name',
            Q4: 'notes'
          }
          element.imageUrl = '/assets/images/svg/wedding.svg';
          element.validations = {
            minAgeFromPresent: 0,
            maxAgeFromPresent: 30,
            minCost: 100000,
            maxCost: 10000000,
            showAge: false,
            placeHolder: 'Year'
          }
          break;
        case 10: // Others
          element.questions = {
            Q1: 'When do you want to achieve this?',
            Q2: 'How much does it cost today',
            Q3: 'Give this goal a name',
            Q4: 'notes'
          }
          element.imageUrl = '/assets/images/svg/wedding.svg';
          element.validations = {
            minAgeFromPresent: 0,
            maxAgeFromPresent: 30,
            minCost: 500000,
            maxCost: 100000000,
            showAge: false,
            placeHolder: 'Year'
          }
          break;
        default:
          console.log(element.id)
      }
    });
    this.goalTypeFirstRowListData = data.slice(0, 5);
    this.goalTypeSecondRowListData = data.slice(5, 10);
  }
  
  setGoalTypeData(data) {
    this.goalTypeData = data;
    this.showGoalType = [1,5,6].includes(data.id) ? (data.id == 1 ? 'retirement' : 'multiYear') : 'singleYear' 
  }

  cancelGoal(){
    this.goalTypeData = undefined;
    this.showGoalType = undefined;
  }
}
