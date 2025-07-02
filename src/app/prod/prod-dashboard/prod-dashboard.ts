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
 machines = [
    {
      name: 'เครื่อง A1',
      department: 'แผนกรีดยาง',
      product: 'ยางปิดผิว 3R',
      quantity: 120,
      startTime: '08:00',
      estimatedEndTime: '09:00',
      actualEndTime: '09:10',
      status : "active"
    },
    {
      name: 'เครื่อง B2',
      department: 'แผนกอัดยาง',
      product: 'ยางลาย 2A',
      quantity: 80,
      startTime: '09:15',
      estimatedEndTime: '10:00',
      actualEndTime: null
    },
    {
      name: 'เครื่อง C3',
      department: 'แผนกพิมพ์ลาย',
      product: 'ยางปั๊มลาย 5D',
      quantity: 60,
      startTime: '08:30',
      estimatedEndTime: '09:30',
      actualEndTime: '09:25'
    }
  ];
}
