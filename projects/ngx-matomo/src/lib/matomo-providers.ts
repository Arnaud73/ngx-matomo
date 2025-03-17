import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ENVIRONMENT_INITIALIZER, PLATFORM_ID, type Provider } from '@angular/core';

import {
  MATOMO_DEBUG_TRACING,
  MATOMO_ROUTE_TRACKING_INTERNAL_CONFIGURATION,
  MATOMO_TRACKERS_INTERNAL_CONFIGURATION,
  MATOMO_TRACKING_INTERNAL_CONFIGURATION,
  type MatomoRouteTrackingConfiguration,
  type MatomoTrackers,
  type MatomoTrackingConfiguration,
  defaultRouteTrackingConfiguration,
  defaultTrackers,
  defaultTrackingConfiguration,
} from './matomo-configuration';
import { type MatomoFeature } from './matomo-features';
import {
  MATOMO_TRACKER_GET_FUNCTION,
  MATOMO_TRACKER_INVOKE_FUNCTION,
  MATOMO_TRACKER_SET_FUNCTION,
  getFunctionFactory,
  invokeFunctionFactory,
  setFunctionFactory,
} from './matomo-functions';
import { injectMatomoTrackingScriptFactory } from './matomo-inject-tracking-script';
import { MatomoRouteTracker } from './matomo-route-tracker.service';
import { MatomoTracker } from './matomo-tracker.service';

declare global {
  /**
   * Extend Window interface in order to introduce the Matomo _paq attribute
   */
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    _paq: { push: (args: unknown[]) => void };
  }
}

/**
 * Configures and provides Matomo analytics tracking for an Angular application.
 *
 * This function returns the necessary providers to set up Matomo tracking
 * based on the specified features. It should be used in your app.config.ts
 * or in the providers array of your NgModule.
 *
 * @param {...MatomoFeature} features - Configuration features that determine how Matomo
 *   tracking will be set up. Features can be created using helper functions like:
 *   - withTrackers() - Configures Matomo tracker instances
 *   - withPreloadedTracker() - Uses an externally loaded Matomo script
 *   - withDummyTracker() - Uses a non-operational tracker for testing
 *   - withConfig() - Sets global tracking configuration options
 *   - withRouteTracking() - Enables automatic route tracking
 *   - withDebugTracing() - Enables debug logging for tracking calls
 *
 * @example
 * // In your app.config.ts:
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideMatomoTracking(
 *       withTrackers({
 *         scriptUrl: 'https://your-matomo-instance.com/matomo.js',
 *         trackers: [{ siteId: 1, trackerUrl: 'https://your-matomo-instance.com/matomo.php' }]
 *       }),
 *       withRouteTracking({ linkTracking: 'leftClickOnly', clearIds: true }),
 *       withConfig({ disableCookies: false, trackJavaScriptErrors: true })
 *     )
 *   ]
 * };
 *
 * @returns {Provider[]} An array of Angular providers that enable Matomo tracking
 *   according to the specified configuration.
 */
export function provideMatomoTracking(...features: MatomoFeature[]): Provider[] {
  if (
    features.filter((it) =>
      ['trackerInjection', 'preloadedTracker', 'dummyTracker'].includes(it.kind),
    ).length > 1
  ) {
    console.error('One and one only tracker configuration must be used.');
    return [];
  }

  try {
    window['_paq'] =
      window['_paq'] ||
      (features.find((it) => it.kind === 'trackerInjection') ||
      features.find((it) => it.kind === 'preloadedTracker')
        ? []
        : // eslint-disable-next-line @typescript-eslint/no-empty-function
          { push: () => {} });
  } catch (e) {
    if (!(e instanceof ReferenceError)) throw e;
  }

  const providers: Provider[] = [MatomoTracker];

  const debugTracingFeature = features.find((it) => it.kind === 'debugTracing');
  providers.push({
    provide: MATOMO_DEBUG_TRACING,
    useValue: !!debugTracingFeature,
  });

  const routeTrackingFeature = features.find((it) => it.kind === 'routeTracking') as
    | {
        kind: 'routeTracking';
        parameters: Partial<MatomoRouteTrackingConfiguration>;
      }
    | undefined;
  if (routeTrackingFeature) {
    providers.push(
      {
        provide: ENVIRONMENT_INITIALIZER,
        useFactory: (matomoRouteTracker: MatomoRouteTracker) => () => {
          matomoRouteTracker.startTracking();
        },
        deps: [MatomoRouteTracker],
        multi: true,
      },
      {
        provide: MATOMO_ROUTE_TRACKING_INTERNAL_CONFIGURATION,
        useValue: {
          ...defaultRouteTrackingConfiguration,
          ...routeTrackingFeature?.parameters,
        },
      },
    );
  }

  const trackingConfigurationFeature = features.find(
    (it) => it.kind === 'trackingConfiguration',
  ) as
    | {
        kind: 'trackingConfiguration';
        parameters: Partial<MatomoTrackingConfiguration>;
      }
    | undefined;
  if (trackingConfigurationFeature) {
    providers.push(
      {
        provide: ENVIRONMENT_INITIALIZER,
        useFactory: (matomoTracker: MatomoTracker) => () => {
          // Disable Navigator.sendBeacon() API for transmitting tracking data
          // This can be useful for ensuring all tracking requests are completed before page unload
          if (trackingConfigurationFeature.parameters.doNotUseSendBeacon)
            matomoTracker.disableAlwaysUseSendBeacon();

          // Disable all cookies used by Matomo tracker
          // This helps with privacy compliance (e.g., GDPR) when cookies aren't permitted
          if (trackingConfigurationFeature.parameters.disableCookies)
            matomoTracker.disableCookies();

          // Disable cross domain linking if specified
          // Cross-domain linking allows visitors to be tracked across multiple domains
          // TODO: investigate how this is done with GTM parameters.
          // if (trackingConfigurationFeature.parameters.disableCrossDomainLinking)
          //   matomoTracker.disableCrossDomainLinking();

          // Set cookie domain - allows cookies to be shared across subdomains
          // Example: setting to '.example.com' will share cookies across all subdomains
          if (trackingConfigurationFeature.parameters.cookieDomain)
            matomoTracker.setCookieDomain(trackingConfigurationFeature.parameters.cookieDomain);

          // Set cookie path - restricts cookies to a specific path on the domain
          // Default is '/' which makes cookies available across the entire domain
          if (trackingConfigurationFeature.parameters.cookiePath)
            matomoTracker.setCookiePath(trackingConfigurationFeature.parameters.cookiePath);

          // Set SameSite attribute for cookies to control cross-site request behavior
          // Options include 'Lax', 'Strict', or 'None' (requires Secure)
          if (trackingConfigurationFeature.parameters.cookieSameSiteEnforcement)
            matomoTracker.setCookieSameSite(
              trackingConfigurationFeature.parameters.cookieSameSiteEnforcement,
            );

          // Enable Secure flag on cookies - restricts cookies to HTTPS connections only
          // This improves security by preventing transmission over unencrypted connections
          if (trackingConfigurationFeature.parameters.secureCookie)
            matomoTracker.setSecureCookie(true);

          // Enable detection of browser features (like cookies, java, flash) as custom dimensions
          // This provides additional analytics data about visitor capabilities
          if (trackingConfigurationFeature.parameters.detectBrowserFeatures)
            matomoTracker.enableBrowserFeatureDetection();

          // Track JavaScript errors as events in Matomo
          // Helps identify client-side issues affecting user experience
          if (trackingConfigurationFeature.parameters.trackJavaScriptErrors)
            matomoTracker.enableJSErrorTracking();

          // Enable heart beat timer to accurately measure time spent on page
          // Periodically sends pings to track engaged time, even without user interaction
          if (typeof trackingConfigurationFeature.parameters.heartBeatTimer !== 'number')
            matomoTracker.enableHeartBeatTimer(
              trackingConfigurationFeature.parameters.heartBeatTimer,
            );

          // Set domains that should be treated as local/internal in link tracking
          // Helps distinguish between internal navigation and outbound links
          if (Array.isArray(trackingConfigurationFeature.parameters.localDomains))
            matomoTracker.setDomains(trackingConfigurationFeature.parameters.localDomains);

          // Respect browser's DoNotTrack setting
          // When enabled, visitors with DoNotTrack enabled won't be tracked
          if (trackingConfigurationFeature.parameters.enableDoNotTrack)
            matomoTracker.setDoNotTrack(true);

          // Configure consent requirements before tracking
          // 'requireNone' requires no consent
          // 'tracking' requires consent for all tracking
          // 'cookie' requires consent only for cookie usage
          if (trackingConfigurationFeature.parameters?.consentRequirement === 'tracking')
            matomoTracker.requireConsent();
          else if (trackingConfigurationFeature.parameters?.consentRequirement === 'cookie')
            matomoTracker.requireCookieConsent();

          // Set global custom dimensions to be included with all tracking requests
          // Custom dimensions allow sending additional metadata with each tracking event
          trackingConfigurationFeature.parameters.customDimensions?.forEach((it) => {
            matomoTracker.setCustomDimension(it.index, it.value);
          });

          if (trackingConfigurationFeature.parameters.disableCampaignParametersTracking)
            matomoTracker.disableCampaignParameters();
        },
        deps: [MatomoTracker],
        multi: true,
      },
      {
        provide: MATOMO_TRACKING_INTERNAL_CONFIGURATION,
        useValue: {
          ...defaultTrackingConfiguration,
          ...trackingConfigurationFeature?.parameters,
        },
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dummyTrackerFeature = features.find((it) => it.kind === 'dummyTracker');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const preloadedTrackerFeature = features.find((it) => it.kind === 'preloadedTracker');

  const trackerInjectionFeature = features.find((it) => it.kind === 'trackerInjection') as
    | {
        kind: 'trackerInjection';
        parameters: Promise<Partial<MatomoTrackers>>;
      }
    | undefined;
  if (trackerInjectionFeature) {
    providers.push({
      provide: ENVIRONMENT_INITIALIZER,
      useFactory:
        (trackers: Promise<MatomoTrackers>, document: Document, debugTracing: boolean) => () =>
          trackers.then(injectMatomoTrackingScriptFactory(document, debugTracing)),
      deps: [MATOMO_TRACKERS_INTERNAL_CONFIGURATION, DOCUMENT, MATOMO_DEBUG_TRACING],
      multi: true,
    });
  }

  return [
    ...providers,
    {
      provide: MATOMO_TRACKERS_INTERNAL_CONFIGURATION,
      useFactory: () =>
        Promise.all([defaultTrackers, trackerInjectionFeature?.parameters]).then(
          ([defaultTrackers, injectionTrackers]) => ({
            ...defaultTrackers,
            ...injectionTrackers,
          }),
        ),
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: (platformId: object) => () => {
        if (!isPlatformBrowser(platformId))
          console.warn('ngx-Matomo is active only on browser platform.');
      },
      deps: [PLATFORM_ID],
      multi: true,
    },
    {
      provide: MATOMO_TRACKER_SET_FUNCTION,
      useFactory: (platformId: object, debugTracing: boolean) =>
        setFunctionFactory(!isPlatformBrowser(platformId), debugTracing),
      deps: [PLATFORM_ID, MATOMO_DEBUG_TRACING],
    },
    {
      provide: MATOMO_TRACKER_GET_FUNCTION,
      useFactory: (platformId: object, debugTracing: boolean) =>
        getFunctionFactory(!isPlatformBrowser(platformId), debugTracing),
      deps: [PLATFORM_ID],
    },
    {
      provide: MATOMO_TRACKER_INVOKE_FUNCTION,
      useFactory: (platformId: object, debugTracing: boolean) =>
        invokeFunctionFactory(!isPlatformBrowser(platformId), debugTracing),
      deps: [PLATFORM_ID],
    },
  ];
}
