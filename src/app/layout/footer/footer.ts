import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,                  // ✅ เพิ่มนี้
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']      // ✅ ต้องเป็น styleUrls และใส่ array
})
export class Footer implements OnInit, OnDestroy {
  intervalId: any;
  public currentDate: Date = new Date();
  email = 'info@ncrrubber.com';

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentDate = new Date();
      this.cdr.detectChanges();  // ✅ จะไม่ error แล้ว
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
