import { Routes } from '@angular/router';
import { Dashborad } from './page/dashborad/dashborad';
import { ProdDashboard } from './prod/prod-dashboard/prod-dashboard';
import { PageChatAI } from './single-page/page-chat-ai/page-chat-ai';

export const routes: Routes = [
 { path: '', component: Dashborad,  pathMatch: 'full' },
 { path: 'dashborad', component: Dashborad },
 { path: 'prod', component : ProdDashboard },
 { path: 'pagedetail',
    loadChildren: () =>
      import('./page/page-detail/page-detail.routes').then(m => m.routes) },
    {path: 'chat-page', component : PageChatAI}
];
