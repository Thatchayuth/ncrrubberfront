import { Routes } from '@angular/router';
import { Dashborad } from './page/dashborad/dashborad';

export const routes: Routes = [
 { path: '', component: Dashborad,  pathMatch: 'full' },
 { path: 'dashborad', component: Dashborad },
];
