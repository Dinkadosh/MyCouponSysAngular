import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/classes/coupon';
import { Category, CategoryToMapping } from 'src/app/classes/category.enum';

@Component({
  selector: 'app-coupon-update',
  templateUrl: './coupon-update.component.html',
  styleUrls: ['./coupon-update.component.css']
})
export class CouponUpdateComponent implements OnInit {

  private couponId: number;
  public coupon: Coupon;
  public categoryToMapping = CategoryToMapping;
  public categories: String[] = Object.values(Category);

  constructor(private route: ActivatedRoute, private router: Router,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.coupon = new Coupon();

    this.couponId = this.route.snapshot.params['id'];

    this.companyService.getCoupon(this.couponId)
    .subscribe(data => {
      console.log(data);
      this.coupon = data;
    }, error => console.log(error));
  }

  updateCoupon() {
    this.companyService.updateCoupon(this.couponId, this.coupon)
      .subscribe(data => console.log(data), error => console.log(error));
    this.coupon = new Coupon();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['my_coupons']);
  }

}
