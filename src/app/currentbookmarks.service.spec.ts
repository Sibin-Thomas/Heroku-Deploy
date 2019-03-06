import { TestBed } from '@angular/core/testing';

import { CurrentbookmarksService } from './currentbookmarks.service';

describe('CurrentbookmarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentbookmarksService = TestBed.get(CurrentbookmarksService);
    expect(service).toBeTruthy();
  });
});
