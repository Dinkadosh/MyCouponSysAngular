import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { CompaniesComponent } from './components/companies-list/companies-list.component';
import { CustomersComponent } from './components/customers-list/customers-list.component';
import { CouponsListComponent } from './components/coupons-list/coupons-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { CouponDetailsComponent } from './components/coupon-details/coupon-details.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { CompanyCouponsComponent } from './components/company-coupons/company-coupons.component';
import { CouponUpdateComponent } from './components/coupon-update/coupon-update.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { CustomerCouponsComponent } from './components/customer-coupons/customer-coupons.component';
import { BuyCouponComponent } from './components/buy-coupon/buy-coupon.component';


const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  {
    path: 'info',
    canActivate: [AuthGuard],
    component: InfoComponent
  },
  {
    path: 'companies',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    component: CompaniesComponent
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    component: CustomersComponent
  },
  {
    path: 'coupons',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    component: CouponsListComponent
  },
  {
    path: 'newUser',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    component: AddUserComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },

  {
    path: 'userDetails/:id/:role',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    component: UserDetailsComponent
  },
  {
    path: 'couponDetails/:id',
    canActivate: [AuthGuard],
    component: CouponDetailsComponent
  },
  {
    path: 'updateUser/:id/:role',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    component: UserUpdateComponent
  },
  {
    path: 'company_coupons',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_COMPANY'] },
    component: CompanyCouponsComponent
  },
  {
    path: 'customer_coupons',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER'] },
    component: CustomerCouponsComponent
  },
  {
    path: 'buyCoupon',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CUSTOMER'] },
    component: BuyCouponComponent
  },
  {
    path: 'addCoupon',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_COMPANY'] },
    component: AddCouponComponent
  },
  {
    path: 'couponUpdate/:id',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_COMPANY'] },
    component: CouponUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
