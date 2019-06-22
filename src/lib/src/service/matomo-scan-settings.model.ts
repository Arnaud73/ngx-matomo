export class MatomoScanSettings {
    /**
     * Depending on whether you want to track the previous page as a referrer for the new page view,
     * you should update the referrer URL by setting it to the previous page URL.
     *
     * @see https://developer.matomo.org/guides/spa-tracking#updating-the-referrer
     */
    referrer?: string;

    /**
     * On a not SPA application Matomo is able to detect url change when calling 'trackPageView'.
     * In a SPA you have to update it yourself. Otherwise the url send will always be the same as
     * the first page you have visited (probably the main page `https://my-website.com`).
     *
     * If using legacy hash in angular routing you can use `'/' + window.location.hash.substr(1)`.
     * Be aware that if you provide an incomplete url, Matomo will prepend window.location.hostname to it.
     * For example `/article` on domain `http://localhost:4200` will become `http://localhost/article`.
     *
     * @see https://developer.matomo.org/guides/spa-tracking#tracking-a-new-page-view
     */
    customURL?: string = window.location.href;


    /**
     * On a not SPA application Matomo is able to detect document title change when calling 'trackPageView'.
     * In a SPA you have to update it yourself. Otherwise the document title send will always be the same as
     * the first page you have visited.
     *
     * @see https://developer.matomo.org/guides/spa-tracking#tracking-a-new-page-view
     */
    documentTitle?: string = window.document.title;

    /**
     * You need to update the generation time before tracking a new page view.
     * Otherwise, the initial page generation time will be attributed to all of your subsequent pageviews.
     * If you don’t load new content from the server when the page changes, simply set the value to zero.
     *
     * This mean that you should track the completion time of your (page) resolver if you have one.
     *
     * Time is in milliseconds.
     *
     * @see https://developer.matomo.org/guides/spa-tracking#updating-the-generation-time
     */
    timeItTookToLoadPage?: number = 0;

    /**
     * If you use the link tracking feature to measure outlinks and downloads,
     * Matomo needs to re-scan the entire DOM for newly added links whenever your DOM changes.
     *
     * @see https://developer.matomo.org/guides/spa-tracking#link-tracking
     */
    enableLinkTracking?: boolean = true;
}
