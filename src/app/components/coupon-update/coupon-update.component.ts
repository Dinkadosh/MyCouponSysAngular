import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/classes/coupon';
import { Category, CategoryToMapping } from 'src/app/classes/category.enum';
import { NotifService } from '../../services/notif.service'

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
  date: Date;

  constructor(private notifier: NotifService, private route: ActivatedRoute, private router: Router,
    private companyService: CompanyService) { 
    }

  ngOnInit() {
    this.date = new Date();
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
      .subscribe(data => {
        console.log(data);
        this.notifier.showNotification('success', 'Coupon updated successfully! =)');
        this.gotoList();
      }, error => console.log(error));
  }

  gotoList() {
    this.router.navigate(['company_coupons']);
  }
}
