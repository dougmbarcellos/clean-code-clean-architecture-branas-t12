import { TestBed } from '@angular/core/testing';

import { provideHttpClientAdapterTesting } from '../http/testing/http-adapter-provider-testing';
import { PassengerService } from './passenger.service';

describe('PassengerService', () => {
  let service: PassengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientAdapterTesting()],
    });
    service = TestBed.inject(PassengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
