import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/classes/coupon';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-coupons',
  templateUrl: './company-coupons.component.html',
  styleUrls: ['./company-coupons.component.css']
})
export class CompanyCouponsComponent implements OnInit {
  coupons: Observable<Coupon[]>;


  constructor(private companyService: CompanyService,
    private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.coupons = this.companyService.getCompaniesCouponsList();
  }

  CouponDetails(id: number) {
    this.router.navigate(['couponDetails', id]);
  }

  CouponUpdate(id: number) {
    this.router.navigate(['couponUpdate', id]);
  }

  CouponDelete(id: number) {
    this.companyService.deleteCoupon(id).subscribe(
      data => {
        this.ngOnInit();
      },
      error => console.log(error));
  }

}
