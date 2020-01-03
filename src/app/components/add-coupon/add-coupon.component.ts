import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Coupon } from 'src/app/classes/coupon';
import { Router } from '@angular/router';
import { CategoryToMapping, Category } from 'src/app/classes/category.enum';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {
  
  newCoupon: Coupon = new Coupon();
  public categoryToMapping = CategoryToMapping;
  public categories: String[] = Object.values(Category);


  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
  }

  save() {
    this.companyService.addCoupon(this.newCoupon)
      .subscribe(data => console.log(data), error => console.log(error));
    this.newCoupon = new Coupon();
    this.gotoList();
  }

  gotoList() {
      this.router.navigate(['company_coupons'])
  }

  clear() {

  }

}
