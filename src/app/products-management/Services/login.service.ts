import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http:HttpClient) { }

  login(form:object): Observable<any> {
    return this._http.post('http://elnisr.webxy.net/api/Auth/login', form);
  }
}
