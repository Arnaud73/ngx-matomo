import { TestBed } from '@angular/core/testing';

import { MatomoInjector } from './matomo-injector.service';
import { MATOMO_CONFIGURATION } from './matomo-configuration';

describe('MatomoInjectorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MATOMO_CONFIGURATION,
          useValue: {
            trackAppStarting: true,
            isConsentRequired: false,
            enableLinkTracking: true,
            enableLinkTrackingValue: false,
            trackers: [],
          },
        },
        MatomoInjector,
      ],
    })
  );

  it('should be created', () => {
    const service: MatomoInjector = TestBed.inject(MatomoInjector);
    expect(service).toBeTruthy();
  });
});
