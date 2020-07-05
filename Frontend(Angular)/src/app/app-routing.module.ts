import { CartComponent } from './components/cart/cart.component';
import { MergedComponentComponent } from './components/merged-component/merged-component.component';
import { OnlineComponentComponent } from './components/online-component/online-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetailComponentComponent } from './components/retail-component/retail-component.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { LogoutComponent } from './components/logout/logout.component';


const routes: Routes = [
  { path: 'main', component: MainComponentComponent, children: [
    { path: 'onlinestores', component: OnlineComponentComponent, data: { animation: 'isRight' } },
    { path: 'retailstores', component: RetailComponentComponent, data: { animation: 'isLeft' } },
    { path: 'mergedresults', component: MergedComponentComponent },
    { path: 'cart', component: CartComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '',
    redirectTo: '/main/onlinestores',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
