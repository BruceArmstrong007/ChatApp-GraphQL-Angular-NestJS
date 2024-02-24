import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const chatGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    return true;
  }
  router.navigateByUrl('/auth');
  return false;
};
