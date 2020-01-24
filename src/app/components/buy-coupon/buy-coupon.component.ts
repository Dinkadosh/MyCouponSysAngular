import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/classes/coupon';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { NotifService } from '../../services/notif.service'

@Component({
  selector: 'app-buy-coupon',
  templateUrl: './buy-coupon.component.html',
  styleUrls: ['./buy-coupon.component.css']
})
export class BuyCouponComponent implements OnInit {

  coupons: Observable<Coupon[]>;


  constructor(private notifi: NotifService, private customerService: CustomerService,
    private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.coupons = this.customerService.getCouponsList();
  }

  buyCoupon(id: number) {
    this.customerService.buyCoupon(id)
      .subscribe(data => {
        console.log(data);
        this.notifi.showNotification('success', 'Coupon purchased successfully! :D');
        this.reloadData();
      }, error => {
        console.log(error);
        this.notifi.showNotification('error', 'Error! :(');
        this.reloadData();       
      });;
  }

}
