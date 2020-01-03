import { Observable } from "rxjs";
import { AdminService } from "../../services/admin-service.service";
import { User } from "../../classes/user";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Observable<User[]>;

  constructor(private adminService: AdminService,
    private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.customers = this.adminService.getCustomersList();
  }

  deleteCustomer(id: number) {
    this.adminService.deleteCustomer(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  UserDetails(id: number, role: string) {
    this.router.navigate(['userDetails', id, role]);
  }

  UserUpdate(id: number, role: string) {
    this.router.navigate(['updateUser', id, role]);
  }

}
