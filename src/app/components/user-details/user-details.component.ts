import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { AdminService } from '../../services/admin-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public id: number;
  public user: User;
  public role: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private adminService: AdminService) { }

  ngOnInit() {
    this.user = new User();

    this.id = this.route.snapshot.params['id'];
    this.role = this.route.snapshot.params['role'];

    this.adminService.getUser(this.id, this.role)
      .subscribe(data => {
        console.log(data)
        this.user = data;
      }, error => console.log(error));
  }

  CouponDetails(id: number) {
    this.router.navigate(['couponDetails', id]);
  }

  gotoList() {
    if (this.role === 'ROLE_COMPANY') {
      this.router.navigate(['companies']);
    } else if (this.role === 'ROLE_CUSTOMER') {
      this.router.navigate(['customers']);
    }
  }
}
