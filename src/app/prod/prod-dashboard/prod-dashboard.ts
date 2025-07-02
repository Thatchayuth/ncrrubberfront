import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-prod-dashboard',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './prod-dashboard.html',
  styleUrl: './prod-dashboard.scss'
})
export class ProdDashboard implements OnInit, OnDestroy {
 machines = [
    {
      name: 'เครื่อง A1',
      department: 'แผนกรีดยาง',
      product: 'ยางปิดผิว 3R',
      quantity: 120,
      startTime: '08:00',
      estimatedEndTime: '09:00',
      actualEndTime: '09:10',
      status : "active",
      duration:''
    },
    {
      name: 'เครื่อง B2',
      department: 'แผนกอัดยาง',
      product: 'ยางลาย 2A',
      quantity: 80,
      startTime: '09:15',
      estimatedEndTime: '10:00',
      actualEndTime: null,
      status : "active",
      duration:''
    },
    {
      name: 'เครื่อง C3',
      department: 'แผนกพิมพ์ลาย',
      product: 'ยางปั๊มลาย 5D',
      quantity: 60,
      startTime: '08:30',
      estimatedEndTime: '09:30',
      actualEndTime: '09:25',
      status : "active",
      duration:''
    }
  ];

  intervalId: any;
  currentDate: Date = new Date();
    constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.updateDurations(); // เรียกครั้งแรกก่อน interval
    this.intervalId = setInterval(() => {
      this.updateDurations();
      this.currentDate = new Date();
       this.cdr.detectChanges(); 
    }, 1000); // ทุก 1 วินาที
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

updateDurations(): void {
  const now = new Date();

  this.machines.forEach(machine => {
    if (machine.status === 'active') {
      const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
      const startTimeStr = `${today}T${machine.estimatedEndTime}:00`;
      const start = new Date(startTimeStr);

      const diffMs = now.getTime() - start.getTime();

      if (diffMs < 0) {
        machine.duration = '00:00:00';
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      machine.duration = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }
  });
}


  padZero(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
