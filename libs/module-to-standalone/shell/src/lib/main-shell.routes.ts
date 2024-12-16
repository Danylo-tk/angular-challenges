import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/home').then(
        (m) => m.HomeComponent,
      ),
  },
  {
    path: 'admin',
    canActivate: [IsAuthorizedGuard],
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/admin/feature').then(
        (m) => m.AdminFeatureModule,
      ),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/user/shell').then(
        (m) => m.UserShellModule,
      ),
  },

  {
    path: 'forbidden',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/forbidden').then(
        (m) => m.ForbiddenModule,
      ),
  },
];
