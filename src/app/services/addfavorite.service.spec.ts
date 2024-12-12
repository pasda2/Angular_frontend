import { TestBed } from '@angular/core/testing';

import { AddfavoriteService } from './addfavorite.service';

describe('AddfavoriteService', () => {
  let service: AddfavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddfavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
