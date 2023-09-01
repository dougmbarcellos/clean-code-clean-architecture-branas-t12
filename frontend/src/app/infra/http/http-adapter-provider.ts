import { HttpClient, HttpFeature, HttpFeatureKind, provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { HttpClientService } from './http-client.service';

export function provideHttpClientAdapter(
  ...features: HttpFeature<HttpFeatureKind>[]
): (Provider | EnvironmentProviders)[] {
  // { provide: HttpClientService, useClass: FetchAdapterService },
  return [
    provideHttpClient(...features),
    {
      provide: HttpClientService,
      useClass: HttpClient,
    },
  ];
}
