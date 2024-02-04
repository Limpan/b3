import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const ROUTES: Routes = [
    {path: '', pathMatch: 'full', loadComponent: () => import('./features/home/home.component').then(mod => mod.HomeComponent)},
    {path: 'sheets', loadComponent: () => import('./features/sheets/sheets.component').then(mod => mod.SheetsComponent)},
    {path: 'sheets/new', loadComponent: () => import('./features/sheets/new-sheet.component').then(mod => mod.NewSheetComponent)},
    {path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(mod => mod.DashboardComponent), canActivate: [AuthGuard]},
    {path: 'profile', loadComponent: () => import('./features/profile/profile.component').then(mod => mod.ProfileComponent), canActivate: [AuthGuard]},
    {path: 'callback', loadComponent: () => import('./features/callback/callback.component').then(mod => mod.CallbackComponent)},
    {path: '**', loadComponent: () => import('./features/page-not-found/page-not-found.component').then(mod => mod.PageNotFoundComponent)},
];
