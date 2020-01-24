import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotifService } from '../../services/notif.service';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  hide = true;
  secure = new SecureLS();

  constructor(private notifier: NotifService, 
              private formBuilder: FormBuilder, 
              private router: Router, 
              private authService: AuthService) {

  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['info']);
    }
    this.loginForm = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  onFormSubmit(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(form)
      .subscribe(res => {
        if (res.accessToken) {
          this.secure.set('tokenS', res.accessToken);
          this.secure.set('roleS', res.role);
          this.secure.set('nameS', res.fullName);
          // localStorage.setItem('token', res.accessToken);
          // localStorage.setItem('role', res.role);
          // localStorage.setItem('name', res.fullName);
          this.notifier.showNotification('success', 'You have successfully logged in! ;)');
          this.router.navigate(['info']);
        }
      }, (err) => {
        this.notifier.showNotification('error', err);
        console.log(err);
      });
  }

  get f() { return this.loginForm.controls; }

  register() {
    this.router.navigate(['register']);
  }
}