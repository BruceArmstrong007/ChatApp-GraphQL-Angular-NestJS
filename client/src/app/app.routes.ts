import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./routes/auth/auth.component'),
    loadChildren: () => import('./routes/auth/auth.routes')
  },
  {
    path: '',
    loadComponent: () => import('./routes/chat/chat.component'),
    loadChildren: () => import('./routes/chat/chat.routes')
  },
  {
    path: 'landing-page',
    loadComponent: () => import('./routes/landing-page/landing-page.component'),
  }
];
