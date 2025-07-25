import { CanActivateFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  console.log('Auth Guard:', state.url);
  // if (!isPlatformBrowser(platformId)) {
  //   console.warn('Auth Guard: Not running in browser, skipping guard');
  //   return false;
  // }

  const token = localStorage.getItem('token');
  console.log('Auth Guard: Token found:', !!token);

  if (token) {
    return true;
  } else {
    return router
      .navigate(['/login'], { queryParams: { redirect: state.url } })
      .then(() => false);
  }
};
