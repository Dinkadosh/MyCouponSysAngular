import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from '../classes/coupon';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8080/customer';

  constructor(private http: HttpClient) { }

  getCustomerDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCustomerCoupons(): Observable<any> {
    return this.http.get(`${this.baseUrl}/myCoupons`);
  }

  getCouponsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/coupons`);
  }

  updateCustomer(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, user);
  }

  getCoupon(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/coupon/${id}`);
  }

  buyCoupon(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/buy/${id}`);
  }

  useCoupon(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/use/${id}`);
  }
}
  