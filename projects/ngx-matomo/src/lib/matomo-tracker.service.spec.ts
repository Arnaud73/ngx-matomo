import { TestBed } from '@angular/core/testing';

import { MATOMO_CONFIGURATION } from './matomo-configuration';
import { MatomoTracker } from './matomo-tracker.service';

describe('MatomoTrackerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MATOMO_CONFIGURATION,
          useValue: {
            trackers: [],
            trackAppStarting: true,
            requireConsent: false,
            enableLinkTracking: true,
            enableLinkTrackingValue: false,
            enableRouteTracking: false,
          },
        },
        MatomoTracker,
      ],
    })
  );

  it('should be created', () => {
    const service: MatomoTracker = TestBed.inject(MatomoTracker);
    expect(service).toBeTruthy();
  });
});
