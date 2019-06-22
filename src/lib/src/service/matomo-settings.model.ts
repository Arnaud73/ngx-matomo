export class MatomoSettings {
    /**
     * URL of the Matomo instance to connect to. For example '//analytics.my-website.com/'
     */
    url: string;

    /**
     * SiteId for this application/site. If this is the first website your matomo is tracking, Id will be 1.
     */
    id: number = 1;

    /**
     * Name of the script, for legacy support you can use 'piwik'.
     */
    scriptName: string = 'matomo';

    /**
     * Matomo will scan the page -ONCE- for links and track them. Disable if you wanna do it yourself.
     */
    enableLinkTracking: boolean = true;
}
