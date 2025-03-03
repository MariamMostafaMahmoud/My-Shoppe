import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private readonly httpClient: HttpClient) { }
  CountWishList: BehaviorSubject<number> = new BehaviorSubject(0)
  GetLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }
  AddProductToWishlist(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      })
  }
  RemoveProductFromWishList(productId: String): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`)
  }
}
