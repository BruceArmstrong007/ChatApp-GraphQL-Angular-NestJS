import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./routes/profile/profile.component'),
  },
];
export default routes;
