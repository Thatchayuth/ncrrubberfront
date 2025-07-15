import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Article,ArticleResponse } from '../models/article.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Articles {
  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
  return this.http
    .get<ArticleResponse>(`${environment.apiUrl}/api/dashboard-news-items?populate=*`)
    .pipe(map(res => res.data));
}

}
