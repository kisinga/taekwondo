import { TestBed } from '@angular/core/testing';

import { FighterService } from './fighter.service';

describe('FighterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FighterService = TestBed.get(FighterService);
    expect(service).toBeTruthy();
  });
});
