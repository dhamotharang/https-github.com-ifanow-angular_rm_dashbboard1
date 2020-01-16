import { Component, OnInit } from '@angular/core';
import { SubscriptionInject } from 'src/app/component/protect-component/AdviserComponent/Subscriptions/subscription-inject.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth-service/authService';
import { PlanService } from '../../customer/plan/plan.service';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})
export class AddExpensesComponent implements OnInit {
  expenseList: { "clientExpenseTypeMasterId": number; "expenseType": string; "label": string; }[];
  expenses: any;
  clientId: any;
  advisorId: any;
  familyMember: any;
  familyMemberId: any;
  ownerName: any;
  nomineesListFM: any;

  constructor(private fb: FormBuilder, private subInjectService: SubscriptionInject,private planService:PlanService) { }

  ngOnInit() {
    this.clientId = AuthService.getClientId();
    this.advisorId = AuthService.getAdvisorId();
    this.getListFamilyMem()
    this.expenseList = [
      {
        "clientExpenseTypeMasterId": 1,
        "expenseType": "Food & Groceries",
        "label": "Basic"
      },
      {
        "clientExpenseTypeMasterId": 2,
        "expenseType": "Clothing",
        "label": "Basic"
      },
      {
        "clientExpenseTypeMasterId": 3,
        "expenseType": "Medical expenses",
        "label": "Basic"
      },
      {
        "clientExpenseTypeMasterId": 4,
        "expenseType": "Shopping",
        "label": "Basic"
      },
      {
        "clientExpenseTypeMasterId": 5,
        "expenseType": "Basic misc.",
        "label": "Basic"
      },
      {
        "clientExpenseTypeMasterId": 6,
        "expenseType": "Mobile",
        "label": "Bills & Utilities"
      },
      {
        "clientExpenseTypeMasterId": 7,
        "expenseType": "Internet",
        "label": "Bills & Utilities"
      },
      {
        "clientExpenseTypeMasterId": 8,
        "expenseType": "Electricity",
        "label": "Bills & Utilities"
      },
      {
        "clientExpenseTypeMasterId": 9,
        "expenseType": "DTH",
        "label": "Bills & Utilities"
      },
      {
        "clientExpenseTypeMasterId": 10,
        "expenseType": "Telephone",
        "label": "Bills & Utilities"
      },
      {
        "clientExpenseTypeMasterId": 11,
        "expenseType": "Newspaper & Magazines",
        "label": "Bills & Utilities"
      },
      {
        "clientExpenseTypeMasterId": 12,
        "expenseType": "Bills & Utilities misc.",
        "label": "Bills & Utilities"
      },
      {
        "clientExpenseTypeMasterId": 13,
        "expenseType": "Daily commute",
        "label": "Transport"
      },
      {
        "clientExpenseTypeMasterId": 14,
        "expenseType": "Petrol/Diesel",
        "label": "Transport"
      },
      {
        "clientExpenseTypeMasterId": 15,
        "expenseType": "Driver's salary",
        "label": "Transport"
      },
      {
        "clientExpenseTypeMasterId": 16,
        "expenseType": "Parking charges",
        "label": "Transport"
      },
      {
        "clientExpenseTypeMasterId": 17,
        "expenseType": "Transport misc.",
        "label": "Transport"
      },
      {
        "clientExpenseTypeMasterId": 18,
        "expenseType": "School/College/University fees",
        "label": "Education"
      },
      {
        "clientExpenseTypeMasterId": 19,
        "expenseType": "Tuition fees",
        "label": "Education"
      },
      {
        "clientExpenseTypeMasterId": 20,
        "expenseType": "Book & Supplies",
        "label": "Education"
      },
      {
        "clientExpenseTypeMasterId": 21,
        "expenseType": "Kids activities",
        "label": "Education"
      },
      {
        "clientExpenseTypeMasterId": 22,
        "expenseType": "Education misc.",
        "label": "Education"
      },
      {
        "clientExpenseTypeMasterId": 23,
        "expenseType": "Rent",
        "label": "Housing"
      },
      {
        "clientExpenseTypeMasterId": 24,
        "expenseType": "Society maintenance",
        "label": "Housing"
      },
      {
        "clientExpenseTypeMasterId": 25,
        "expenseType": "Car wash",
        "label": "Housing"
      },
      {
        "clientExpenseTypeMasterId": 26,
        "expenseType": "Housing misc.",
        "label": "Housing"
      },
      {
        "clientExpenseTypeMasterId": 27,
        "expenseType": "Movies",
        "label": "Entertainment"
      },
      {
        "clientExpenseTypeMasterId": 28,
        "expenseType": "Restaurants",
        "label": "Entertainment"
      },
      {
        "clientExpenseTypeMasterId": 29,
        "expenseType": "Amusement",
        "label": "Entertainment"
      },
      {
        "clientExpenseTypeMasterId": 30,
        "expenseType": "Vacation",
        "label": "Entertainment"
      },
      {
        "clientExpenseTypeMasterId": 31,
        "expenseType": "Entertainment misc.",
        "label": "Entertainment"
      },
      {
        "clientExpenseTypeMasterId": 32,
        "expenseType": "Gifts & Donations",
        "label": "Miscellaneous"
      },
      {
        "clientExpenseTypeMasterId": 33,
        "expenseType": "Personal care",
        "label": "Miscellaneous"
      },
      {
        "clientExpenseTypeMasterId": 34,
        "expenseType": "Health & Fitness",
        "label": "Miscellaneous"
      },
      {
        "clientExpenseTypeMasterId": 35,
        "expenseType": "Doctor",
        "label": "Miscellaneous"
      },
      {
        "clientExpenseTypeMasterId": 36,
        "expenseType": "Dentist",
        "label": "Miscellaneous"
      },
      {
        "clientExpenseTypeMasterId": 37,
        "expenseType": "Miscellaneous",
        "label": "Miscellaneous"
      },
      {
        "clientExpenseTypeMasterId": 38,
        "expenseType": "Gas",
        "label": "Bills & Utilities"
      },
      {
        "clientExpenseTypeMasterId": 39,
        "expenseType": "Professional Fees",
        "label": "Miscellaneous"
      },
      {
        "clientExpenseTypeMasterId": 40,
        "expenseType": "Repairs & Maintenance",
        "label": "Miscellaneous"
      },
      {
        "clientExpenseTypeMasterId": 41,
        "expenseType": "Maid/Domestic Helper",
        "label": "Housing"
      },
      {
        "clientExpenseTypeMasterId": 42,
        "expenseType": "Nanny - Baby sitting",
        "label": "Miscellaneous"
      },
      {
        "clientExpenseTypeMasterId": 43,
        "expenseType": "Property Tax",
        "label": "Housing"
      },
      {
        "clientExpenseTypeMasterId": 44,
        "expenseType": "Vehicle Maintenance",
        "label": "Transport"
      },
      {
        "clientExpenseTypeMasterId": 45,
        "expenseType": "Saloon & Spa",
        "label": "Miscellaneous"
      },
      {
        "clientExpenseTypeMasterId": 46,
        "expenseType": "Parental care",
        "label": "Miscellaneous"
      }
    ]
    this.getdataForm('')
  }
  display(value) {
    console.log('value selected', value)
    this.ownerName = value.userName;
    this.familyMemberId = value.id
  }
  lisNominee(value) {
    console.log(value)
    this.nomineesListFM = Object.assign([], value.familyMembersList);
    console.log('list of family',this.nomineesListFM)
  }
  preventDefault(e){
    e.preventDefault();
  }
  getdataForm(data) {
    if (data == undefined) {
      data = {}
    }
    this.expenses = this.fb.group({
      timeInMilliSec: [(data == undefined) ? '' : data.timeInMilliSec, [Validators.required]],
      expenseDoneOn: [(data == undefined) ? '' : new Date(data.expenseDoneOn), [Validators.required]],
      amount: [(data == undefined) ? '' : data.amount, [Validators.required]],
      category: [(data == undefined) ? '' : (data.category) + "", [Validators.required]],
      familyMember: [(data == undefined) ? '' :  this.familyMember, [Validators.required]],
      description: [(data == undefined) ? '' : data.description, [Validators.required]],
      id: [(data == undefined) ? '' : data.id, [Validators.required]],
      paymentModeId: [[(data == undefined) ? '' : data.paymentModeId], [Validators.required]]
    });
  }
  getFormControl(): any {
    return this.expenses.controls;
  }
  getListFamilyMem() {
    const obj = {
      advisorId: this.advisorId,
      clientId: this.clientId
    };
    this.planService.getListOfFamilyByClient(obj).subscribe(
      data => this.getListOfFamilyByClientRes(data)
    );
  }
  getListOfFamilyByClientRes(data) {
    console.log('family Memebers', data);
    this.familyMember = data.familyMembersList
  }
  selectClient(event, selected){
    console.log(selected)
    this.familyMemberId =  selected.id
  }
  saveExpenses() {
    if (this.expenses.get('expenseDoneOn').invalid) {
      this.expenses.get('expenseDoneOn').markAsTouched();
      return
      }else if (this.expenses.get('timeInMilliSec').invalid) {
        this.expenses.get('timeInMilliSec').markAsTouched();
        return
      }else if (this.expenses.get('amount').invalid) {
        this.expenses.get('amount').markAsTouched();
        return
      }else if (this.expenses.get('category').invalid) {
        this.expenses.get('category').markAsTouched();
        return
      }else if (this.expenses.get('paymentModeId').invalid) {
        this.expenses.get('paymentModeId').markAsTouched();
        return
      }else if (this.expenses.get('familyMember').invalid) {
        this.expenses.get('familyMember').markAsTouched();
        return
      } else {
        let obj = {
          advisorId: this.advisorId,
          clientId: this.clientId,
          familyMemberId: this.familyMemberId,
          expenseDoneOn: this.expenses.controls.expenseDoneOn.value,
          amount: this.expenses.controls.amount.value,
          pensionPayoutFrequencyId: this.expenses.controls.amount.value,
          timeInMilliSec: this.expenses.controls.timeInMilliSec.value,
          paymentModeId:this.expenses.controls.paymentModeId.value,
          expenseCategoryId: this.expenses.controls.category.value,
          description: this.expenses.controls.description.value,
          id: this.expenses.controls.id.value
        }
        if (this.expenses.controls.id.value == undefined) {
          this.planService.addExpense(obj).subscribe(
            data => this.addExpenseRes(data)
          );
        } else {
          //edit call
          this.planService.editExpense(obj).subscribe(
            data => this.editExpenseRes(data)
          );
        }
      }
    }
    addExpenseRes(data){
      console.log('addExpenseRes',data)
    }
    editExpenseRes(data){
      console.log('editExpenseRes',data)
    }
    close(){
      this.subInjectService.changeNewRightSliderState({ state: 'close' });
    }
  }
