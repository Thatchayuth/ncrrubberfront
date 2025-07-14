import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatServices {

 apiUrl = 'http://localhost:8000/chat';

  constructor(private http: HttpClient) {}

  sendChat(question: string) {
    return this.http.post(this.apiUrl, { question });
  }
}
