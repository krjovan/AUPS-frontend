import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Types } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  private API_URL = 'http://localhost:8080/types';

  constructor(private httpClient: HttpClient) { }

  public getTypes(): Observable<Types[]> {
    return this.httpClient.get<Types[]>(this.API_URL + '/all');
  }

  public getTypeById(id): Observable<Types> {
    return this.httpClient.get<Types>(this.API_URL + '/view/' + id);
  }

  public addType(type: Types): Observable<any> {
    return this.httpClient.post(this.API_URL + '/add', type);
  }

  public updateType(type: Types): Observable<any> {
    return this.httpClient.patch(this.API_URL + '/edit' , type);
  }

  public deleteType(id): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete/' + id);
  }

}
