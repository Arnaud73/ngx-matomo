import { Inject, Injectable } from '@angular/core';

import { MatomoModuleConfiguration, MATOMO_CONFIGURATION } from './matomo-configuration';

/**
 * Access to the global window variable.
 */
declare const window: {
  [key: string]: any;
  prototype: Window;
  new (): Window;
};

/**
 * Service for injecting the Matomo tracker in the application.
 * This service shall no longer be used directly within an application.
 */
@Injectable()
export class MatomoInjector {
  /**
   * Creates an instance of MatomoInjector.
   *
   * @param configuration Matomo configuration provided by DI.
   */
  constructor(
    @Inject(MATOMO_CONFIGURATION) private readonly configuration: MatomoModuleConfiguration
  ) {
    try {
      window._paq = window._paq || [];
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * Injects the Matomo tracker in the DOM.
   */
  init(): void {
    try {
      if (this.configuration?.requireConsent === true) {
        window._paq.push(['requireConsent']);
      } else if (this.configuration?.requireCookieConsent === true) {
        window._paq.push(['requireCookieConsent']);
      }
      if (this.configuration?.trackAppStart === true) {
        window._paq.push(['trackPageView']);
        if (
          this.configuration?.trackLinks === true &&
          this.configuration?.routeTracking?.enable === false
        ) {
          setTimeout(() => {
            window._paq.push([
              'enableLinkTracking',
              this.configuration?.trackLinkValue ?? false,
            ]);
          }, 0);
        }
      }
      if (this.configuration.trackers.length) {
        const [mainTracker, ...otherTrackers] = this.configuration.trackers;
        window._paq.push(['setTrackerUrl', mainTracker.trackerUrl]);
        window._paq.push(['setSiteId', mainTracker.siteId.toString()]);
        otherTrackers.forEach((tracker) =>
          window._paq.push(['addTracker', tracker.trackerUrl, tracker.siteId.toString()])
        );
      } else {
        // TODO Throw an error if no tracker has been configured
      }
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = this.configuration.scriptUrl;
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
