import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  ViewChild,
  PLATFORM_ID,
} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Articles } from '../../../services/article';

@Component({
  selector: 'app-booking-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './booking-calendar.html',
  styleUrl: './booking-calendar.scss',
})
export class BookingCalendar implements OnInit, AfterViewInit {
  rooms: any[] = [];
  selectedRoomId: number | null = null;

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
  };

  constructor(
    private bookingService: Articles,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    this.rooms = await this.bookingService.getRooms(); // ✅ ใช้ this.
    console.log('Available rooms:', this.rooms);
  }

  ngAfterViewInit() {
    // กรณีใช้ SSR: ไม่ต้องโหลด plugin ใหม่ ถ้าโหลดแล้วใน calendarOptions
    if (!isPlatformBrowser(this.platformId)) return;
  }

  async selectRoom(roomId: number) {
    this.selectedRoomId = roomId;
    const bookings = await this.bookingService.getBookingsByRoom(roomId);
    console.log('Bookings for room', roomId, ':', bookings);

    // ✅ อัปเดตข้อมูลใน Calendar
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.removeAllEvents();
    calendarApi.addEventSource(bookings);
  }
}
