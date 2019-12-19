import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {Event, NavigationEnd, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {EventService} from './Data-service/event.service';
import {RoutingState} from "./services/routing-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mainrouter', {
    read: ViewContainerRef,
    static: true
  }) mainrouter: ViewContainerRef;

  ngAfterViewInit(): void {
    this.routingState.setMainRouter(this.mainrouter);
  }

  constructor(
    private lBar: SlimLoadingBarService,
    private _router: Router,
    private eventService: EventService,
    private routingState: RoutingState,
  ) {
    routingState.loadRouting();

    this._router.events.subscribe((event: Event) => {
      // console.log(event);
      this.loadingBarInterceptor(event);
    });
  }

  private loadingBarInterceptor(event: Event) {
    if (event instanceof NavigationStart) {
      this.lBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.lBar.complete();
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
