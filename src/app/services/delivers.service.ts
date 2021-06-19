import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivers } from '../models/delivers';

@Injectable({
  providedIn: 'root'
})
export class DeliversService {

  private API_URL = 'http://localhost:8080/delivers';

  constructor(private httpClient: HttpClient) { }

  public getDelivers(): Observable<Delivers[]> {
    return this.httpClient.get<Delivers[]>(this.API_URL + '/all');
  }

  public getDeliveryById(id): Observable<Delivers> {
    return this.httpClient.get<Delivers>(this.API_URL + '/view/' + id);
  }

  public addDelivery(delivery: Delivers): Observable<any> {
    return this.httpClient.post(this.API_URL + '/add', delivery);
  }

  public updateDelivery(delivery: Delivers): Observable<any> {
    return this.httpClient.patch(this.API_URL + '/edit' , delivery);
  }

  public deleteDelivery(id): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete/' + id);
  }

}
