import { isPlatformBrowser } from '@angular/common';
import { Injector, ModuleWithProviders, NgModule, PLATFORM_ID, inject } from '@angular/core';

import { MATOMO_CONFIGURATION, MatomoConfiguration } from './matomo-configuration';
import { MatomoInjector } from './matomo-injector.service';
import { MatomoRouteTracker } from './matomo-route-tracker.service';
import { MatomoTracker } from './matomo-tracker.service';
import { MatomoTrackClickDirective } from './matomo-track-click.directive';

/**
 * Angular module encapsulating Matomo features.
 */
@NgModule({
  declarations: [MatomoTrackClickDirective],
  imports: [],
  exports: [MatomoTrackClickDirective],
  providers: [MatomoInjector, MatomoTracker, MatomoRouteTracker],
})
export class MatomoModule {
  /**
   * platformId provided by DI
   */
  private readonly platformId = inject(PLATFORM_ID);
  /**
   * Injector provided by DI
   */
  private readonly injector = inject(Injector);
  /**
   * Matomo configuration provided by DI
   */
  private readonly configuration = inject(MATOMO_CONFIGURATION);
  /**
   * MatomoInjector provided by DI
   */
  private readonly matomoInjector = inject(MatomoInjector);

  /**
   * Creates an instance of Matomo module.
   */
  constructor() {
    // Warn if module is not being loaded by a browser.
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('ngx-Matomo does not support server platform');
    }
    // Inject the Matomo script and create trackers.
    this.matomoInjector.init();
    // Enable route tracking if requested.
    if (this.configuration?.routeTracking?.enable === true) {
      // Using Injector instead of DI in order to allow use in routerless apps.
      this.injector.get(MatomoRouteTracker).startTracking();
    }
  }

  /**
   * Use this method in your root module to provide the MatomoTracker service.
   */
  static forRoot(configuration?: Partial<MatomoConfiguration>): ModuleWithProviders<MatomoModule> {
    return {
      ngModule: MatomoModule,
      providers: [
        {
          provide: MATOMO_CONFIGURATION,
          useValue: configuration,
        },
        MatomoTracker,
        MatomoRouteTracker,
      ],
    };
  }
}
