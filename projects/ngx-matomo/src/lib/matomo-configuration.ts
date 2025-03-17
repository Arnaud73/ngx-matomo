import { InjectionToken } from '@angular/core';

/**
 * Defines how link clicks should be tracked in Matomo.
 * - 'none': No link tracking is performed
 * - 'leftClickOnly': Only track left mouse button clicks on links
 * - 'leftMiddleRightClicks': Track all mouse button clicks on links (left, middle, and right)
 */
type ClickTrackingOption = 'none' | 'leftClickOnly' | 'leftMiddleRightClicks';

/**
 * Specifies the level of consent required before Matomo can start tracking.
 * - 'requireNone': No consent is required to start tracking
 * - 'cookie': Cookie consent must be given before tracking begins
 * - 'tracking': Explicit tracking consent must be given before tracking begins
 */
export type MatomoConsentRequirement = 'requireNone' | 'cookie' | 'tracking';

/**
 * Defines the types of identifiers that can be detected and replaced in tracked URLs.
 * - 'numerical': Numeric identifiers (e.g., '12345')
 * - 'UUID': Standard UUIDs (e.g., '123e4567-e89b-12d3-a456-426614174000')
 * - 'objectId': MongoDB ObjectIds (e.g., '507f1f77bcf86cd799439011')
 * - 'ULID': Universally Unique Lexicographically Sortable Identifiers
 * - 'CUID': Collision-resistant IDs
 * - 'nanoId': Tiny, secure, URL-friendly unique identifiers
 */
export type IdType = 'numerical' | 'UUID' | 'objectId' | 'ULID' | 'CUID' | 'nanoId';

/**
 * Configuration data that can be attached to Angular routes for customizing Matomo tracking behavior.
 *
 * This data can be added to route definitions in your routing configuration to control
 * how specific routes are tracked in Matomo.
 *
 * @example
 * const routes: Routes = [
 *   {
 *     path: 'products/:productId',
 *     component: ProductDetailComponent,
 *     data: {
 *       matomo: {
 *         tracking: 'auto',
 *         title: 'Product Detail Page',
 *         idRegExp: /\d+/
 *       } as MatomoRouteData
 *     }
 *   }
 * ];
 */
export type MatomoRouteData = {
  /**
   * Controls whether this route should be automatically tracked.
   * - 'auto': Track this route automatically when navigated to (default)
   * - 'off': Do not track this route
   */
  tracking?: 'auto' | 'off';

  /**
   * Custom page title to use for this route in Matomo reports.
   * If not provided, Matomo will use the document title.
   */
  title?: string;

  /**
   * Custom regular expression to identify and replace dynamic IDs in this route's path.
   * This overrides the global idRegExp setting from MatomoRouteTrackingConfiguration.
   */
  idRegExp?: RegExp;
};

/**
 * Configuration for an individual Matomo tracker instance.
 *
 * Each tracker represents a connection to a specific Matomo instance and site.
 * Multiple trackers can be configured to send the same tracking data to different
 * Matomo instances simultaneously.
 */
export type Tracker = {
  /**
   * Matomo website ID (sometimes called siteId or idSite).
   * This is the unique identifier for your website in the Matomo instance.
   */
  siteId: number;
  /**
   * URL of the Matomo tracker endpoint to send data to.
   * This should typically end with 'matomo.php' or 'piwik.php'.
   * Example: 'https://analytics.example.com/matomo.php'
   */
  trackerUrl: string;
};

/**
 * Configuration for Matomo tracking script and tracker instances.
 *
 * This defines how the Matomo tracking script is loaded and which Matomo instances
 * will receive tracking data from your application.
 */
export type MatomoTrackers = {
  /**
   * URL of the Matomo JavaScript tracking script to load.
   * Example: 'https://analytics.example.com/matomo.js'
   * Optional if you're using an externally loaded tracker.
   */
  scriptUrl?: string;
  /**
   * Array of Matomo tracker instances to configure.
   * Each tracker represents a connection to a specific Matomo instance and site ID.
   * You can configure multiple trackers to send the same tracking data
   * to different Matomo instances simultaneously.
   */
  trackers: Tracker[];
};

export const defaultTrackers: MatomoTrackers = {
  trackers: [],
};

/**
 * Configuration options for Matomo tracking behavior.
 */
export type MatomoTrackingConfiguration = {
  /**
   * Whether to disable cross-domain linking.
   * Note: This option is currently inactive.
   */
  disableCrossDomainLinking?: boolean;

  /**
   * Whether to disable tracking cookies. When true, Matomo will not create cookies.
   */
  disableCookies?: boolean;

  /**
   * Whether cookies should be marked as secure (only transmitted over HTTPS).
   */
  secureCookie?: boolean;

  /**
   * The domain to use for cookies. Useful for setting cookies across subdomains.
   */
  cookieDomain?: string;

  /**
   * The path to use for cookies.
   */
  cookiePath?: string;

  /**
   * Controls the SameSite attribute for cookies.
   * - 'lax': Cookies are sent with same-site requests and cross-site top-level navigation
   * - 'strict': Cookies are only sent with same-site requests
   * - 'none': Cookies are sent with both same-site and cross-site requests (requires Secure)
   */
  cookieSameSiteEnforcement?: 'lax' | 'strict' | 'none';

  /**
   * Whether to disable sending beacons when the page is unloaded.
   */
  doNotUseSendBeacon?: boolean;

  /**
   * Whether to enable browser feature detection (e.g., browser plugin detection).
   */
  detectBrowserFeatures?: boolean;

  /**
   * Whether to respect the DoNotTrack setting in the visitor's browser.
   */
  enableDoNotTrack?: boolean;

  /**
   * Level of consent required before tracking:
   * - 'requireNone': No consent required
   * - 'cookie': Cookie consent required
   * - 'tracking': Tracking consent required
   */
  consentRequirement?: MatomoConsentRequirement;

  /**
   * Whether to track JavaScript errors as events in Matomo.
   */
  trackJavaScriptErrors?: boolean;

  /**
   * List of domains to treat as local in multi-domain tracking.
   */
  localDomains?: string[];

  /**
   * Time in seconds between heartbeat tracking requests to record visit duration more accurately.
   */
  heartBeatTimer?: number;

  /**
   * Custom dimensions to set globally for all tracking requests.
   */
  customDimensions?: { index: number; value: string }[];

  /**
   * Whether to disable tracking of campaign parameters (utm_*).
   */
  disableCampaignParametersTracking?: boolean;
};

export const defaultTrackingConfiguration: MatomoTrackingConfiguration = {
  disableCrossDomainLinking: false,
  disableCookies: false,
  doNotUseSendBeacon: false,
  enableDoNotTrack: false,
  consentRequirement: 'requireNone',
  detectBrowserFeatures: false,
  trackJavaScriptErrors: false,
  disableCampaignParametersTracking: false,
};

/**
 * Configuration options for how Matomo tracks Angular route changes.
 *
 * This configuration controls various aspects of route tracking behavior,
 * including how URLs are processed before being sent to Matomo and what
 * parts of the URL are included or excluded from tracking.
 */
export type MatomoRouteTrackingConfiguration = {
  /**
   * Controls how link clicks should be tracked.
   * - 'none': No link tracking
   * - 'leftClickOnly': Only track left mouse button clicks
   * - 'leftMiddleRightClicks': Track all mouse button clicks
   */
  linkTracking: ClickTrackingOption;

  /**
   * If true, dynamic IDs in the current route path will be removed from the tracked URL
   * and replaced with the value specified in `idReplacement`.
   * This helps group similar pages in analytics reports.
   */
  clearIds: boolean;

  /**
   * Custom regular expression used to identify IDs in the current route.
   * If provided, this overrides the automatic ID detection based on `idTypes`.
   */
  idRegExp?: RegExp;

  /**
   * List of ID types to detect and replace in URLs when `clearIds` is true.
   * Only used if no custom `idRegExp` is provided.
   * Supported types include numerical IDs, UUIDs, MongoDB ObjectIds, and more.
   */
  idTypes?: IdType[];

  /**
   * The string that will replace identified IDs in the tracked URL.
   * Default is ':id' if not specified.
   */
  idReplacement?: string;

  /**
   * If true, matrix parameters (e.g., ';key=value') will be removed from the tracked URL.
   * Matrix parameters are part of the Angular router's path syntax.
   */
  clearMatrixParams: boolean;

  /**
   * If true, query parameters (e.g., '?key=value') will be removed from the tracked URL.
   */
  clearQueryParams: boolean;

  /**
   * If true, the hash fragment (e.g., '#section') will be removed from the tracked URL.
   */
  clearHash: boolean;
};

/**
 * Default route tracking configuration.
 */
export const defaultRouteTrackingConfiguration: MatomoRouteTrackingConfiguration = {
  linkTracking: 'none',
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
