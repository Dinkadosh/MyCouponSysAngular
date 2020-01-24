import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../classes/coupon';
import { AdminService } from '../../services/admin-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import {Location} from '@angular/common';
import { CustomerService } from 'src/app/services/customer.service';
import { NotifService } from 'src/app/services/notif.service';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent implements OnInit {

  secure = new SecureLS();
  public id: number;
  public coupon: Coupon;
  public role: string = this.secure.get('roleS');


  constructor(private notifier: NotifService, private route: ActivatedRoute, private router: Router,
    private adminService: AdminService, private companyService: CompanyService,
    private customerService: CustomerService,
    private location: Location) { }

  ngOnInit() {
    this.coupon = new Coupon();

    this.id = this.route.snapshot.params['id'];

    if (this.role === "ROLE_ADMIN") {
      this.adminService.getCoupon(this.id)
        .subscribe(data => {
          console.log(data)
          this.coupon = data;
        }, error => console.log(error));
    } else if (this.role === "ROLE_COMPANY") {      
      this.companyService.getCoupon(this.id)
      .subscribe(data => {
        console.log(data)
        this.coupon = data;
      }, error => console.log(error));

    } else if (this.role === "ROLE_CUSTOMER") {
      this.customerService.getCoupon(this.id)
        .subscribe(data => {
          console.log(data)
          this.coupon = data;
        }, error => console.log(error));
    }
  }

  goBack() {
    this.location.back();
  }

  useCoupon(id: number) {
    this.customerService.useCoupon(id).subscribe(
      data => {
        console.log(data);
        this.notifier.showNotification('success', 'Coupon used successfully! :D');
        this.router.navigate(['customer_coupons']);
      },
      error => console.log(error));
  }

}
