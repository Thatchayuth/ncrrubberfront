import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { registerChartJS } from '../../utils/chart-register';
import { ChatServices } from '../../../services/chat';
import { ChangeDetectorRef } from '@angular/core';
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

  constructor(private chatService: ChatServices, private cdr: ChangeDetectorRef) {
    registerChartJS();
  }

  // chartData = {
  //   labels: ['เม.ย.', 'พ.ค.', 'มิ.ย.'],
  //   datasets: [
  //     {
  //       label: 'ยอดขาย',
  //       data: [400000, 420000, 530000],
  //       backgroundColor: 'rgba(13, 110, 253, 0.7)',
  //     },
  //   ],
  // };

  // chartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  // };

  // chartType: 'bar' = 'bar';

  sendMessage() {
    let result: any | null = null;
    if (!this.userInput.trim()) return;

    this.messages.push({ role: 'user', content: this.userInput.trim() });
    this.isThinking = true;
    this.messages.push({ role: 'assistant', content: '...' });
    this.userInput = '';

    this.scrollToBottom();

    this.chatService
      .generate(this.messages[this.messages.length - 2].content)
      .subscribe(
        async (res: any) => {
          // ลบข้อความ '...' ออก
          await this.messages.pop();

          let result: any;
          try {
            result = JSON.parse(res.response); // ตรวจว่าแปลง JSON ได้ไหม
            console.log('Parsed JSON:', result);
          } catch (e) {
            console.warn('ไม่สามารถแปลง JSON ได้:', res.response);
            // ถ้าแปลงไม่ได้ แสดงข้อความธรรมดา
            this.messages.push({
              role: 'assistant',
              content: res.response,
            });
            this.isThinking = false;
            await this.scrollToBottom();
            return;
          }

          // ถ้า JSON สำเร็จ → แสดง chart หรือข้อความจาก result
          if (result.type === 'chart') {
            this.messages.push({
              role: 'assistant',
              content: result.message,
              chartData: result.chartData,
              chartOptions: result.chartOptions,
              chartType: result.chartType,
            });
          } else {
            this.messages.push({
              role: 'assistant',
              content: result.message || JSON.stringify(result), // fallback
            });
          }

          this.isThinking = false;
          await this.scrollToBottom();
        },
        (err) => {
          this.messages.pop();
          this.messages.push({
            role: 'assistant',
            content: 'เกิดข้อผิดพลาดในการติดต่อ API',
          });
          this.isThinking = false;
          this.scrollToBottom();
        }
      );
  }

  scrollToBottom() {
    console.log('scroll', this.messages)
    setTimeout(() => {
      this.cdr.detectChanges();
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    }, 1000);
  }

  openChartModal(msg: any) {
    this.selectedChartData = msg.chartData;
    this.selectedChartType = msg.chartType;
    this.selectedChartOptions = {
      ...msg.chartOptions,
      responsive: true,
      maintainAspectRatio: false,
    };

    const modal = new bootstrap.Modal(document.getElementById('chartModal')!);
    modal.show();
  }
}
