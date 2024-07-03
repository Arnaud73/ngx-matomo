import { InjectionToken } from '@angular/core';

type ClickTrackingOption = 'NONE' | 'LEFT_CLICK_ONLY' | 'LEFT_MIDDLE_RIGHT_CLICKS';

export type MatomoConsentRequirement = 'NONE' | 'COOKIE' | 'TRACKING';

export type MatomoRouteData = {
  tracking?: 'AUTO' | 'OFF';
  title?: string;
  idRegExp?: RegExp;
};

export type Tracker = {
  siteId: number;
  trackerUrl: string;
};

export type MatomoTrackers = {
  /**
   * URL of the Matomo JS script to execute.
   */
  scriptUrl?: string;
  /**
   * Array of trackers, each one of them being described by its URL and site id.
   */
  trackers: Tracker[];
};

export const defaultTrackers: MatomoTrackers = {
  trackers: [],
};

export type MatomoTrackingConfiguration = {
  disableCrossDomainLinking?: boolean; // TODO: currently inactive
  disableCookies?: boolean;
  secureCookie?: boolean;
  cookieDomain?: string;
  cookiePath?: string;
  cookieSameSiteEnforcement?: 'Lax' | 'Strict' | 'None';
  doNotUserSendBeacon?: boolean;
  detectBrowserFeatures?: boolean;
  enableDoNotTrack?: boolean;
  consentRequirement?: MatomoConsentRequirement;
  trackJavaScriptErrors?: boolean;
  localDomains?: string[];
  heartBeatTimer?: number;
  customDimensions?: { index: number; value: string }[];
  disableCampaignParametersTracking?: boolean;
};

export const defaultTrackingConfiguration: MatomoTrackingConfiguration = {
  disableCrossDomainLinking: false,
  disableCookies: false,
  doNotUserSendBeacon: false,
  enableDoNotTrack: false,
  consentRequirement: 'NONE',
  detectBrowserFeatures: false,
  trackJavaScriptErrors: false,
  disableCampaignParametersTracking: false,
};

export type MatomoRouteTrackingConfiguration = {
  linkTracking: ClickTrackingOption;
  clearIds: boolean;
  idRegExp?: RegExp;
  idReplacement?: string;
  clearMatrixParams: boolean;
  clearQueryParams: boolean;
  clearHash: boolean;
};

export const defaultRouteTrackingConfiguration: MatomoRouteTrackingConfiguration = {
  linkTracking: 'NONE',
  clearIds: false,
  idReplacement: ':id',
  clearMatrixParams: false,
  clearQueryParams: false,
  clearHash: false,
};

/**
 * Injection token for internal Matomo trackers.
 */
export const MATOMO_TRACKERS_INTERNAL_CONFIGURATION = new InjectionToken<MatomoTrackers>(
  'Matomo trackers internal configuration',
);

/**
 * Injection token for internal Matomo tracking configuration.
 */
export const MATOMO_TRACKING_INTERNAL_CONFIGURATION =
  new InjectionToken<MatomoTrackingConfiguration>('Matomo tracking internal configuration');

/**
 * Injection token for internal Matomo route tracking configuration.
 */
export const MATOMO_ROUTE_TRACKING_INTERNAL_CONFIGURATION =
  new InjectionToken<MatomoRouteTrackingConfiguration>(
    'Matomo route tracking internal configuration',
  );

/**
 * Injection token for Matomo debug tracing.
 */
export const MATOMO_DEBUG_TRACING = new InjectionToken<boolean>('Matomo debug tracing');
