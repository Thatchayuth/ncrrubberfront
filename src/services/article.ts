import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Article,ArticleResponse } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class Articles {
  private apiUrl = 'http://localhost:1337/api/';
  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
  return this.http
    .get<ArticleResponse>(`${this.apiUrl}dashboard-news-items?populate=*`)
    .pipe(map(res => res.data));
}

}
