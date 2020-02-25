/* tslint:disable:max-line-length */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth-service/authService';
import { DashboardComponent } from './component/protect-component/AdviserComponent/dashboard/dashboard.component';
import { HttpService } from './http-service/http-service';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { CustomFormInputComponent } from './common/custom-form-input/custom-form-input.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { LoginComponent } from './component/no-protected/login/login.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { BaseComponent } from './component/protect-component/AdviserComponent/Subscriptions/subscription/common-subscription-component/base/base.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { CustomCommonModule } from './common/custom.common.module';
import { DatePipe } from '@angular/common';
import { MatSortModule, MatTableModule, MatExpansionModule } from '@angular/material';
// import { SubscriptionModule } from './component/protect-component/AdviserComponent/Subscriptions/subscription.module';
import { EmailEntryModule } from './component/protect-component/AdviserComponent/Email/email.entry.module';
import 'zone.js/dist/zone';
// import { SubscriptionUpperEntry } from './component/protect-component/AdviserComponent/Subscriptions/subscription-upper-entry-module';
import { FormTestComponent } from "./test/form-test/form-test.component";
import { CustomDirectiveModule } from "./common/directives/common-directive.module";
import { SubscriptionUpperEntry } from './component/protect-component/AdviserComponent/Subscriptions/subscription-upper-entry-module';
import { BackofficeDashboardComponent } from './component/protect-component/AdviserComponent/backOffice/backoffice-dashboard/backoffice-dashboard.component';
import { ForgotPasswordComponent } from './component/no-protected/login/forgot-password/forgot-password.component';
import { SignUpComponent } from './component/no-protected/login/sign-up/sign-up.component';
import { SetNewPasswordComponent } from './component/no-protected/login/set-new-password/set-new-password.component';
import { VerifyOtpComponent } from './component/no-protected/login/verify-otp/verify-otp.component';

// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    SetNewPasswordComponent,
    VerifyOtpComponent,
    // ConfirmDialogComponent,
    DialogComponent,
    CustomFormInputComponent,
    BaseComponent,
    // RadioGroupDirectiveDirective,

    // DialogContainerComponent,
    // CustomDialogContainerComponent,
    // AddLiabilitiesComponent,
    // AddInsuranceComponent
    FormTestComponent,
    BackofficeDashboardComponent

  ],
  imports: [
    // CalendarModule,
    // SubscriptionEntry,
    // SubscriptionUpperEntry,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentDateModule,
    MatSortModule,
    MatTableModule,
    SlimLoadingBarModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    // CloudinaryModule.forRoot(Cloudinary,
    //   {
    //     cloud_name: 'futurewise', upload_preset: 'ifanow_unsigned_logo', /*private_cdn: true,*/
    //     /* cname: 'futurewise.images.com'*/
    //   }),
    DragDropModule,
    CustomCommonModule,
    EmailEntryModule,
    AppRoutingModule,
    CustomDirectiveModule,
    // SubscriptionUpperEntry
  ],
  providers: [AuthService, HttpService, DatePipe],
  bootstrap: [AppComponent]
  // entryComponents: [EntryComponentsModule.getComponentList(), AccountEntryModule.getComponentList(), PlanEntryModule.getComponentList()]
})
export class AppModule {
}