import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin-service.service';
import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public isReadOnly: boolean = true;
  public user: User = new User();
  public userRole: string;

  constructor(private route: ActivatedRoute,
    private adminService: AdminService,
    private companyService: CompanyService,
    private customerService: CustomerService) {
    this.userRole = localStorage.getItem('role');
  }

  ngOnInit() {
    if (this.userRole === 'ROLE_ADMIN') {
      this.adminService.getAdmin()
        .subscribe(data => {
          console.log(data);
          this.user = data;
        }, error => console.log(error));
    } else if (this.userRole === 'ROLE_COMPANY') {
      this.companyService.getCompanyDetails()
        .subscribe(data => {
          console.log(data);
          this.user = data;
        }, error => console.log(error));
    } else if (this.userRole === 'ROLE_CUSTOMER') {
      this.customerService.getCustomerDetails()
        .subscribe(data => {
          console.log(data);
          this.user = data;
        }, error => console.log(error));
    }
  }

  updateUser() {
    if (this.userRole === 'ROLE_ADMIN') {
      this.adminService.updateAdmin(this.user)
        .subscribe(data => console.log(data), error => console.log(error));
      this.user = new User();
      this.isReadOnly = true;
      this.ngOnInit();
    } else if (this.userRole === 'ROLE_COMPANY') {
      this.companyService.updateCompany(this.user)
        .subscribe(data => console.log(data), error => console.log(error));
      this.user = new User();
      this.isReadOnly = true;
      this.ngOnInit();
    } else if (this.userRole === 'ROLE_CUSTOMER') {
      this.customerService.updateCustomer(this.user)
        .subscribe(data => console.log(data), error => console.log(error));
      this.user = new User();
      this.isReadOnly = true;
      this.ngOnInit();
    }
  }

  isReadOnlyF(boolean) {
    this.isReadOnly = boolean;
  }

}
