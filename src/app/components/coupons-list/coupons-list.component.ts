import { Observable } from "rxjs";
import { AdminService } from "../../services/admin-service.service";
import { Coupon } from "../../classes/coupon";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.css']
})
export class CouponsListComponent implements OnInit {
  coupons: Observable<Coupon[]>;

  constructor(private adminService: AdminService,
    private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.coupons = this.adminService.getCouponsList();
  }

  CouponDetails(id: number) {
    this.router.navigate(['couponDetails', id]);
  }

}
