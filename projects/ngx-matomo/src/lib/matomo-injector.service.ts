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
  init() {
    try {
      if (this.configuration?.isConsentRequired === true) {
        window._paq.push(['requireConsent']);
      }
      if (this.configuration?.trackAppStarting === true) {
        window._paq.push(['trackPageView']);
        if (
          this.configuration?.enableLinkTracking === true
        ) {
          setTimeout(() => {
            window._paq.push([
              'enableLinkTracking',
              this.configuration?.enableLinkTrackingValue ?? false,
            ]);
          }, 0);
        }
      }
      switch (this.configuration.trackers.length) {
        case 0:
          // TODO Throw an error if no tracker has been set.
          break;
        case 1:
          const mainTracker = this.configuration.trackers[0];
          window._paq.push(['setTrackerUrl', mainTracker.trackerUrl]);
          window._paq.push(['setSiteId', mainTracker.siteId.toString()]);
        // falls through
        default:
          this.configuration.trackers
            .slice(1)
            .forEach((tracker) =>
              window._paq.push(['addTracker', tracker.trackerUrl, tracker.siteId.toString()])
            );
      }
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = this.configuration.scriptUrl;
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
