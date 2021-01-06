import { Router } from '@angular/router';
import { Component, NgZone, OnInit } from '@angular/core';
import { RoutingState } from '../../../../../../services/routing-state.service';
import { EventService } from 'src/app/Data-service/event.service';
import { slideInAnimation } from '../../../../../../animation/router.animation';
import { AuthService } from 'src/app/auth-service/authService';
import { EnumDataService } from 'src/app/services/enum-data.service';
import { MfServiceService } from './assets/mutual-fund/mf-service.service';
import { EnumServiceService } from 'src/app/services/enum-service.service';
import { AssetValidationService } from './assets/asset-validation.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  animations: [
    slideInAnimation,
  ]
})
export class AccountsComponent implements OnInit {
  clientData: any;

  set value(value: number) {
    console.log('now value is ->>>>', value);
    this._value = value;
  }

  _value: number;
  loading: boolean;
  showRouter = false;
  selected;

  constructor(private eventService: EventService, private router: Router, private ngZone: NgZone, private assetValidation: AssetValidationService,
    public routingStateService: RoutingState, public enumService: EnumServiceService, public authService: AuthService, private MfServiceService: MfServiceService) {
    this.eventService.tabChangeData.subscribe(
      data => this.getTabChangeData(data)
    );
  }

  // navBarClick(navigationUrl, navId) {
  //   this.routingStateService.goToSpecificRoute('/customer/detail/account/' + navigationUrl);
  //   this.value = navId;
  // }

  getTabChangeData(data) {
    setTimeout(() => {
      this._value = data;
      this.loading = false;
    }, 300);
  }
  bankList: any = [];
  ngOnInit() {
    this.showRouter = true;
    this.selected = 1;
    this._value = 1;
    this.loading = false;
    this.clientData = AuthService.getClientData();
    this.assetValidation.clearAssetData();
    this.MfServiceService.clearStorage();//to clear the stored data of mutual fund
    // this.enumDataService.getAccountList();
    console.log('this is child url now->>>>>', this.router.url.split('/')[3]);
    // var roterName = this.router.url.split('/')[3];
    // if (roterName === 'summary') {
    //   this._value = 1;
    // } else if (roterName === 'assets') {
    //   this._value = 2;
    // } else if (roterName === 'liabilities') {
    //   this._value = 3;
    // } else if (roterName === 'insurance') {
    //   this._value = 4;
    // } else if (roterName === 'documents') {
    //   this._value = 5;
    // }
  }

  goToAdvisorHome() {
    /*this.router.navigateByUrl('/admin/subscription').then(e => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });*/
    // this.locationService.go('/admin/subscription');
    /* this.ngZone.run(() => {
       // this.navigateTo('/');

       this.router.navigate(['/admin', 'subscription'], {/!*replaceUrl: true*!/}).then(e => {
         if (e) {
           // this.router.navigate(['/admin', 'subscription']);
           console.log('Navigation is successful!');
           // this.locationService.go('/admin/subscription');

         } else {
           console.log('Navigation has failed!');
         }
       });
     });*/

    this.showRouter = false;
    this.MfServiceService.clearStorage();//to clear the stored data of mutual fund
    setTimeout(() => {
      this.routingStateService.goToSpecificRoute('/admin/dashboard');
    }, 200);
  }

}
