import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly httpClient: HttpClient) { }
  getAllProducts(limit?: number, page?: number, brand?: string): Observable<any> {
    let params = new HttpParams();

    if (limit) params = params.set('limit', limit);
    if (page) params = params.set('page', page);
    if (brand) params = params.set('brand', brand);



    return this.httpClient.get(`${environment.baseUrl}/api/v1/products`, { params });
  }

  getSpecificProduct(id: string | null): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}
