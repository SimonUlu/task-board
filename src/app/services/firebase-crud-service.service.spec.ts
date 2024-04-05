import { TestBed } from '@angular/core/testing';

import { FirebaseCrudServiceService } from './firebase-crud-service.service';

describe('FirebaseCrudServiceService', () => {
  let service: FirebaseCrudServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCrudServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
