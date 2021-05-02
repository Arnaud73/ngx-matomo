import { InjectionToken } from '@angular/core';

/**
 * Matomo module configuration interface.
 */
export interface MatomoModuleConfiguration {
  /**
   * URL of the Matomo JS script to execute.
   */
  scriptUrl: string;
  /**
   * Array of trackers, each one of them being described by its URL and site id.
   */
  trackers: Array<{ trackerUrl: string; siteId: number }>;
  /**
   * If set to true, automatically track the app being started.
   */
  trackAppStart?: boolean;
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

/**
 * Injection token for Matomo configuration.
 */
export const MATOMO_CONFIGURATION = new InjectionToken<string>('MATOMO_CONFIGURATION');

/**
 * Default configuration for the Matomo module.
 */
export const defaultConfiguration: Partial<MatomoModuleConfiguration> = {
  trackers: [],
  trackAppStart: true,
  trackLinks: true,
  trackLinkValue: false,
  requireConsent: false,
  requireCookieConsent: false,
  routeTracking: {
    enable: false,
  },
};
