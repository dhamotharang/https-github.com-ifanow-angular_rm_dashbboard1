import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkReportSendingRoutingModule } from './bulk-report-sending-routing.module';
import { BulkReportSendingComponent } from './bulk-report-sending.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material';
import { CustomDirectiveModule } from 'src/app/common/directives/common-directive.module';
import { BulkOverviewComponent } from './bulk-overview/bulk-overview.component';



@NgModule({
  declarations: [BulkReportSendingComponent, BulkOverviewComponent, ],
  imports: [
    CommonModule,
    BulkReportSendingRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    CustomDirectiveModule
  ]
})
export class BulkReportSendingModule { }