import { TestBed } from '@angular/core/testing';

import { SteplistService } from './steplist.service';

describe('SteplistService', () => {
  let service: SteplistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteplistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
