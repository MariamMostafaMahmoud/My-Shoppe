import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  constructor(private readonly httpClient: HttpClient) { }

  GetAllSubCategories(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/subcategories`)
  }
  GetSpecificSubCategory(subCatID: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/subcategories/${subCatID}`)
  }
  GetAllSubCategoriesOnCategory(catId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${catId}/subcategories`)
  }
}
