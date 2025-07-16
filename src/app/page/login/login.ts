import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginData = { username: '', password: '' };
  loginError = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onLogin() {
    const { username, password } = this.loginData;
    localStorage.setItem('token', 'test-token');
    const redirect = this.route.snapshot.queryParamMap.get('redirect');
    this.router.navigateByUrl(redirect || '/prod');

    // this.http.post('/api/auth/login', { username, password }).subscribe({
    //   next: (res: any) => {
    //     localStorage.setItem('token', res.token);

    //     // ✅ อ่าน query param ชื่อ redirect
    //     const redirect = this.route.snapshot.queryParamMap.get('redirect');
    //     this.router.navigateByUrl(redirect || '/prod');
    //   },
    //   error: () => {
    //     this.loginError = true;
    //   },
    // });
  }
}
