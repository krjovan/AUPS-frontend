import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articles } from '../models/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private API_URL = 'http://localhost:8080/articles';

  constructor(private httpClient: HttpClient) { }

  public getArticles(): Observable<Articles[]> {
    return this.httpClient.get<Articles[]>(this.API_URL + '/all');
  }

  public getArticleById(id): Observable<Articles> {
    return this.httpClient.get<Articles>(this.API_URL + '/view/' + id);
  }

  public addArticle(article: Articles): Observable<any> {
    return this.httpClient.post(this.API_URL + '/add', article);
  }

  public updateArticle(article: Articles): Observable<any> {
    return this.httpClient.patch(this.API_URL + '/edit' , article);
  }

  public deleteArticle(id): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete/' + id);
  }

}
