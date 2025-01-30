import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogged = new BehaviorSubject<boolean>(localStorage.getItem('token')? true: false);

  constructor(private _http:HttpClient) { }

  login(form:object): Observable<any> {
    return this._http.post('http://elnisr.webxy.net/api/Auth/login', form);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }
}
