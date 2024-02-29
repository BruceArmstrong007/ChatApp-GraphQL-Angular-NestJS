import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const chatGuard: CanActivateFn = () => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const isLoggedIn =
    cookieService.get('isLoggedIn') ?? localStorage.getItem('isLoggedIn');

  if (isLoggedIn === 'true') {
    return true;
  }
  router.navigateByUrl('/auth');
  return false;
};
