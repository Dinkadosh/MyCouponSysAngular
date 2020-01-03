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
import {MatToolbarModule} from '@angular/material/toolbar';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from '@angular/material';
import { CompanyCouponsComponent } from './components/company-coupons/company-coupons.component';
import { CouponUpdateComponent } from './components/coupon-update/coupon-update.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { CustomerCouponsComponent } from './components/customer-coupons/customer-coupons.component';
import { BuyCouponComponent } from './components/buy-coupon/buy-coupon.component';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
