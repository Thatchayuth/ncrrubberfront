// src/app/services/web-socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:1337'); // เปลี่ยนเป็น URL ของ Strapi ถ้ารันใน server จริง
  }

  onBookingCreated(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('bookingCreated', (data) => {
        observer.next(data); // 👈 ส่งข้อมูลต่อให้ component ที่ subscribe
      });
    });
  }

  emitBooking(data: any) {
    this.socket.emit('newBooking', data);
  }
}
