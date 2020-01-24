import { Observable } from "rxjs";
import { AdminService } from "../../services/admin-service.service";
import { User } from "../../classes/user";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { NotifService } from '../../services/notif.service';
import { MatDialog} from '@angular/material';
import { MymodalComponent } from '../mymodal/mymodal.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Observable<User[]>;

  constructor(private notifier: NotifService, private adminService: AdminService,
    private router: Router, private dialog: MatDialog) {
     }

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
          this.notifier.showNotification('success', 'Customer deleted successfully! :)');
          this.reloadData();
        },
        error => console.log(error));
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(MymodalComponent, {
      width: '250px',
      data: "Delete Customer?"
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteCustomer(id);
      }
    });
  }

  UserDetails(id: number, role: string) {
    this.router.navigate(['userDetails', id, role]);
  }

  UserUpdate(id: number, role: string) {
    this.router.navigate(['updateUser', id, role]);
  }
}
