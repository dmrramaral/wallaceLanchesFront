import { TestBed } from '@angular/core/testing';

import { SanduicheService } from './sanduiche.service';

describe('SanduicheService', () => {
  let service: SanduicheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanduicheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
