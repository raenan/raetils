import { TestBed } from '@angular/core/testing';

import { CoogieService } from './coogie.service';

describe('CoogieService', () => {
  let service: CoogieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoogieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
