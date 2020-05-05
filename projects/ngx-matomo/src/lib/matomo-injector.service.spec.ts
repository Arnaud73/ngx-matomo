import { TestBed } from '@angular/core/testing';

import { MatomoInjector } from './matomo-injector.service';

describe('MatomoInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [MatomoInjector] }));

  it('should be created', () => {
    const service: MatomoInjector = TestBed.inject(MatomoInjector);
    expect(service).toBeTruthy();
  });
});
