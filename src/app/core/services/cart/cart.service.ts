import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly httpClient: HttpClient) { }
  CartNum:BehaviorSubject<number>=new BehaviorSubject(0)
  AddProductToCart(prodId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": prodId
      }
    )
  }
  UpdateCartProductQuantity(prodId: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${prodId}`, {
      "count": count
    })
  }
  GetLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }
  RemoveSpecificCartItem(itemId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${itemId}`)
  }
  ClearUserCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }
}
