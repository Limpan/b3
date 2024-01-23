import { Routes } from '@angular/router';
import { SheetsComponent } from './sheets/sheets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'sheets', component: SheetsComponent},
    {path: '**', component: PageNotFoundComponent},
];
