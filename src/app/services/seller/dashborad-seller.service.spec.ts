import { TestBed } from '@angular/core/testing';

import { DashboradSellerService } from './dashborad-seller.service';

describe('DashboradSellerService', () => {
  let service: DashboradSellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboradSellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
