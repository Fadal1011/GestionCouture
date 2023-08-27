import { TestBed } from '@angular/core/testing';

import { ApiAbstractService } from './api-abstract.service';

describe('ApiAbstractService', () => {
  let service: ApiAbstractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAbstractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
