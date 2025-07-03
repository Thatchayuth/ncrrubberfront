import { Routes } from '@angular/router';
import { PageDetail } from './page-detail';
import { HistoryNews } from './history-news/history-news';

export const routes: Routes = [
  {
    path: '',
    component: PageDetail,
    children: [
      { path: '', redirectTo: 'detail', pathMatch: 'full' },
      { path: 'historynew', component: HistoryNews },
    ],
  },
];
