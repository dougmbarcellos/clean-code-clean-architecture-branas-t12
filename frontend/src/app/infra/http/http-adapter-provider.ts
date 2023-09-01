import { HttpClient, provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { HttpClientService } from './http-client.service';

export function provideHttpClientAdapter(): (Provider | EnvironmentProviders)[] {
  // { provide: HttpClientService, useClass: FetchAdapterService },
  return [
    provideHttpClient(),
    {
      provide: HttpClientService,
      useClass: HttpClient,
    },
  ];
}
