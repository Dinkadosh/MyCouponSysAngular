import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../classes/user';
import * as SecureLS from 'secure-ls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User> = new Observable<User>();

  isLoggedIn = false;
  redirectUrl: string;
  jwt: string;
  secure = new SecureLS();

  apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // public currentUserValue(): User {
  //   if (this.currentUser) {
  //     return this.currentUserSubject.value;
  //   }
  // }

  islogin() {
    if (this.secure.get('tokenS')) {
      return this.isLoggedIn = true;
    } else {
      return this.isLoggedIn = false;
    }
  }

//   login(data: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl + 'login', data)
//       .pipe(map(data => {
//         // // login successful if there's a jwt token in the response
//         if (data && data.accessToken) {
//         //   // store user details and jwt token in local storage to keep user logged in between page refreshes
//         //   localStorage.setItem('userId', data.id);
//         //   localStorage.setItem('userRole', data.role);
//         //   localStorage.setItem('userName', data.fullName);
//         this.currentUserSubject.next(data);
        
//         // localStorage.setItem('userRole', this.currentUserValue.role);
//       }

//         return data;
//   }));
// }

login(data: any): Observable<any> {
  return this.http.post<any>(this.apiUrl + 'login', data)
    .pipe(
      tap(_ => this.isLoggedIn= true),
      catchError(this.handleError('login', []))
    );
}

register(data: any): Observable < any > {
  if(data.role === "company") {
  return this.http.post<any>(this.apiUrl + 'register/company', data)
    .pipe(
      tap(_ => this.log('login')),
      catchError(this.handleError('login', []))
    );
} else if (data.role === "customer") {
  return this.http.post<any>(this.apiUrl + 'register/customer', data)
    .pipe(
      tap(_ => this.log('login')),
      catchError(this.handleError('login', []))
    );
}
  }

  private handleError<T>(operation = 'operation', result ?: T) {
  return (error: any): Observable<T> => {

    console.error(error.message); // log to console instead
    this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}

parseJwt() {
  let jwtHelper = new JwtHelperService();
  let objJwt = jwtHelper.decodeToken(this.jwt);

}

loadToken() {
  this.jwt = this.secure.get('tokenS');
  this.parseJwt();
}

  private log(message: string) {
  console.log(message);
}
}
