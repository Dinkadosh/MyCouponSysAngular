import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private baseUrl = 'http://localhost:8080/info';

  constructor(private http: HttpClient) { }

  getInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
