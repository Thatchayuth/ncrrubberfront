import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, ArticleResponse } from '../models/article.model';
import { environment } from '../environments/environment';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class Articles {
  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http
      .get<ArticleResponse>(
        `${environment.apiUrl}/api/dashboard-news-items?populate=*`
      )
      .pipe(map((res) => res.data));
  }

  async  getRooms() {
    const res = await axios.get(`${environment.apiUrl}/api/meeting-rooms`);
    return res.data.data;
  }

   async getBookingsByRoom(roomId: number) {
    const res = await axios.get(`${environment.apiUrl}/api/bookings?filters[room][id][$eq]=${roomId}&populate=room`);
    console.log('Bookings response:', res.data);
    return res.data.data.map(item => ({
      title: item.title,
      start: item.startTime,
      end: item.endTime
    }));
  }
}
