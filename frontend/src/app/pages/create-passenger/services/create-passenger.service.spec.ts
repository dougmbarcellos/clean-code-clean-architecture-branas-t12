import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreatePassengerService } from './create-passenger.service';

describe('CreatePassengerService', () => {
  let service: CreatePassengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CreatePassengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
