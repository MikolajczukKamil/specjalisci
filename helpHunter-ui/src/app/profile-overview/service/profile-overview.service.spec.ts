import { TestBed } from '@angular/core/testing';

import { ProfileOverviewService } from './profile-overview.service';

describe('ProfileOverviewService', () => {
  let service: ProfileOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
