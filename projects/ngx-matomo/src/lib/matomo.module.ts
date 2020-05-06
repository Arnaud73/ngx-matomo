import { NgModule, ModuleWithProviders, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {
  MATOMO_CONFIGURATION,
  MatomoModuleConfiguration,
  defaultConfiguration,
} from './matomo-configuration';
import { MatomoInjector } from './matomo-injector.service';
import { MatomoTracker } from './matomo-tracker.service';

/**
 * Angular module encapsulating Matomo features.
 */
@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [MatomoInjector, MatomoTracker],
})
export class MatomoModule {
  /**
   * Creates an instance of Matomo module.
   *
   * @param platformId Angular platform provided by DI.
   * @param matomoInjector Instance of MatomoInjector provided by DI.
   */
  constructor(@Inject(PLATFORM_ID) private platformId, private matomoInjector: MatomoInjector) {
    // Warn if module is not being loaded by a browser.
    if (!isPlatformBrowser(this.platformId)) {
      console.warn(`ngx-Matomo does not support server platform`);
    }
    // Inject the Matomo script and create trackers.
    this.matomoInjector.init();
  }

  /**
   * Use this method in your root module to provide the MatomoTracker service.
   */
  static forRoot(configuration?: Partial<MatomoModuleConfiguration>): ModuleWithProviders {
    return {
      ngModule: MatomoModule,
      providers: [
        {
          provide: MATOMO_CONFIGURATION,
          useValue: !!configuration
            ? { ...defaultConfiguration, ...configuration }
            : defaultConfiguration,
        },
        MatomoTracker,
      ],
    };
  }
}
