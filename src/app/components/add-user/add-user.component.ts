import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { User } from '../../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUser: User = new User();

  constructor(private adminService:AdminService, private router: Router) { }

  ngOnInit() {
  }

  save() {
    this.adminService.createUser(this.newUser)
      .subscribe(data => console.log(data), error => console.log(error));
    this.newUser = new User();
    this.gotoList(this.newUser.role);
  }

  onSubmit() {
    this.save();
  }

  gotoList(role) {
    if (role === 'ROLE_COMPANY') {
      this.router.navigate(['companies'])
    } else if (role === 'ROLE_CUSTOMER') {
      this.router.navigate(['customer'])
    }
  }

  clear() {
    this.newUser.fullName = '';
    this.newUser.email= '';
    this.newUser.password = '';
  }
 
}
