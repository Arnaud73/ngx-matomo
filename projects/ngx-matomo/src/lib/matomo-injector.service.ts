import { Injectable } from '@angular/core';
import { MatomoInitSettings } from './matomo-settings.model';
import { MatomoScanSettings } from './matomo-scan-settings.model';

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
   * @memberof MatomoInjector
   */
  constructor() {
    window._paq = window._paq || [];
  }

  /**
   * Injects the Matomo tracker in the DOM.
   *
   * @param settings Matomo settings for initialization.
   * @memberof MatomoInjector
   */
    init(settings: MatomoInitSettings) {
      const { url, id, scriptName, enableLinkTracking } = Object.assign(new MatomoInitSettings(), settings);
      window._paq.push(['trackPageView']);

      if (enableLinkTracking) {
        window._paq.push(['enableLinkTracking']);
      }

      const u = url;
      window._paq.push(['setTrackerUrl', u + `${scriptName}.php`]);
      window._paq.push(['setSiteId', id.toString()]);
      const d = document;
      const g = d.createElement('script');
      const s = d.getElementsByTagName('script')[0];
      g.type = 'text/javascript';
      g.async = true;
      g.defer = true;
      g.src = u + `${scriptName}.js`;
      s.parentNode.insertBefore(g, s);
    }

    /**
     *
     * @param settings
     * @see https://developer.matomo.org/guides/spa-tracking
     */
    onPageChange(settings?: MatomoScanSettings) {
        const {
            referrer,
            customURL,
            documentTitle,
            timeItTookToLoadPage,
            enableLinkTracking,
        } = Object.assign(new MatomoScanSettings(), settings);

        if (referrer) {
            window._paq.push(['setReferrerUrl', referrer]);
    }

        if (customURL) {
            window._paq.push(['setCustomUrl', customURL]);
        }

        if (documentTitle) {
            window._paq.push(['setDocumentTitle', documentTitle]);
        }

        // remove all previously assigned custom variables, requires Matomo (formerly Piwik) 3.0.2
        window._paq.push(['deleteCustomVariables', 'page']);
        window._paq.push(['setGenerationTimeMs', timeItTookToLoadPage]);
        window._paq.push(['trackPageView']);

        // todo
        // make Matomo aware of newly added content
        // let content = document.getElementById('content');
        // _paq.push(['MediaAnalytics::scanForMedia', content]);
        // _paq.push(['FormAnalytics::scanForForms', content]);
        // _paq.push(['trackContentImpressionsWithinNode', content]);

        if (enableLinkTracking) {
            window._paq.push(['enableLinkTracking']);
        }
    }


}
