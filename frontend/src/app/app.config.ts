import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClientAdapter } from './infra/http/http-adapter-provider';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClientAdapter()],
};
