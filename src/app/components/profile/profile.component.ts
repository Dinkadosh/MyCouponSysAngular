import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin-service.service';
import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotifService } from '../../services/notif.service';
import * as SecureLS from 'secure-ls';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  secure = new SecureLS();
  public isReadOnly: boolean = true;
  public user: User = new User();
  public userRole: string;

  constructor(private notifier: NotifService, private route: ActivatedRoute,
    private adminService: AdminService,
    private companyService: CompanyService,
    private customerService: CustomerService) {
    this.userRole = this.secure.get('roleS');
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
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
        .subscribe(data => {
          console.log(data);
          this.isReadOnly = true;
          this.notifier.showNotification('success', 'Your profile updated successfully! :P');
          this.reloadData();
        }, error => console.log(error));
    } else if (this.userRole === 'ROLE_COMPANY') {
      this.companyService.updateCompany(this.user)
        .subscribe(data => {
          console.log(data);
          this.isReadOnly = true;
          this.notifier.showNotification('success', 'Your profile updated successfully! :P');
          this.reloadData();
        }, error => console.log(error));
    } else if (this.userRole === 'ROLE_CUSTOMER') {
      this.customerService.updateCustomer(this.user)
        .subscribe(data => {
          console.log(data);
          this.isReadOnly = true;
          this.notifier.showNotification('success', 'Your profile updated successfully! :P');
          this.reloadData();
        }, error => console.log(error));
    }
  }

  isReadOnlyF(boolean) {
    this.isReadOnly = boolean;
  }
}
