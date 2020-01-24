import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { NotifService } from '../../services/notif.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  submitted = false;

  constructor(private notifi: NotifService, private formBuilder: FormBuilder, private router: Router,
    private adminService: AdminService) {
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      'fullName': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(4)]],
      'role': [null, Validators.required]
    }
    );
  }

  get f() { return this.addUserForm.controls; }

  onFormSubmit(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }

    this.adminService.createUser(form)
      .subscribe(data => {
        console.log(data);
        this.notifi.showNotification('success', 'User added successfully! :)');
        this.gotoList(this.addUserForm.controls['role'].value);
      },
        error => console.log(error));
    
  }

  gotoList(role) {
    if (role === 'ROLE_COMPANY') {
      this.router.navigate(['companies'])
    } else if (role === 'ROLE_CUSTOMER') {
      this.router.navigate(['customers'])
    }
  }

}
