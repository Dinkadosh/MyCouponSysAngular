import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../classes/coupon';
import { AdminService } from '../../services/admin-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import {Location} from '@angular/common';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent implements OnInit {

  public id: number;
  public coupon: Coupon;

  constructor(private route: ActivatedRoute, private router: Router,
    private adminService: AdminService, private companyService: CompanyService,
    private customerService: CustomerService,
    private location: Location) { }

  ngOnInit() {
    this.coupon = new Coupon();

    this.id = this.route.snapshot.params['id'];

    if (localStorage.getItem('role') === "ROLE_ADMIN") {
      this.adminService.getCoupon(this.id)
        .subscribe(data => {
          console.log(data)
          this.coupon = data;
        }, error => console.log(error));
    } else if (localStorage.getItem('role') === "ROLE_COMPANY") {      
      this.companyService.getCoupon(this.id)
      .subscribe(data => {
        console.log(data)
        this.coupon = data;
      }, error => console.log(error));

    } else if (localStorage.getItem('role') === "ROLE_CUSTOMER") {
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

}
