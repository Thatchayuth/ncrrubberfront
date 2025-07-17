import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BookingCalendar } from './booking-calendar';
import { Articles } from '../../../services/article';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { of } from 'rxjs';

describe('BookingCalendar', () => {
  let component: BookingCalendar;
  let fixture: ComponentFixture<BookingCalendar>;
  let articleServiceSpy: jasmine.SpyObj<Articles>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    const articleSpy = jasmine.createSpyObj('Articles', ['getRooms', 'getBookingsByRoom']);

    await TestBed.configureTestingModule({
      imports: [FullCalendarModule, HttpClientTestingModule],
      declarations: [BookingCalendar],
      providers: [
        { provide: Articles, useValue: articleSpy },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingCalendar);
    component = fixture.componentInstance;
    articleServiceSpy = TestBed.inject(Articles) as jasmine.SpyObj<Articles>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('ควรสร้าง component ได้', () => {
    expect(component).toBeTruthy();
  });

  it('ควรโหลด rooms ได้สำเร็จใน ngOnInit', fakeAsync(() => {
    const mockRooms = [{ id: 1, name: 'ห้องประชุม A' }];
    articleServiceSpy.getRooms.and.returnValue(Promise.resolve(mockRooms));

    component.ngOnInit();
    tick(); // wait async
    expect(component.rooms).toEqual(mockRooms);
  }));

  it('ควรโหลด bookings เมื่อ selectRoom ถูกเรียก', fakeAsync(() => {
    const mockBookings = [
      { title: 'ประชุมทีม', start: '2025-07-17T09:00', end: '2025-07-17T10:00' },
    ];
    articleServiceSpy.getBookingsByRoom.and.returnValue(Promise.resolve(mockBookings));
    component.calendarComponent = {
      getApi: () => ({
        removeAllEvents: jasmine.createSpy('removeAllEvents'),
        addEventSource: jasmine.createSpy('addEventSource'),
      }),
    } as any;

    component.selectRoom(1);
    tick();
    expect(articleServiceSpy.getBookingsByRoom).toHaveBeenCalledWith(1);
    expect(component.selectedRoomId).toBe(1);
  }));

  it('ควรส่ง booking ไปที่ API เมื่อ confirmBooking', fakeAsync(() => {
    component.bookingData = {
      title: 'Test Meeting',
      description: 'รายละเอียด',
      startTime: '09:00',
      endTime: '10:00',
      room: 1,
      date: new Date('2025-07-17'),
      datestring: '2025-07-17',
    };
    component.selectedRoomId = 1;

    component.confirmBooking();

    const req = httpMock.expectOne('http://localhost:1337/api/bookings');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.data.title).toBe('Test Meeting');
    req.flush({}); // mock response

    httpMock.verify();
  }));
});
