import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GovernoratesService {

    constructor(private _http: HttpClient) { }

  getGovernorates(): Observable<any> {

    return this._http.get('http://elnisr.webxy.net/api/Governorates/GetAll')
      }


}
