import { Injectable } from '@angular/core';

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
     * @param url: URL of the Matomo instance to connect to. For example '//analytics.my-website.com/'
     * @param id : SiteId for this application/site. If this is the first website your matomo is tracking, Id will be 1.
     * @param scriptName : Name of the script, for legacy support you can use 'piwik'.
     * @memberof MatomoInjector
     */
    init(url: string, id: number = 1, scriptName: string = 'matomo') {
        window._paq.push(['trackPageView']);
        window._paq.push(['enableLinkTracking']);
        (() => {
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
        })();
    }
}
