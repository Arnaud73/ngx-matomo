import { Injectable, inject } from '@angular/core';

import { MATOMO_CONFIGURATION } from './matomo-configuration';

declare global {
  /**
   * Extend Window interface in order to introduce the Matomo _paq attribute
   */
  interface Window {
    _paq: any;
  }
}

/**
 * Service for injecting the Matomo tracker in the application.
 * This service shall no longer be used directly within an application.
 */
@Injectable()
export class MatomoInjector {
  /**
   * Matomo configuration provided by DI
   */
  private readonly configuration = inject(MATOMO_CONFIGURATION);

  /**
   * Creates an instance of MatomoInjector.
   */
  constructor() {
    try {
      window['_paq'] = window['_paq'] || (!!this.configuration.scriptUrl ? [] : { push: () => {} });
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * Configures and injects the Matomo tracker in the DOM.
   */
  init(): void {
    try {
      if (this.configuration?.requireConsent === true) {
        window['_paq'].push(['requireConsent']);
      } else if (this.configuration?.requireCookieConsent === true) {
        window['_paq'].push(['requireCookieConsent']);
      }
      if (this.configuration?.skipTrackingInitialPageView === false) {
        window['_paq'].push(['trackPageView']);
        if (
          this.configuration?.trackLinks === true &&
          this.configuration?.routeTracking?.enable === false
        ) {
          setTimeout(() => {
            window['_paq'].push([
              'enableLinkTracking',
              this.configuration?.trackLinkValue ?? false,
            ]);
          }, 0);
        }
      }
      if (this.configuration.trackers?.length) {
        const [mainTracker, ...otherTrackers] = this.configuration.trackers;
        window['_paq'].push(['setTrackerUrl', mainTracker.trackerUrl]);
        window['_paq'].push(['setSiteId', mainTracker.siteId.toString()]);
        otherTrackers.forEach((tracker) =>
          window['_paq'].push(['addTracker', tracker.trackerUrl, tracker.siteId.toString()])
        );
      }
      if (!!this.configuration.scriptUrl) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.src = this.configuration.scriptUrl;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode?.insertBefore(script, firstScript);
      }
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
