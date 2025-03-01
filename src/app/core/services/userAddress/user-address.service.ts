import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  constructor(private readonly httpClient: HttpClient) { }
  GetLoggedUserAddresses(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/addresses`)
  }
  GetSpecificAddress(IdAddress: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/addresses/${IdAddress}`)
  }
  RemoveAddress(IdAddress: string):Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/addresses/${IdAddress}`)
  }
  AddAddress(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/addresses` ,data)
  }
}
