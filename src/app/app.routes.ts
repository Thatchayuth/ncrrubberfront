import { Routes } from '@angular/router';
import { Dashborad } from './page/dashborad/dashborad';
import { ProdDashboard } from './prod/prod-dashboard/prod-dashboard';
import { PageChatAI } from './single-page/page-chat-ai/page-chat-ai';
import { BookingCalendar } from './single-page/booking-calendar/booking-calendar';
import { Login } from './page/login/login';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Dashborad, pathMatch: 'full' },
  { path: 'dashborad', component: Dashborad },
  { path: 'prod', component: ProdDashboard, canActivate: [authGuard] },
  {
    path: 'pagedetail',
    loadChildren: () =>
      import('./page/page-detail/page-detail.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  { path: 'chat-page', component: PageChatAI, canActivate: [authGuard] },
  {
    path: 'booking-calendar',
    component: BookingCalendar,
    canActivate: [authGuard],
  },
];
