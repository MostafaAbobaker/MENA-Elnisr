import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGovernorates } from '../Interfaces/igovernorates';

@Injectable({
  providedIn: 'root'
})
export class GovernoratesService {

  constructor(private _http: HttpClient) { }


  getGovernorates(): Observable<any> {
/*     let headers = new HttpHeaders().set('Content-Type', 'application/json');
     return this._http.get('http://elnisr.webxy.net/api/Governorates/GetAll', { headers: headers });
 */
  return this._http.get('http://elnisr.webxy.net/api/Governorates/GetAll')
    }

  addGovernorates(gov:IGovernorates) : Observable<any> {
    return this._http.post('http://elnisr.webxy.net/api/Governorates/Add',
      {
        id:0,
        nameAr: gov.nameAr,
        nameEn: gov.nameEn,
        isFreeDelivery: gov.isFreeDelivery,
        deliverdFees: gov.deliverdFees
      })
  }
  updateGovernorates(id :number,gov:IGovernorates ) : Observable<any> {
    return this._http.put('http://elnisr.webxy.net/api/Governorates/Update',
      {
        id: id,
        nameAr: gov.nameAr,
        nameEn: gov.nameEn,
        isFreeDelivery: gov.isFreeDelivery,
        deliverdFees: gov.deliverdFees
      })
  }
  deleteGovernorates(id:number) : Observable<any> {
    return this._http.delete(`http://elnisr.webxy.net/api/Governorates/Delete/${id}`)
  }
}
