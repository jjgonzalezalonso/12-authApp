import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';

export const validarTokenGuard: CanMatchFn = (route, segments) => {
  return true;
};

export const canMatch: CanMatchFn = 
  ( route: Route,   segments: UrlSegment[] ) => {
    console.log('CanMatch');
    console.log({ route, segments });
    return true;
};

export const canActivate: CanActivateFn = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    console.log('CanActivate');
    console.log({ route, state });
    return true;
};
