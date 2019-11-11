import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SubscriptionComponent} from './subscription/subscription.component';


const routes: Routes = [{
  path: '', component: SubscriptionComponent,
  children: [
    {
      path: '',
      component: SubscriptionComponent,
      data: {animation: 'SubscriptionHome'}
    },
    /* {
       path: 'clients',
       component: CustomerComponent
     }*/]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule {
}
