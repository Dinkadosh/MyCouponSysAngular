import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/classes/coupon';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from '../../services/notif.service';
import { MatDialog} from '@angular/material';
import { MymodalComponent } from '../mymodal/mymodal.component';

@Component({
  selector: 'app-company-coupons',
  templateUrl: './company-coupons.component.html',
  styleUrls: ['./company-coupons.component.css']
})
export class CompanyCouponsComponent implements OnInit {
  coupons: Observable<Coupon[]>;




  constructor(private notifier: NotifService, private companyService: CompanyService,
    private router: Router, private dialog: MatDialog) {
     }

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
        console.log(data);
        this.notifier.showNotification('success', 'Coupon deleted successfully! :D');
        this.reloadData();
      },
      error => console.log(error));
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(MymodalComponent, {
      width: '250px',
      data: "Delete Coupon?"
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.CouponDelete(id);
      }
    });
  }

}
