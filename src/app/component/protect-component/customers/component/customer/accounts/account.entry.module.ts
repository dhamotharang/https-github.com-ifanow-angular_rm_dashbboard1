import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartModule} from 'angular-highcharts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UpperCustomerComponent} from '../../common-component/upper-customer/upper-customer.component';
import {AccountCommonModule} from './account.common.module';
import {AccountUpperSliderModule} from './account-upper-slider.module';
import {MaterialModule} from '../../../../../../material/material';

export const componentList = [
  UpperCustomerComponent
];

@NgModule({
  declarations: componentList,
  imports: [
    CommonModule,
    MaterialModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    AccountCommonModule,
    AccountUpperSliderModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule],
  entryComponents: [componentList]
})

export class AccountEntryModule {

  static getComponentList() {
    return componentList;
  }
}
