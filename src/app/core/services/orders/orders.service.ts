import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

    constructor(private readonly httpClient:HttpClient) { }
  
    CreateCashOrder(data:object,idCart:string):Observable<any>{
      return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${idCart}`,{
        "shippingAddress":data
      })
    }

    getAllOrders():Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/`)
    }
    getUSerOrders(id:string):Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
    }
    CheckOut(data:object,cartId:string):Observable<any>{
      return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
       {
        "shippingAddress":data
      })
    }
}
