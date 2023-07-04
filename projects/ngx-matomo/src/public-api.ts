declare global {
  /**
   * Extend Window interface in order to introduce the Matomo _paq attribute
   */
  interface Window {
    _paq: any;
  }
}

/*
 * Public API Surface of ngx-matomo
 */
export { MatomoConfiguration, MATOMO_CONFIGURATION } from './lib/matomo-configuration';
export * from './lib/matomo-injector.service';
export * from './lib/matomo-tracker.service';
export * from './lib/matomo-route-tracker.service';
export * from './lib/matomo.module';
