import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private API_URL = 'http://localhost:8080/orders';

  constructor(private httpClient: HttpClient) { }

  public getOrders(): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>(this.API_URL + '/all');
  }

  public getOrderById(id): Observable<Orders> {
    return this.httpClient.get<Orders>(this.API_URL + '/view/' + id);
  }

  public addOrder(order: Orders): Observable<any> {
    return this.httpClient.post(this.API_URL + '/add', order);
  }

  public updateOrder(order: Orders): Observable<any> {
    return this.httpClient.patch(this.API_URL + '/edit' , order);
  }

  public deleteOrder(id): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete/' + id);
  }

}
