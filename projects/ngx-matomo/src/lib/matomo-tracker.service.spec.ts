import { TestBed } from '@angular/core/testing';

import { MatomoTracker } from './matomo-tracker.service';

describe('MatomoTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [MatomoTracker] }));

  it('should be created', () => {
    const service: MatomoTracker = TestBed.inject(MatomoTracker);
    expect(service).toBeTruthy();
  });
});
