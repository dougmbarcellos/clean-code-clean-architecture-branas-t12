import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EnvironmentProviders, Provider } from '@angular/core';
import { HttpClientService } from '../http-client.service';

// Provider com HttpClientTesting e sem interceptor.
export function provideHttpClientAdapterTesting(): (Provider | EnvironmentProviders)[] {
  // { provide: HttpClientService, useClass: FetchAdapterService },
  return [
    provideHttpClient(withInterceptors([])),
    {
      provide: HttpClientService,
      useClass: HttpClient,
    },
    provideHttpClientTesting(),
  ];
}
