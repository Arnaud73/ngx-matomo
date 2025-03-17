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
 * Prepares Matomo tracking by returning a list of providers.
 *
 * @param {...*} features List of features to include in order to provide the correct list of providers.
 * @returns providers required for Matomo tracking.
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
          // Disable use of sendBeacon for transmitting tracked events
          if (trackingConfigurationFeature.parameters.doNotUseSendBeacon)
            matomoTracker.disableAlwaysUseSendBeacon();

          // Disable cookies if specified
          if (trackingConfigurationFeature.parameters.disableCookies)
            matomoTracker.disableCookies();

          // Disable cross domain linking if specified
          // TODO: investigate how this is done with GTM parameters.
          // if (trackingConfigurationFeature.parameters.disableCrossDomainLinking)
          //   matomoTracker.disableCrossDomainLinking();

          // Set cookie domain if specified
          if (trackingConfigurationFeature.parameters.cookieDomain)
            matomoTracker.setCookieDomain(trackingConfigurationFeature.parameters.cookieDomain);

          // Set cookie path if specified
          if (trackingConfigurationFeature.parameters.cookiePath)
            matomoTracker.setCookiePath(trackingConfigurationFeature.parameters.cookiePath);

          // Set cookie same site if specified
          if (trackingConfigurationFeature.parameters.cookieSameSiteEnforcement)
            matomoTracker.setCookieSameSite(
              trackingConfigurationFeature.parameters.cookieSameSiteEnforcement,
            );

          // Set secure cookies if specified
          if (trackingConfigurationFeature.parameters.secureCookie)
            matomoTracker.setSecureCookie(true);

          // Enable Browser Feature Detection if specified
          if (trackingConfigurationFeature.parameters.detectBrowserFeatures)
            matomoTracker.enableBrowserFeatureDetection();

          // Enable JavaScript error tracking (as events)
          if (trackingConfigurationFeature.parameters.trackJavaScriptErrors)
            matomoTracker.enableJSErrorTracking();

          // Enable Heart Beat Timer if specified
          if (typeof trackingConfigurationFeature.parameters.heartBeatTimer !== 'number')
            matomoTracker.enableHeartBeatTimer(
              trackingConfigurationFeature.parameters.heartBeatTimer,
            );

          // Set local domains
          if (Array.isArray(trackingConfigurationFeature.parameters.localDomains))
            matomoTracker.setDomains(trackingConfigurationFeature.parameters.localDomains);

          // Enable DoNotTrack
          if (trackingConfigurationFeature.parameters.enableDoNotTrack)
            matomoTracker.setDoNotTrack(true);

          // Require the right consent
          if (trackingConfigurationFeature.parameters?.consentRequirement === 'tracking')
            matomoTracker.requireConsent();
          else if (trackingConfigurationFeature.parameters?.consentRequirement === 'cookie')
            matomoTracker.requireCookieConsent();

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
