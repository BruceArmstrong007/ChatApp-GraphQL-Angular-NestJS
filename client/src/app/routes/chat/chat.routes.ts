import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./routes/profile/profile.component'),
  },
  {
    path: 'add-friends',
    loadComponent: () => import('./routes/add-friends/add-friends.component'),
  },
];
export default routes;
