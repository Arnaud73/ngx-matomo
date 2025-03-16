import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { of } from 'rxjs';

import { withDummyTracker, withRouteTracking } from './matomo-features';
import { provideMatomoTracking } from './matomo-providers';
import { MatomoRouteTracker } from './matomo-route-tracker.service';

describe('MatomoRouteTrackerService', () => {
  let service: MatomoRouteTracker;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
        provideMatomoTracking(withDummyTracker(), withRouteTracking()),
      ],
    });
    service = TestBed.inject(MatomoRouteTracker);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
