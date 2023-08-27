import { TestBed } from '@angular/core/testing';

import { FetchAdapterService } from './fetch-adapter.service';

describe('FetchAdapterService', () => {
  let service: FetchAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
