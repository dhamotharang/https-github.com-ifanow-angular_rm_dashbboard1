import {Injectable, NgZone} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoutingState {

  constructor(private ngZone: NgZone) {

  }

  private _router: Router;
  private history = [];

  get router() {
    return this._router;
  }

  mainrouter;

  set router(router) {
    this._router = router;
  }

  prepareRoute(outlet: RouterOutlet) {
    const outPutData = outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    // console.log('RoutingState prepareRoute outPutData : ', outPutData);
    return outPutData;
  }

  public setMainRouter(mainrouter) {
    this.mainrouter = mainrouter;
  }

  public getMainRouter() {
    return this.mainrouter;
  }

  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
        console.log('123456789 loadRouting history : ', this.history);
        if (this.getMainRouter())
          console.log('goToSpecificRoute urlString this.getMainRouter().detach() : ', this.getMainRouter());

      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/index';
  }

  public goToSpecificRoute(urlString) {
    console.log('goToSpecificRoute urlString this.getMainRouter().detach() : ', this.getMainRouter());
    this.ngZone.run(() => {
      this.router.navigate([urlString]).then((status: boolean) => {
        if (status) {
          console.log('goToSpecificRoute urlString  success : ', urlString);
        } else {
          console.error('goToSpecificRoute urlString failure : ', urlString);
        }
      }).catch(error => {
        console.error('goToSpecificRoute catch error : ', error, ' for urlString : ', urlString);

      });
    });
  }
}
