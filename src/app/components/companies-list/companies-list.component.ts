import { Observable } from "rxjs";
import { AdminService } from "../../services/admin-service.service";
import { User } from "../../classes/user";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';


@Component({
  selector: 'app-companies',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Observable<User[]>;

  constructor(private adminService: AdminService,
    private router: Router) {
     }

  ngOnInit() {
    this.companies = this.adminService.getCompaniesList();
  }

  deleteCompany(id: number) {
    this.adminService.deleteCompany(id)
      .subscribe(
        data => {
          this.ngOnInit();
        },
        error => console.log(error));
  }

  UserDetails(id: number, role: string) {
    this.router.navigate(['userDetails', id, role]);
    this.ngOnInit();
  }

  UserUpdate(id: number, role: string) {
    this.router.navigate(['updateUser', id, role]);
    this.ngOnInit();
  }

}
