import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { InfoComponent } from './components/info/info.component';
import { CompaniesComponent } from './components/companies-list/companies-list.component';
import { CustomersComponent } from './components/customers-list/customers-list.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { CouponsListComponent } from './components/coupons-list/coupons-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { CouponDetailsComponent } from './components/coupon-details/coupon-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyCouponsComponent } from './components/company-coupons/company-coupons.component';
import { CouponUpdateComponent } from './components/coupon-update/coupon-update.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { CustomerCouponsComponent } from './components/customer-coupons/customer-coupons.component';
import { BuyCouponComponent } from './components/buy-coupon/buy-coupon.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AngularMaterialModule } from './angular-material.module';
import { MymodalComponent } from './components/mymodal/mymodal.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 2000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: false,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    InfoComponent,
    CompaniesComponent,
    CustomersComponent,
    LoginComponent,
    CouponsListComponent,
    AddUserComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    CouponDetailsComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    RegisterComponent,
    CompanyCouponsComponent,
    CouponUpdateComponent,
    AddCouponComponent,
    CustomerCouponsComponent,
    BuyCouponComponent,
    MymodalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [MymodalComponent]
})
export class AppModule { }
