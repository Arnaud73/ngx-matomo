import { TestBed } from '@angular/core/testing';

import { MATOMO_CONFIGURATION } from './matomo-configuration';
import { MatomoTracker } from './matomo-tracker.service';

describe('MatomoTrackerService', () => {
  let service: MatomoTracker;

  beforeEach(() => {
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
    });
    service = TestBed.inject(MatomoTracker);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
