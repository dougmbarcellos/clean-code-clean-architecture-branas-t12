import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { HttpClientService } from './infra/http/http-client.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // { provide: HttpClientService, useClass: FetchAdapterService },
    { provide: HttpClientService, useClass: HttpClient },
  ],
};
