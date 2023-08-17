import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateDriverService } from './create-driver.service';

describe('CreateDriverService', () => {
  let service: CreateDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CreateDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
