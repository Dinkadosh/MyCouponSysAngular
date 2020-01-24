import { Observable } from "rxjs";
import { AdminService } from "../../services/admin-service.service";
import { User } from "../../classes/user";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { NotifService } from '../../services/notif.service';
import { MatDialog} from '@angular/material';
import { MymodalComponent } from '../mymodal/mymodal.component';


@Component({
  selector: 'app-companies',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Observable<User[]>;

  constructor(private notifi: NotifService, private adminService: AdminService,
    private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.companies = this.adminService.getCompaniesList();
  }

  deleteCompany(id: number) {
    this.adminService.deleteCompany(id)
      .subscribe(
        data => {
          console.log(data);
          this.notifi.showNotification('success', 'Company deleted successfully! :)');
          this.reloadData();
        },
        error => console.log(error));
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(MymodalComponent, {
      width: '250px',
      data: "Delete Company?"
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteCompany(id);
      }
    });
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
