import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/auth-service/authService';
import {EventService} from 'src/app/Data-service/event.service';
import {BackOfficeService} from '../../protect-component/AdviserComponent/backOffice/back-office.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatProgressButtonOptions} from '../../../common/progress-button/progress-button.component';
import {ValidatorType} from 'src/app/services/util.service';
import {LoginService} from './login.service';
import {PeopleService} from "../../protect-component/PeopleComponent/people.service";

@Component({
  selector: 'app-login',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('btnProgress', [
      state('state1', style({
        width: '0%',
        backgroundColor: 'green',
        display: 'block'
      })),
      state('state2', style({
        width: '100%',
        backgroundColor: 'green',
        display: 'block',
        transition: '0.3s'
      })),
      transition('state1 => state2', animate('2000s')),
      transition('state2 =>state1', animate('0s'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Login to your account',
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
  otpNumber = false;
  validatorType = ValidatorType;
  hide = true;
  errorRequired = false;
  errorMsg = false;
  passEvent: any;
  errorStyle = {};
  userName;
  getOtpFlag = false;
  otpData = [];
  otpResponse: any;
  verifyResponseData =
    {
      email: '',
      mobile: ''
    };
  verifyFlag: string;

  @ViewChild('animationSpan', {
    read: ElementRef,
    static: true
  }) animationSpan: ElementRef;
  btnProgressData: any;

  // @HostListener('click', ['$event.target'])
  // onclick() {
  //   console.log("animate")
  // }
  loginForm: FormGroup;

  isLoading = false;

  constructor(
    private formBuilder: FormBuilder, private eventService: EventService,
    public backOfficeService: BackOfficeService,
    public router: Router,
    private authService: AuthService, private eleRef: ElementRef, private loginService: LoginService,
    private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.userName = new FormControl('', [Validators.required]);
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['admin', 'subscription', 'dashboard']);
    // } else {
    this.createForm();
    // }
    this.btnProgressData = 'state1';
  }

  getOtp() {
    if (this.userName.invalid) {
      this.userName.markAsTouched();
      return;
    } else {
      const obj = {
        userName: this.userName.value
      };
      this.loginService.getUsernameData(obj).subscribe(
        data => {
          console.log(data);
          this.getOtpResponse(data);
          (data == undefined) ? this.eventService.openSnackBar('error found', 'Dismiss') : (this.getOtpFlag) ? this.getOtpFlag = false : this.getOtpFlag = true;
        },
        err => this.eventService.openSnackBar(err, 'Dismiss')
      );
    }
  }

  getOtpResponse(data) {
    this.verifyResponseData.email = data.emailList[0].email.substr(2, data.emailList[0].email.indexOf('@') - 2) + 'XXXXX' + data.emailList[0].email.substr(7, 9);
    this.verifyResponseData.mobile = String(data.mobileList[0].mobileNo).substr(0, 2) + 'XXXXX' + String(data.mobileList[0].mobileNo).substr(7, 9);
    console.log(this.verifyResponseData);
    if (this.verifyResponseData.email) {
      this.verifyFlag = 'Email';
      const obj = {email: data.email};
      this.loginUsingCredential(obj);
    } else {
      this.verifyFlag = 'mobile';
      const obj = {mobileNo: data.mobile};
      this.loginUsingCredential(obj);
    }
  }

  loginUsingCredential(obj) {
    this.loginService.generateOtp(obj).subscribe(
      data => {
        console.log(data);
        this.otpResponse = data;
      },
      err => this.eventService.openSnackBar(err, 'Dismiss')
    );
  }

  otpClick() {
    (this.otpNumber) ? this.otpNumber = false : this.otpNumber = true;
  }

  enterOtp(value) {
    if (value.code.substring(0, value.code.length - 1) == 'Key' || value.code == 'Backspace') {
      if (value.srcElement.previousElementSibling == undefined) {
        this.otpData.pop();
        return;
      }
      value.srcElement.previousElementSibling.focus();
      this.otpData.pop();
    } else {
      if (value.srcElement.nextElementSibling == undefined) {
        this.otpData.push(value.key);
        return;
      }
      this.otpData.push(value.key);
      value.srcElement.nextElementSibling.focus();
    }
  }

  verifyWithOtpResponse() {
    const otpString = this.otpData.toString().replace(/,/g, '');
    if (this.otpData.length == 6 && this.otpResponse == otpString) {
      this.eventService.openSnackBar('Otp matches sucessfully', 'Dismiss');
      this.router.navigate(['/admin/subscription/dashboard']);
    } else {
      this.eventService.openSnackBar('Wrong OTP');
    }
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change'
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change'
      }),
    });
  }

  getError() {
    return ' *This is required field';
  }

  cancel(): void {
    this.loginForm.reset();
  }

  enterEvent(event) {
    this.errorMsg = false;
    this.errorStyle = {
      visibility: this.errorMsg ? 'visible' : 'hidden',
      opacity: this.errorMsg ? '1' : '0',
    };
    if (event.keyCode === 13) {
      this.passEvent = event.keyCode;
    }
  }

  onSubmit() {

    if (this.loginForm.valid) {
      const loginData = {
        userName: this.loginForm.controls.name.value,
        password: this.loginForm.controls.password.value,
        roleId: 1
      };
      this.isLoading = true;
      this.peopleService.loginWithPassword(loginData).subscribe(data => {
        console.log('data: ', data);

        this.isLoading = false;
        this.barButtonOptions.active = false;
      }, err => {
        this.isLoading = false;
        this.barButtonOptions.active = false;
        console.log('error on login: ', err);
        this.eventService.openSnackBar(err, 'Dismiss');
      });
      /*this.backOfficeService.loginApi(loginData).subscribe(
        data => {

          if (data) {
            console.log('data: ', data);
            this.authService.setToken(data.token);
            if (!data.advisorId) {
              data.advisorId = data.adminAdvisorId;
            }
            this.authService.setUserInfo(data);
            this.router.navigate(['admin', 'subscription', 'dashboard']);
            this.authService.setClientData({
              id: 2978, name: 'Aryendra Kumar Saxena'
            });

          } else {
            this.passEvent = '';
            this.errorMsg = true;
            this.errorStyle = {
              visibility: this.errorMsg ? 'visible' : 'hidden',
              opacity: this.errorMsg ? '1' : '0',
            };
            this.barButtonOptions.active = false;
          }
        },
        err => {
          this.isLoading = false;
          this.barButtonOptions.active = false;
          console.log('error on login: ', err);
          this.eventService.openSnackBar(err, 'Dismiss');
        }
      );*/
    }
  }

  onEnterPressed() {
    console.log(' on enter pressed sdkvjasbhkdj');
  }

  hardCodeLoginForTest() {
    const jsonData = {
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
    // this.authService.setToken(loginData.payLoad);
    this.eventService.openSnackBar('Login successFully', 'Dismiss');
    this.router.navigate(['admin', 'subscription', 'dashboard']);
  }

  closeDialog(data) {
    const loginData = data;
    console.log(data);
    if (data.status === 200) {
      this.authService.setToken(loginData.payLoad);
      this.eventService.openSnackBar('Login successFully ', 'Dismiss');
      this.router.navigate(['/admin/service']);
    } else {
      this.eventService.openSnackBar(loginData.message, 'Dismiss');
    }
  }

  progressButtonClick(event) {
    console.log(this.loginForm.value, 'this.loginForm.value.name');
    if (this.loginForm.value.name != '' && this.loginForm.value.password != '') {
      this.errorMsg = false;
      this.errorStyle = {
        visibility: this.errorMsg ? 'visible' : 'hidden',
        opacity: this.errorMsg ? '1' : '0',
      };
      this.barButtonOptions.active = true;
      this.barButtonOptions.value = 20;
      this.onSubmit();
    } else {
      this.loginForm.get('name').markAsTouched();
      this.loginForm.get('password').markAsTouched();
      this.barButtonOptions.active = false;
    }
  }


}

