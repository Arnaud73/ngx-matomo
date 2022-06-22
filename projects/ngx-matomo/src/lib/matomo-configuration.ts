import { InjectionToken } from '@angular/core';

/**
 * Matomo module configuration interface.
 */
export interface MatomoConfiguration {
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
   * If set to true, automatically track the app being started.
   */
  trackAppLaunch?: boolean;
  /**
   * If set to true, link will be automatically tracked on the first page (if enabled).
   */
  trackLinks?: boolean;
  /**
   * When link tracking has been enabled, this sets the value to the call to `enableLinkTracking`
   */
  trackLinkValue?: boolean;
  /**
   * If set to true, user consent will be required.
   */
  requireConsent?: boolean;
  /**
   * If set to true, user consent will be required for cookies to be stored and used.
   */
  requireCookieConsent?: boolean;
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

export interface DeprecatedMatomoConfiguration {
  /**
   * If set to true, automatically track the app being started.
   * @deprecated
   */
  trackAppStart?: boolean;
}

interface All extends MatomoConfiguration, DeprecatedMatomoConfiguration {}

export function sanitizeConfiguration(configuration: Partial<All>): Partial<MatomoConfiguration> {
  const sanitizedConfiguration: Partial<MatomoConfiguration> = {};

  if (configuration.trackAppStart !== undefined && configuration.trackAppStart !== null) {
    sanitizedConfiguration.trackAppLaunch = configuration.trackAppStart;
  }

  if (configuration.routeTracking !== undefined && configuration.routeTracking !== null) {
    sanitizedConfiguration.routeTracking = configuration.routeTracking;
  }

  return sanitizedConfiguration;
}

/**
 * Injection token for Matomo configuration.
 */
export const MATOMO_CONFIGURATION = new InjectionToken<string>('MATOMO_CONFIGURATION');

/**
 * Default configuration for the Matomo module.
 */
export const defaultConfiguration: Partial<MatomoConfiguration> = {
  scriptVersion: 4,
  trackers: [],
  trackAppLaunch: true,
  trackLinks: true,
  trackLinkValue: false,
  requireConsent: false,
  requireCookieConsent: false,
  routeTracking: {
    enable: false,
  },
};
