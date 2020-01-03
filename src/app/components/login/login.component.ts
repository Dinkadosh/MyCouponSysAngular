import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.authService.login(form)
      .subscribe(res => {
        if (res.accessToken) {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('role', res.role);
          localStorage.setItem('id', res.id);
          localStorage.setItem('name', res.fullName);
          this.router.navigate(['info']);
        }
      }, (err) => {
        console.log(err);
      });
  }

  register() {
    this.router.navigate(['register']);
  }
}