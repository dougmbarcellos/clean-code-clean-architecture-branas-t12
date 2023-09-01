import { TestBed } from '@angular/core/testing';

import { provideHttpClientAdapterTesting } from '../http/testing/http-adapter-provider-testing';
import { RideService } from './ride.service';

describe('RideService', () => {
  let service: RideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientAdapterTesting()],
    });
    service = TestBed.inject(RideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
