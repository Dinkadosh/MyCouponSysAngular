import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user'
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) { }

  getCompaniesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/company`);
  }

  getCustomersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer`);
  }

  getCouponsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/coupons`);
  }

  createUser(user: User): Observable<Object> {    
    if (user.role === 'ROLE_COMPANY') {
      return this.http.post(`${this.baseUrl}/company`, user);
    } else if (user.role === 'ROLE_CUSTOMER') {
      return this.http.post(`${this.baseUrl}/customer`, user);
    }
  }

  // register(user: User): Observable<Object> {
  //   if (user.role === 'ROLE_COMPANY') {
  //     return this.http.post(`http://localhost:8080/reg/company`, user);
  //   } else if (user.role === 'ROLE_CUSTOMER') {
  //     return this.http.post(`http://localhost:8080/reg/customer`, user);
  //   }
  // }

  getAdmin(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  updateAdmin(user: any): Observable<any> {
      return this.http.put(`${this.baseUrl}`, user);
  }

  getUser(id: number, role: string): Observable<any> {
    if (role === 'ROLE_COMPANY' || role === 'ROLE_ADMIN') {
      return this.http.get(`${this.baseUrl}/company/${id}`);
    } else if (role === 'ROLE_CUSTOMER') {
      return this.http.get(`${this.baseUrl}/customer/${id}`);
    }
  }

  getCoupon(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/coupon/${id}`);
  }

  updateUser(id: number, role: string, user: any): Observable<any> {
    if (role === 'ROLE_COMPANY' || role === 'ROLE_ADMIN') {
      return this.http.put(`${this.baseUrl}/company/${id}`, user);
    } else if (role === 'ROLE_CUSTOMER') {
      return this.http.put(`${this.baseUrl}/customer/${id}`, user);
    }
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/company/${id}`, { responseType: 'text' });
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/customer/${id}`, { responseType: 'text' });
  }

}
