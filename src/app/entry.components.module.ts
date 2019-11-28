import { LiabilitiesDetailComponent } from './component/protect-component/customers/component/common-component/liabilities-detail/liabilities-detail.component';
import { AddPoTdComponent } from './component/protect-component/customers/component/customer/accounts/assets/smallSavingScheme/common-component/add-po-td/add-po-td.component';
import { AddSsyComponent } from './component/protect-component/customers/component/customer/accounts/assets/smallSavingScheme/common-component/add-ssy/add-ssy.component';
import { AddNscComponent } from './component/protect-component/customers/component/customer/accounts/assets/smallSavingScheme/common-component/add-nsc/add-nsc.component';
import { AddTransactionComponent } from './component/protect-component/customers/component/customer/accounts/assets/smallSavingScheme/common-component/add-transaction/add-transaction.component';
import { AddPpfComponent } from './component/protect-component/customers/component/customer/accounts/assets/smallSavingScheme/common-component/add-ppf/add-ppf.component';
import { AddEPSComponent } from './component/protect-component/customers/component/customer/accounts/assets/retirementAccounts/add-eps/add-eps.component';
import { AddSuperannuationComponent } from './component/protect-component/customers/component/customer/accounts/assets/retirementAccounts/add-superannuation/add-superannuation.component';
import { AddGratuityComponent } from './component/protect-component/customers/component/customer/accounts/assets/retirementAccounts/add-gratuity/add-gratuity.component';
import { NpsSummaryPortfolioComponent } from './component/protect-component/customers/component/customer/accounts/assets/retirementAccounts/add-nps/nps-summary-portfolio/nps-summary-portfolio.component';
import { NgModule } from '@angular/core';
import { AddLiabilitiesComponent } from './component/protect-component/customers/component/common-component/add-liabilities/add-liabilities.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material';
import { ChartModule } from 'angular-highcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnerComponentModule } from './component/protect-component/customers/component/customer/accounts/owner-component/owner-component.module';
import { AddInsuranceComponent } from './component/protect-component/customers/component/common-component/add-insurance/add-insurance.component';
import { FixedDepositComponent } from './component/protect-component/customers/component/customer/accounts/assets/fixedIncome/fixed-deposit/fixed-deposit.component';
import { AddRealEstateComponent } from './component/protect-component/customers/component/customer/accounts/assets/realEstate/add-real-estate/add-real-estate.component';
import { GoldComponent } from './component/protect-component/customers/component/customer/accounts/assets/commodities/gold/gold.component';
import { OthersComponent } from './component/protect-component/customers/component/customer/accounts/assets/commodities/others/others.component';
import { CashInHandComponent } from './component/protect-component/customers/component/customer/accounts/assets/cash&bank/cash-in-hand/cash-in-hand.component';
import { BankAccountsComponent } from './component/protect-component/customers/component/customer/accounts/assets/cash&bank/bank-accounts/bank-accounts.component';
import { RecuringDepositComponent } from './component/protect-component/customers/component/customer/accounts/assets/fixedIncome/recuring-deposit/recuring-deposit.component';
import { AddEPFComponent } from './component/protect-component/customers/component/customer/accounts/assets/retirementAccounts/add-epf/add-epf.component';
import { AddNPSComponent } from './component/protect-component/customers/component/customer/accounts/assets/retirementAccounts/add-nps/add-nps.component';
import { AddGoalComponent } from './component/protect-component/customers/component/customer/plan/goals-plan/add-goal/add-goal.component';
import { NpsSchemeHoldingComponent } from "./component/protect-component/customers/component/customer/accounts/assets/retirementAccounts/add-nps/nps-scheme-holding/nps-scheme-holding.component";

export const componentList = [
  AddLiabilitiesComponent,
  AddInsuranceComponent,
  FixedDepositComponent,
  AddRealEstateComponent,
  GoldComponent,
  AddNPSComponent,
  RecuringDepositComponent,
  AddEPFComponent,
  OthersComponent,
  CashInHandComponent,
  BankAccountsComponent,
  AddGoalComponent,
  NpsSchemeHoldingComponent,
  NpsSummaryPortfolioComponent,
  AddGratuityComponent,
  AddSuperannuationComponent,
  AddEPSComponent,
  AddPpfComponent,
  AddNscComponent,
  AddTransactionComponent,
  AddSsyComponent,
  AddPoTdComponent,
  LiabilitiesDetailComponent
];

@NgModule({
  declarations: componentList,
  imports: [
    CommonModule,
    MaterialModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    OwnerComponentModule
  ],
  exports: [],
  entryComponents: [componentList]
})

export class EntryComponentsModule {

  static getComponentList() {
    return componentList;
  }
}
