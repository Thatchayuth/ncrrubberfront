import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { registerChartJS } from '../../utils/chart-register';
import { ChatServices } from '../../../services/chat';
import { ChangeDetectorRef } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
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
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;
  selectedChartData: any = null;
  selectedChartType: any = null;
  selectedChartOptions: any = null;
  userInput = '';
  messages: any[] = [];
  isThinking = false;

  attachedFileName: string | null = null;
  excelData: any = null;
  isLoadingExcel: boolean = false;

  constructor(
    private chatService: ChatServices,
    private cdr: ChangeDetectorRef
  ) {
    registerChartJS();
  }
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
    console.log('scroll', this.messages);
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

  exportChartAsPNG() {
    const canvas = this.chartCanvas.nativeElement as HTMLCanvasElement;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'chart.png';
    link.click();
  }

  // 2. Export PDF
  exportChartAsPDF() {
    html2canvas(this.chartCanvas.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = canvas.height * (width / canvas.width);
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('chart.pdf');
    });
  }

  // 3. Export Excel
  exportChartAsExcel() {
    const labels = this.selectedChartData.labels;
    const dataset = this.selectedChartData.datasets[0];

    const data = labels.map((label: any, i: number) => ({
      ชื่อ: label,
      ค่า: dataset.data[i],
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
      Sheets: { ChartData: worksheet },
      SheetNames: ['ChartData'],
    };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'chart-data.xlsx');
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.attachedFileName = file.name;
    this.isLoadingExcel = true;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      this.excelData = jsonData;
      this.isLoadingExcel = false;
      console.log('Excel data:', jsonData);
    };
    reader.readAsArrayBuffer(file);
  }

getExcelKeys(data: any[]): string[] {
  return data.length > 0 ? Object.keys(data[0]) : [];
}
}
