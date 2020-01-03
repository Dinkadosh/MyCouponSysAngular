import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn = false;
  authority: any;
  id: String = '';
  firstName: String = '';
  lastname: String = '';
  hide: boolean =true;
  addName: String = 'Company';

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.islogin();
  }

}
