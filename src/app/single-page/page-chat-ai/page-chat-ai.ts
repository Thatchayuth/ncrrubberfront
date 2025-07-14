import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { registerChartJS } from '../../utils/chart-register';

declare var bootstrap: any;
// ลงทะเบียน controller, elements, scales ที่จะใช้
@Component({
  selector: 'app-page-chat-ai',
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './page-chat-ai.html',
  styleUrl: './page-chat-ai.scss',
})
export class PageChatAI {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  selectedChartData: any = null;
  selectedChartType: any = null;
  selectedChartOptions: any = null;
  userInput = '';
  messages: any[] = [];
  isThinking = false;
  
  constructor() {
    registerChartJS();
  }

  chartData = {
    labels: ['เม.ย.', 'พ.ค.', 'มิ.ย.'],
    datasets: [
      {
        label: 'ยอดขาย',
        data: [400000, 420000, 530000],
        backgroundColor: 'rgba(13, 110, 253, 0.7)',
      },
    ],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  chartType: 'bar' = 'bar';

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ role: 'user', content: this.userInput.trim() });
    this.isThinking = true;
    this.messages.push({ role: 'assistant', content: '...' });
    this.userInput = '';

    this.scrollToBottom();

    setTimeout(() => {
      this.messages.pop();
      this.messages.push({
        role: 'assistant',
        content: 'นี่คือตัวอย่างยอดขายไตรมาสล่าสุด',
        chartData: this.chartData,
        chartOptions: this.chartOptions,
        chartType: this.chartType,
      });
      this.isThinking = false;
      this.scrollToBottom();
    }, 800);
  }

  scrollToBottom() {
    setTimeout(() => {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    }, 100);
  }


  openChartModal(msg: any) {
  console.log('เปิด modal แสดงกราฟ', msg);
  this.selectedChartData = msg.chartData;
  this.selectedChartType = msg.chartType;
  this.selectedChartOptions = {
    ...msg.chartOptions,
    responsive: true,
    maintainAspectRatio: false,
  };

  // เปิด modal
  const modal = new bootstrap.Modal(document.getElementById('chartModal'));
  modal.show();
}
}
