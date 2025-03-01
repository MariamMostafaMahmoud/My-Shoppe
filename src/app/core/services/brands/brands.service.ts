import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  idBrand: string = ''
  constructor(private readonly httpClient: HttpClient) { }
  getAllBrands(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }
  getSpecificBrand(brandId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands/${brandId}`)
  }
}
