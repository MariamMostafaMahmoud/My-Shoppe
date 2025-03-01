import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDate: any = null
  constructor(private readonly httpClient: HttpClient) { }
  private readonly _router = inject(Router)

  SendDataSignUp(Data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, Data)
  }
  SendDataLogin(Data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, Data)
  }
  saveUserData() {
    if (localStorage.getItem('userToken') !== null) {
      this.userDate = jwtDecode(localStorage.getItem('userToken')!)
      console.log(this.userDate)
      
    }
  }
  LogOut() {
    localStorage.removeItem('userToken')
    this.userDate = null
    this._router.navigate(['/login'])

  }
  // forget pass
  VerfiyEmail(email:object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,email)
  }
  setCode(code:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,code)
  }
  setNewPassword(newData:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,newData)
  }
}
