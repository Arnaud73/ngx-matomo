import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Access to the global window variable.
 */
declare var window: {
  [key: string]: any;
  prototype: Window;
  new (): Window;
};

/**
 * Service for injecting the Matomo tracker in the application.
 *
 * @export
 */
@Injectable()
export class MatomoInjector {
  /**
   * Creates an instance of MatomoInjector.
   *
   * @param platformId Angular description of the platform.
   */
  constructor(@Inject(PLATFORM_ID) private platformId) {
    if (isPlatformBrowser(this.platformId)) {
      window._paq = window._paq || [];
    } else {
      console.warn('MatomoInjector can\'t be used on server platform');
    }
  }

  /**
   * Injects the Matomo tracker in the DOM.
   *
   * @param url URL of the Matomo instance to connect to.
   * @param id SiteId for this application/site.
   * @param [scriptUrl] Optional URL for the `piwik.js`/`matomo.js` script in case it is not at its default location.
   * @param [trackingUrl] Optional URL for the `piwik.php`/`matomo.php` in case it is not at its default location.
   */
  init(url: string, id: number, scriptUrl?: string, trackingUrl?: string) {
    if (isPlatformBrowser(this.platformId)) {
      window._paq.push(['trackPageView']);
      window._paq.push(['enableLinkTracking']);
      (() => {
        const u = url;
        window._paq.push(['setTrackerUrl', !!trackingUrl ? trackingUrl : u + 'piwik.php']);
        window._paq.push(['setSiteId', id.toString()]);
        const d = document;
        const g = d.createElement('script');
        const s = d.getElementsByTagName('script')[0];
        g.type = 'text/javascript';
        g.async = true;
        g.defer = true;
        g.src = !!scriptUrl ? scriptUrl : u + 'piwik.js';
        s.parentNode.insertBefore(g, s);
      })();
    }
  }
}
