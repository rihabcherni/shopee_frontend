import { TestBed } from '@angular/core/testing';

import { VisitorHeaderService } from './visitor-header.service';

describe('VisitorHeaderService', () => {
  let service: VisitorHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
