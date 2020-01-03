import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  isloginn() {
    if (localStorage.getItem('token')) {
      return true;
    }
  }

  isCompany() {
    if (localStorage.getItem('role') === 'ROLE_COMPANY') {
      return true;
    }
  }

  isCustomer() {
    if (localStorage.getItem('role') === 'ROLE_CUSTOMER') {
      return true;
    }
  }

  isAdmin() {
    if (localStorage.getItem('role') === 'ROLE_ADMIN') {
      return true;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
