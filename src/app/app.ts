import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Headder } from './layout/headder/headder';
import { Footer } from './layout/footer/footer';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Headder, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollTopBtn') scrollTopBtn!: ElementRef<HTMLButtonElement>;
  protected title = 'TEST';
  intervalId: any;
  public currentDate: Date = new Date();

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // ❌ ไม่ใช่ browser — หยุดทำงานนี้
    }

    window.addEventListener('scroll', () => {
      const btn = this.scrollTopBtn.nativeElement;
      if (window.scrollY > 200) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    });

    this.scrollTopBtn.nativeElement.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
