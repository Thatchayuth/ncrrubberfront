import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class Websocket {

  private socket$: WebSocketSubject<any>;
  public messages$: Subject<string> = new Subject();

  private url = 'ws://localhost:8000/ws/line1'; // เปลี่ยนให้ตรงกับ FastAPI
  private reconnectDelay = 3000;

  constructor() {
    this.connect();
  }

  private connect() {
    this.socket$ = webSocket(this.url);

    this.socket$.subscribe({
      next: msg => this.messages$.next(msg),
      error: err => {
        console.warn('WebSocket error', err);
        this.reconnect();
      },
      complete: () => {
        console.warn('WebSocket closed');
        this.reconnect();
      }
    });
  }

  private reconnect() {
    timer(this.reconnectDelay).subscribe(() => {
      console.log('Reconnecting WebSocket...');
      this.connect();
    });
  }

  sendMessage(message: string) {
    this.socket$.next(message);
  }
}
