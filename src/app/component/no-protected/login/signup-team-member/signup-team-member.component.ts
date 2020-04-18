import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth-service/authService';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { EventService } from 'src/app/Data-service/event.service';
import { MatDialog } from '@angular/material';
import { ValidatorType } from 'src/app/services/util.service';
import { MatProgressButtonOptions } from 'src/app/common/progress-button/progress-button.component';
import { ConfirmDialogComponent } from 'src/app/component/protect-component/common-component/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-signup-team-member',
  templateUrl: './signup-team-member.component.html',
  styleUrls: ['./signup-team-member.component.scss']
})
export class SignupTeamMemberComponent implements OnInit {
  duplicateTableDtaFlag: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, public routerActive: ActivatedRoute,
    private router: Router, private loginService: LoginService, private eventService: EventService, public dialog: MatDialog) { }

  signUpForm;
  validatorType = ValidatorType;
  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Create account',
    buttonColor: 'accent',
    barColor: 'accent',
    raised: true,
    stroked: false,
    mode: 'determinate',
    value: 10,
    disabled: false,
    fullWidth: false,
    // buttonIcon: {
    //   fontIcon: 'favorite'
    // }
  };

  ngOnInit() {
    this.routerActive.queryParamMap.subscribe((queryParamMap) => {
      if (queryParamMap.has('advisorId')) {
        // this.clientSignUp = true;
      }
    });
    this.signUpForm = this.fb.group({
      fullName: [, [Validators.required]],
      email: [/*{ value: '', disabled: true }*/, [Validators.required,
      Validators.pattern(this.validatorType.EMAIL)]],
      mobile: [, [Validators.required, Validators.pattern(this.validatorType.TEN_DIGITS)]],
      termsAgreement: [false, [Validators.required, Validators.requiredTrue]]
    });
  }
  createAccount() {
    if (this.signUpForm.invalid) {
      console.log('Error');
      this.signUpForm.markAllAsTouched();
      return;
    } else if (this.signUpForm.value.termsAgreement == false) {
      // this.eventService.openSnackBar('Please accept terms and conditions!', 'Dismiss');
      return;
    } else {
      this.barButtonOptions.active = true;
      let obj = {
        "advisorId": 3001,
        "mobileNo": this.signUpForm.get('mobile').value,
        "name": this.signUpForm.get('fullName').value,
        "email": this.signUpForm.get('email').value
      }
      this.loginService.createTeamMember(obj).subscribe(
        data => {
          console.log(data);
          this.barButtonOptions.active = false;
          const forgotPassObjData = {
            mobileNo: this.signUpForm.get('mobile').value,
            email: this.signUpForm.get('email').value,
            flag: true,
            userType: data.userType,
            userId: data.userId,
            clientId: data.clientId,
            advisorId: data.advisorId,
            userData: data
          };
          if (this.clientSignUp) {
            /*  const jsonData = {
                advisorId: 2808,
                clientId: 2978,
                emailId: 'gaurav@futurewise.co.in',
                authToken: 'data',
                imgUrl: 'https://res.cloudinary.com/futurewise/image/upload/v1566029063/icons_fakfxf.png'
              };
  
              this.authService.setToken('data');
              this.authService.setUserInfo(jsonData);
              this.authService.setClientData({
                id: 2978, name: 'Aryendra Kumar Saxena'
              });
              this.router.navigate(['customer', 'detail', 'overview', 'myfeed']);*/
          } else {
            this.router.navigate(['/login/forgotpassword'], { state: forgotPassObjData });
          }
        },
        err => {
          this.barButtonOptions.active = false;
          this.eventService.openSnackBar(err, 'Dismiss');
          // this.confirmModal(err.message);
        }
      );
    }
  }
  clientSignUp(obj: { emailList: { userType: number; email: any; }[]; name: any; displayName: any; mobileList: { userType: number; mobileNo: any; }[]; userType: number; forceRegistration: boolean; }, clientSignUp: any) {
    throw new Error("Method not implemented.");
  }
}