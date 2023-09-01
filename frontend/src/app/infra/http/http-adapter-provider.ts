import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { apiInterceptor } from './api.interceptor';
import { HttpClientService } from './http-client.service';

export function provideHttpClientAdapter(): (Provider | EnvironmentProviders)[] {
  // { provide: HttpClientService, useClass: FetchAdapterService },
  return [
    provideHttpClient(withInterceptors([apiInterceptor])),
    {
      provide: HttpClientService,
      useClass: HttpClient,
    },
  ];
}
