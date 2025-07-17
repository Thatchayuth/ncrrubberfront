import { Component, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-headder',
  imports: [RouterModule],
  templateUrl: './headder.html',
  styleUrl: './headder.scss',
})
export class Headder {
  // logoUrl = 'public/images/NCR-11.png';
  private toastr = inject(ToastrService);
  isScrolled  = false;
  constructor() {}
  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 30;
  }

  showToast() {
    this.toastr.success('โหลดข้อมูลเรียบร้อย', 'สำเร็จ');
  }

  logout() {}
}
