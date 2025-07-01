import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Headder } from './layout/headder/headder';
import { Footer } from './layout/footer/footer';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Headder, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'TEST';
  intervalId: any;
  public currentDate: Date = new Date();

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
  
  }


}
