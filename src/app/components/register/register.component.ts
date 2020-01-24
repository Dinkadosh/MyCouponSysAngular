import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../classes/mustMuch';
import { NotifService } from '../../services/notif.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;


  constructor(private notifier: NotifService, private formBuilder: FormBuilder, private router: Router, 
    private authService: AuthService) { 
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'fullName': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(4)]],
      'confirmPassword': [null, Validators.required],
      'role': [null, Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  get f() { return this.registerForm.controls; }

  onFormSubmit(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(form)
      .subscribe(res => {
        if (res.id > 0) {
          this.notifier.showNotification('success', 'You registered successfully! =)')
          this.router.navigate(['login']);
        }
      }, (err) => {
        console.log(err);
        alert(err.error);
      });
  }
}
