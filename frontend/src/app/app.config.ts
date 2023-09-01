import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { apiInterceptor } from './infra/http/api.interceptor';
import { provideHttpClientAdapter } from './infra/http/http-adapter-provider';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClientAdapter(withInterceptors([apiInterceptor]))],
};
