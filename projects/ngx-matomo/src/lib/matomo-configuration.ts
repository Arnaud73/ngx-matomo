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
  trackAppStarting?: boolean;
  /**
   * If set to true, link will be automatically tracked on the first page (if enabled).
   */
  enableLinkTracking?: boolean;
  /**
   * When link tracking has been enabled, this sets the value to the call to `enableLinkTracking`.
   */
  enableLinkTrackingValue?: boolean;
  /**
   * If set to true, user consent will be required for tracking requests to be sent to Matomo and also cookies to be set.
   */
  isConsentRequired?: boolean;
  /**
   * If set to true, user consent will be required for cookies to be stored and used.
   */
  isCookieConsentRequired?: boolean;
  /**
   * If true, automatic route tracking is enabled.
   */
  enableRouteTracking?: boolean;
  /**
   * List of DOM element ids for tracking content impressions.
   */
  contentIds?: Array<string>;
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
  trackAppStarting: true,
  enableLinkTracking: true,
  enableLinkTrackingValue: false,
  isConsentRequired: false,
  enableRouteTracking: false,
};
