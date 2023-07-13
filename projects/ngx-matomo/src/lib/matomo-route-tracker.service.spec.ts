import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { MATOMO_CONFIGURATION } from './matomo-configuration';
import { MatomoRouteTracker } from './matomo-route-tracker.service';
import { MatomoTracker } from './matomo-tracker.service';

describe('MatomoRouteTrackerService', () => {
  let service: MatomoRouteTracker;

  beforeEach(() => {
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
    });
    service = TestBed.inject(MatomoRouteTracker);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
