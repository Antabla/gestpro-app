import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function authGuard(): CanActivateFn {
  return () => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);

    if (authService.isAuthenticated()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };
}
