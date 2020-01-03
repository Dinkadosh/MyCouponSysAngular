import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin-service.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  public userId: number;
  public user: User;
  public userRole: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private adminService: AdminService) { }

  ngOnInit() {
    this.user = new User();

    this.userId = this.route.snapshot.params['id'];
    this.userRole = this.route.snapshot.params['role'];

    this.adminService.getUser(this.userId, this.userRole)
      .subscribe(data => {
        console.log(data);
        this.user = data;
      }, error => console.log(error));
  }

  updateUser() {
    this.adminService.updateUser(this.userId, this.userRole, this.user)
      .subscribe(data => {
        this.user = data;
        console.log(data)}, error => console.log(error));
    this.user = new User();
    this.gotoList();
  }

  gotoList() {
    if (this.userRole === 'ROLE_COMPANY') {
      this.router.navigate(['companies']);
    } else if (this.userRole === 'ROLE_CUSTOMER') {
      this.router.navigate(['customers']);
    }
    // if (this.role === 'ROLE_COMPANY') {
    //   this.router.navigate(['companies']).then(() => {
    //     window.location.reload();
    //   });
    // } else if (this.role === 'ROLE_CUSTOMER') {
    //   this.router.navigate(['customers']).then(() => {
    //     window.location.reload();
    //   });
    // }
  }

  onSubmit() {
    this.updateUser();
  }

}
