import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxSpinnerModule } from "ngx-spinner";
import { NpnSliderModule } from "npn-slider";
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { OnlineComponentComponent } from './components/online-component/online-component.component';
import { RetailComponentComponent } from './components/retail-component/retail-component.component';
import { MergedComponentComponent } from './components/merged-component/merged-component.component';
import { AmazonComponent } from './components/websites/amazon/amazon.component';
import { FlipkartComponent } from './components/websites/flipkart/flipkart.component';
import { PaytmComponent } from './components/websites/paytm/paytm.component';
import { SangeethamobilesComponent } from './components/websites/sangeethamobiles/sangeethamobiles.component';
import { CartComponent } from './components/cart/cart.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NgxSocialLoginModule } from 'ngx-social-login';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { CromaComponent } from './components/websites/croma/croma.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    OnlineComponentComponent,
    RetailComponentComponent,
    MergedComponentComponent,
    AmazonComponent,
    FlipkartComponent,
    PaytmComponent,
    SangeethamobilesComponent,
    CartComponent,
    SidenavComponent,
    LoginComponent,
    LogoutComponent,
    CromaComponent
  ],
  imports: [
    LayoutModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    Ng5SliderModule,
    NpnSliderModule,
    NgxSpinnerModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxSocialLoginModule.init(
      {
        google: {
            client_id: '525352292769-2t96d3mo10aavtla8hlnq4s51d16h4h4.apps.googleusercontent.com'
        }
    }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
