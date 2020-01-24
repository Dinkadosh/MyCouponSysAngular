import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';
import { NotifService } from '../../services/notif.service';
import { MatDialog} from '@angular/material';
import { MymodalComponent } from '../mymodal/mymodal.component';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  authority: string = '';
  currentUser: User = new User();
  authService: any;
  secure = new SecureLS();

  constructor(private notifier: NotifService, private router: Router, private dialog: MatDialog) {

  }

  ngOnInit() {
  }

  isloginn() {
    if (this.secure.get('tokenS')) {
      return true;
    }
  }

  isCompany() {
    if (this.secure.get('roleS') === 'ROLE_COMPANY') {
      return true;
    }
  }

  isCustomer() {
    if (this.secure.get('roleS') === 'ROLE_CUSTOMER') {
      return true;
    }
  }

  isAdmin() {
    if (this.secure.get('roleS') === 'ROLE_ADMIN') {
      return true;
    }
  }

  logout() {
    this.notifier.showNotification('success', 'Bye! See you :)');
    this.secure.removeAll();
    this.router.navigate(['login']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MymodalComponent, {
      width: '250px',
      data: "Want to Logout?"
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.logout();
      }
    });
  }
}
