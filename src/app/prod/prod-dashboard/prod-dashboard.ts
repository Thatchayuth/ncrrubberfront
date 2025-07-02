import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-prod-dashboard',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './prod-dashboard.html',
  styleUrl: './prod-dashboard.scss'
})
export class ProdDashboard {
 productionData = [
    {
      productName: 'ยางปิดผิว B-201',
      startTime: '08:00',
      aiEstimatedEndTime: '08:45',
      actualEndTime: '08:55',
      delta: 10,
      status: 'เสร็จแล้ว'
    },
    {
      productName: 'ชิ้นงาน 3A',
      startTime: '09:00',
      aiEstimatedEndTime: '09:30',
      actualEndTime: null,
      delta: 0,
      status: 'กำลังผลิต'
    }
  ];
}
