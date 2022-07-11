import { InjectionToken } from '@angular/core';

export interface SanitizedMatomoConfiguration {
  /**
   * URL of the Matomo JS script to execute.
   */
  scriptUrl?: string;
  /**
   * Version of the Matomo JS script to download.
   * (there is no easy way to know for sure which features will be supported in the script)
   */
  scriptVersion: number;
  /**
   * Array of trackers, each one of them being described by its URL and site id.
   */
  trackers: Array<{ trackerUrl: string; siteId: number }>;
  /**
   * If true, user consent will be required.
   */
  requireConsent?: boolean;
  /**
   * If true, user consent will be required for cookies to be stored and used.
   */
  requireCookieConsent?: boolean;
  /**
   * If true, initial page view will not be tracked.
   */
  skipTrackingInitialPageView?: boolean;
  /**
   * If true, link will be automatically tracked on the first page (if enabled).
   */
  trackLinks?: boolean;
  /**
   * When link tracking has been enabled, this sets the value to the call to `enableLinkTracking`
   */
  trackLinkValue?: boolean;
  /**
   * Parameters related to route tracking.
   */
  routeTracking?: {
    /**
     * If true, automatic route tracking is enabled.
     */
    enable: boolean;
    /**
     * List of DOM element ids for tracking content impressions.
     */
    contentIds?: Array<string>;
  };
}

/**
 * Matomo module configuration interface.
 */
export interface MatomoConfiguration extends SanitizedMatomoConfiguration {
  /**
   * If true, automatically track the app being started.
   * @deprecated
   */
  trackAppStart?: boolean;
}

export function sanitizeConfiguration(
  configuration: Partial<MatomoConfiguration>
): Partial<SanitizedMatomoConfiguration> {
  const sanitizedConfiguration: Partial<SanitizedMatomoConfiguration> = {
    ...defaultConfiguration,
    ...configuration,
  };

  if (configuration.trackAppStart !== undefined && configuration.trackAppStart !== null) {
    sanitizedConfiguration.skipTrackingInitialPageView = !configuration.trackAppStart;
  }

  if (configuration.routeTracking !== undefined && configuration.routeTracking !== null) {
    sanitizedConfiguration.routeTracking = configuration.routeTracking;
  }

  return sanitizedConfiguration;
}

/**
 * Injection token for Matomo configuration.
 */
export const MATOMO_CONFIGURATION = new InjectionToken<MatomoConfiguration>('MATOMO_CONFIGURATION');

/**
 * Default configuration for the Matomo module.
 */
const defaultConfiguration: Partial<SanitizedMatomoConfiguration> = {
  scriptVersion: 4,
  trackers: [],
  requireConsent: false,
  requireCookieConsent: false,
  skipTrackingInitialPageView: false,
  trackLinks: true,
  trackLinkValue: false,
  routeTracking: {
    enable: false,
  },
};
