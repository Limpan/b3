import { Routes } from '@angular/router';
import { SheetsComponent } from './sheets/sheets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FrontComponent } from './front/front.component';

export const routes: Routes = [
    {path: '', component: FrontComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'sheets', component: SheetsComponent},
    {path: '**', component: PageNotFoundComponent},
];
