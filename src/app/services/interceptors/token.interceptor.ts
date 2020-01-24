import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as SecureLS from 'secure-ls';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private notifier: NotifierService;
  secure = new SecureLS();

  constructor(notifier: NotifierService, private router: Router) {
    this.notifier = notifier;
   }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //const token = localStorage.getItem('token');
    const token = this.secure.get('tokenS');
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + token
        }
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
          this.showNotification("error", "Authentication error. Please login in.");
          this.secure.removeAll();
          // localStorage.clear();
          this.router.navigate(['login']);
        }
        if (error.status === 400) {
          this.showNotification("error", error.error);
        }
        return throwError(error);
      }));
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

}