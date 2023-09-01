import { TestBed } from '@angular/core/testing';

import { HttpClientService } from './http-client.service';
import { provideHttpClientAdapterTesting } from './testing/http-adapter-provider-testing';

describe('HttpClientService', () => {
  let service: HttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientAdapterTesting()],
    });
    service = TestBed.inject(HttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
