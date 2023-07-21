import { state } from '@angular/animations';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs';

export const pruebaGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validarToken()
  .pipe (
    tap (valid => {
      if (!valid){
       router.navigateByUrl('/auth');
      }
    })
  );
};
