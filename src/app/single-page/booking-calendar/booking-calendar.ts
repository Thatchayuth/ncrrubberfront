import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  ViewChild,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import thLocale from '@fullcalendar/core/locales/th';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Articles } from '../../../services/article';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;
@Component({
  selector: 'app-booking-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, FormsModule],
  templateUrl: './booking-calendar.html',
  styleUrl: './booking-calendar.scss',
})
export class BookingCalendar implements OnInit, AfterViewInit {
  rooms: any[] = [];
  selectedRoomId: number | null = null;
  bookingData = {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    room: null as number | null,
    date: new Date(),
    datestring: '',
  };
  selectedSlot: any = null;
  calendarOptions: CalendarOptions;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  constructor(
    private bookingService: Articles,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.calendarOptions = {
      locale: thLocale,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth', // ✅ ใช้ view เดือน
      headerToolbar: {
        center: 'title',
        left: 'prev,next today',
        right: 'timeGridWeek dayGridMonth',
      },
      editable: false,
      selectable: true,
      select: this.onSelectSlot.bind(this),
      events: [],
    };
  }

  async ngOnInit() {
    this.rooms = await this.bookingService.getRooms(); // ✅ ใช้ this.
    setTimeout(() => {
    this.cdr.detectChanges();
  });
    console.log('Available rooms:', this.rooms);
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
  }

  async selectRoom(roomId: number) {
    this.selectedRoomId = roomId;
    const bookings = await this.bookingService.getBookingsByRoom(roomId);
    console.log('Bookings for room', roomId, ':', bookings);
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.removeAllEvents();
    calendarApi.addEventSource(bookings);
  }

  async onSelectSlot(info: DateSelectArg) {
    this.selectedSlot = info;
    const day = info.start;

    if (day.getDay() === 0 || day.getDay() === 6) {
      alert('ไม่สามารถจองในวันหยุดสุดสัปดาห์ได้');
      return;
    }

    this.bookingData = {
      title: '',
      description: '',
      startTime: '09:00',
      endTime: '09:00', // เพิ่ม 1 ชั่วโมงเป็นค่าเริ่มต้น
      room: this.selectedRoomId ? this.selectedRoomId : null,
      datestring: this.formatDateOnly(new Date(info.start)),
      date: info.start,
    };

    console.log('Booking data:', this.bookingData);

    const modal = await new bootstrap.Modal(
      document.getElementById('bookingModal')
    );
    modal.show();
  }

  confirmBooking() {
    const start = new Date(
      `${this.bookingData.datestring}T${this.bookingData.startTime}`
    );
    const end = new Date(
      `${this.bookingData.datestring}T${this.bookingData.endTime}`
    );
    const payload = {
      data: {
        title: this.bookingData.title,
        description: this.bookingData.description,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        room: this.selectedRoomId ? this.selectedRoomId : null,
      },
    };

    console.log('Booking payload:', payload);

    this.http
      .post('http://localhost:1337/api/bookings', payload)
      .subscribe(() => {
        // ปิด modal และโหลด calendar ใหม่
        const modal = bootstrap.Modal.getInstance(
          document.getElementById('bookingModal')
        );
        modal.hide();

        this.selectRoom(this.selectedRoomId!); // ✅ ใช้ ! เพื่อบอกว่าไม่เป็น null
      });
  }

  formatDateTimeLocal(date: Date): string {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  }

  formatDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
