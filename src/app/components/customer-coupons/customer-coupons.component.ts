import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/classes/coupon';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { NotifService } from '../../services/notif.service'

@Component({
  selector: 'app-customer-coupons',
  templateUrl: './customer-coupons.component.html',
  styleUrls: ['./customer-coupons.component.css']
})
export class CustomerCouponsComponent implements OnInit {

  coupons: Observable<Coupon[]>;

  constructor(private notifier: NotifService, private customerService: CustomerService,
    private router: Router) { 
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.coupons = this.customerService.getCustomerCoupons();
  }

  CouponDetails(id: number) {
    this.router.navigate(['couponDetails', id]);
  }

  useCoupon(id: number) {
    this.customerService.useCoupon(id).subscribe(
      data => {
        console.log(data);
        this.notifier.showNotification('success', 'Coupon used successfully! :D');
        this.reloadData();
      },
      error => console.log(error));
  }
}
