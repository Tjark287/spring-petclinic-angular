import { TestBed } from '@angular/core/testing';

import { OwnerFilterServiceService } from './owner-filter-service.service';

describe('OwnerFilterServiceService', () => {
  let service: OwnerFilterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerFilterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
