import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MATOMO_CONFIGURATION } from './matomo-configuration';
import { MatomoTracker } from './matomo-tracker.service';
import { MatomoRouteTracker } from './matomo-route-tracker.service';

describe('MatomoRouteTrackerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
        {
          provide: MATOMO_CONFIGURATION,
          useValue: {
            trackers: [],
            trackAppStarting: true,
            requireConsent: false,
            enableLinkTracking: true,
            enableLinkTrackingValue: false,
            routeTracking: {
              enable: false,
            },
          },
        },
        MatomoTracker,
        MatomoRouteTracker,
      ],
    })
  );

  it('should be created', () => {
    const service: MatomoRouteTracker = TestBed.inject(MatomoRouteTracker);
    expect(service).toBeTruthy();
  });
});
