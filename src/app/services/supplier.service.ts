import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suppliers } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private API_URL = 'http://localhost:8080/supplier';

  constructor(private httpClient: HttpClient) { }

  public getSuppliers(): Observable<Suppliers[]> {
    return this.httpClient.get<Suppliers[]>(this.API_URL + '/all');
  }

  public getSupplierById(id): Observable<Suppliers> {
    return this.httpClient.get<Suppliers>(this.API_URL + '/view/' + id);
  }

  public addSupplier(supplier: Suppliers): Observable<any> {
    return this.httpClient.post(this.API_URL + '/add', supplier);
  }

  public updateSupplier(supplier: Suppliers): Observable<any> {
    return this.httpClient.patch(this.API_URL + '/edit' , supplier);
  }

  public deleteSupplier(id): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete/' + id);
  }

}
