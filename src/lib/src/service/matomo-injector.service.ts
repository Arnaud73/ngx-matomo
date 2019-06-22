import { Injectable } from '@angular/core';
import { MatomoSettings } from './matomo-settings.model';

declare var window: {
    [key: string]: any;
    prototype: Window;
    new(): Window;
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
    init(settings: MatomoSettings) {
        let { url, id, scriptName, enableLinkTracking } = settings;
        window._paq.push(['trackPageView']);

        if (enableLinkTracking) {
            window._paq.push(['enableLinkTracking']);
        }

        const u = url;
        window._paq.push(['setTrackerUrl', u + `${scriptName}.php`]);
        window._paq.push(['setSiteId', id.toString()]);
        const d = document,
            g = d.createElement('script'),
            s = d.getElementsByTagName('script')[0];
        g.type = 'text/javascript';
        g.async = true;
        g.defer = true;
        g.src = u + `${scriptName}.js`;
        s.parentNode.insertBefore(g, s);
    }
}
