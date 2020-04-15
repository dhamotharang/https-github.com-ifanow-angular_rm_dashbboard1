import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {SetNewPasswordComponent} from './set-new-password/set-new-password.component';
import {VerifyOtpComponent} from './verify-otp/verify-otp.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
    // canActivate: [AuthGuard],

  },
  {
    path: 'setpassword',
    component: SetNewPasswordComponent
  },
  {
    path: 'verifyotp',
    component: VerifyOtpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
