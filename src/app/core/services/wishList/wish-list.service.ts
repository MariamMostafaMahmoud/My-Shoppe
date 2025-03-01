import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private readonly httpClient: HttpClient) { }
  GetLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }
  AddProductToWishlist(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, id)
  }
  RemoveProductFromWishList(productId: String): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`)
  }
}
