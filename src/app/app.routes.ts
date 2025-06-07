import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'paciente',
    loadComponent: () => import('./pages/paciente/paciente.page').then( m => m.PacientePage)
  },
  {
    path: 'consulta',
    loadComponent: () => import('./pages/consulta/consulta.page').then( m => m.ConsultaPage)
  },
];
