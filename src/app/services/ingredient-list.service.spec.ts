import { TestBed } from '@angular/core/testing';

import { IngredientListService } from './ingredient-list.service';

describe('IngredientListService', () => {
  let service: IngredientListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
