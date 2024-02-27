import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { chatGuard } from './shared/guards/chat.guard';
import { profileGuard } from './shared/guards/profile.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [authGuard],
    loadComponent: () => import('./routes/auth/auth.component'),
    loadChildren: () => import('./routes/auth/auth.routes'),
  },
  {
    path: '',
    canActivate: [chatGuard, profileGuard],
    loadComponent: () => import('./routes/chat/chat.component'),
    loadChildren: () => import('./routes/chat/chat.routes'),
  },
  {
    path: 'landing-page',
    loadComponent: () => import('./routes/landing-page/landing-page.component'),
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
