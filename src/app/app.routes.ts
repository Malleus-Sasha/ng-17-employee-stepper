import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'employee', loadComponent: () => import('./module/employee/employee.component').then((m) => m.EmployeeComponent) },
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./pages/not-found-page/not-found-page.component').then(mod => mod.NotFoundPageComponent)},
];
