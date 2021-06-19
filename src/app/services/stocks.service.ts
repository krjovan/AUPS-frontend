import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stocks } from '../models/stocks';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private API_URL = 'http://localhost:8080/stocks';

  constructor(private httpClient: HttpClient) { }

  public getStocks(): Observable<Stocks[]> {
    return this.httpClient.get<Stocks[]>(this.API_URL + '/all');
  }

  public getStockById(id): Observable<Stocks> {
    return this.httpClient.get<Stocks>(this.API_URL + '/view/' + id);
  }

  public addStock(stock: Stocks): Observable<any> {
    return this.httpClient.post(this.API_URL + '/add', stock);
  }

  public updateStock(stock: Stocks): Observable<any> {
    return this.httpClient.patch(this.API_URL + '/edit' , stock);
  }

  public deleteStock(id): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete/' + id);
  }

}
