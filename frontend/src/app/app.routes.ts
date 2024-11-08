import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'create-passenger',
    loadComponent: () =>
      import('./pages/create-passenger/create-passenger.component').then(
        (m) => m.CreatePassengerComponent
      ),
  },
  {
    path: 'create-driver',
    loadComponent: () =>
      import('./pages/create-driver/create-driver.component').then((m) => m.CreateDriverComponent),
  },
  {
    path: 'calculate-ride',
    loadComponent: () =>
      import('./pages/calculate-ride/calculate-ride.component').then(
        (m) => m.CalculateRideComponent
      ),
  },
  {
    path: 'request-ride',
    loadComponent: () =>
      import('./pages/request-ride/request-ride.component').then((m) => m.RequestRideComponent),
  },
];
