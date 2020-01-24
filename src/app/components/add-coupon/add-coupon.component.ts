import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';
import { CategoryToMapping, Category } from 'src/app/classes/category.enum';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { NotifService } from '../../services/notif.service'

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {
  [x: string]: any;

  public categoryToMapping = CategoryToMapping;
  public categories: String[] = Object.values(Category);
  couponForm: FormGroup;
  submitted = false;
  date: Date;


  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private router: Router,
    private notifi: NotifService) {
  }

  ngOnInit() {
    this.date = new Date;
    this.couponForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'category': [null, Validators.required],
      'description': [null, [Validators.required, Validators.maxLength(250)]],
      'startDate': [null, Validators.required],
      'endDate': [null, Validators.required],
      'amount': [null, Validators.required],
      'price': [null, Validators.required],
      'image' : [null]
    },
      { validator: this.endDateAfterOrEqualValidator }
    );
  }

  onFormSubmit(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.couponForm.invalid) {
      return;
    }

    this.save(form);
  }

  save(form: NgForm) {
    this.companyService.addCoupon(form)
      .subscribe(data => {
        console.log(data);
        this.notifi.showNotification('success', "Coupon added successfully! =)");
        this.gotoList();
      }, error => console.log(error));

  }

  gotoList() {
    this.router.navigate(['company_coupons'])
  }

  get f() { return this.couponForm.controls; }
}
