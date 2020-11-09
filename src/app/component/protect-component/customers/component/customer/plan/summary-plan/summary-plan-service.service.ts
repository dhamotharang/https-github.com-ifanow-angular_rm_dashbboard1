import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryPlanServiceService {
  private incomeData = new BehaviorSubject('')
  private expenseData = new BehaviorSubject('')
  private budgetData = new BehaviorSubject('')
  private dob = new BehaviorSubject('')
  private familyList = new BehaviorSubject('')
  private incomeCount = new BehaviorSubject('')

  constructor() { }

  setIncomeData(value) {
    this.incomeData.next(value);

  }
  getIncomeData() {
    return this.incomeData.asObservable();
  }
  setIncomeCount(value) {
    this.incomeCount.next(value);

  }
  getIncomeCount() {
    return this.incomeCount.asObservable();
  }
  setExpenseData(value) {
    this.expenseData.next(value);
  }
  getExpenseData() {
    return this.expenseData.asObservable();
  }
  setBudgetData(value) {
    this.budgetData.next(value);
  }
  getBudgetData() {
    return this.budgetData.asObservable();
  }
  setclientDob(value) {
    this.dob.next(value);
  }
  getclientDob() {
    return this.dob.asObservable();
  }
  setFamilyList(value) {
    this.familyList.next(value);
  }
  getFamilyList() {
    return this.familyList.asObservable();
  }
}