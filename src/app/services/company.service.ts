import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from '../classes/coupon';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://localhost:8080/company';

  constructor(private http: HttpClient) { }

  getCompaniesCouponsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/coupons`);
  }

  getCompanyDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  updateCompany(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, user);
  }

  getCoupon(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/coupon/${id}`);
  }

  updateCoupon(id: number, coupon: Coupon): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateCoupon/${id}`, coupon);
  }

  addCoupon(coupon: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addCoupon/`, coupon);
  }

  deleteCoupon(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
}
