import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingBackupRoutingModule } from './setting-backup-routing.module';
import { ArnRiaDetailsComponent } from './arn-ria-details/arn-ria-details.component';
import { MfRtaDetailsComponent } from './mf-rta-details/mf-rta-details.component';
import { SchemeBasketComponent } from './scheme-basket/scheme-basket.component';
import { ModelPortfolioComponent } from './model-portfolio/model-portfolio.component';
import { SettingBackupComponent } from '../setting-backup.component';


@NgModule({
  declarations: [SettingBackupComponent, ArnRiaDetailsComponent, MfRtaDetailsComponent, SchemeBasketComponent, ModelPortfolioComponent],
  imports: [
    CommonModule,
    SettingBackupRoutingModule
  ]
})
export class SettingBackupModule { }
