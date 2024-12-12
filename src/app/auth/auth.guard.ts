import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  const allowedRoles = route.data?.['roles'] || [];
  const userRole = authService.getUserRole();

  if (allowedRoles.includes(userRole)) {
    return true;
  } else {
    router.navigate(['/acces-denied']);
    return false;
  }
/*
  if (authService.isLoggedIn) {
    return true;
  }
  // Redirect to the login page
  return router.parseUrl('/login');*/
};
