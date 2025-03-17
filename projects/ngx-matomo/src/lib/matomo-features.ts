import {
  type MatomoRouteTrackingConfiguration,
  type MatomoTrackers,
  type MatomoTrackingConfiguration,
} from './matomo-configuration';

/**
 * Represents different Matomo feature configurations that can be used to customize tracking behavior.
 */
export type MatomoFeature =
  | { kind: 'preloadedTracker' }
  | { kind: 'dummyTracker' }
  | {
      kind: 'trackerInjection';
      parameters: Promise<Partial<MatomoTrackers>>;
    }
  | {
      kind: 'trackingConfiguration';
      parameters: Partial<MatomoTrackingConfiguration>;
    }
  | {
      kind: 'routeTracking';
      parameters: Partial<MatomoRouteTrackingConfiguration>;
    }
  | { kind: 'debugTracing' };

/**
 * Requires a Matomo script to be loaded and trackers to be set.
 *
 * @param trackers - Configuration object or Promise containing tracker settings
 * @returns {MatomoFeature} A feature configuration object specifying tracker injection
 */
export function withTrackers(
  trackers: Partial<MatomoTrackers> | Promise<Partial<MatomoTrackers>>,
): MatomoFeature {
  return {
    kind: 'trackerInjection',
    parameters: Promise.resolve(trackers).then((it) => ({ trackers: [], ...it })),
  };
}

/**
 * Configures ngx-Matomo to use an externally loaded tracker script.
 * Use this when the Matomo tracking script is already loaded on the page
 * (e.g., through a tag manager or manual script inclusion).
 *
 * @returns {MatomoFeature} A feature configuration object specifying external tracker usage
 */
export function withPreloadedTracker(): MatomoFeature {
  return { kind: 'preloadedTracker' };
}

/**
 * Configures ngx-Matomo to use a dummy tracker, meaning all calls are going to succeed but no action will occur.
 *
 * @returns {MatomoFeature} A feature configuration object specifying dummy tracker usage
 */
export function withDummyTracker(): MatomoFeature {
  return { kind: 'dummyTracker' };
}

/**
 * Configures global tracking settings for Matomo.
 *
 * @param configuration - Partial configuration object containing tracking settings
 * @returns {MatomoFeature} A feature configuration object specifying tracking configuration
 */
export function withConfig(
  configuration: Partial<MatomoTrackingConfiguration> = {},
): MatomoFeature {
  return { kind: 'trackingConfiguration', parameters: configuration };
}

/**
 * Configures route tracking settings for Matomo.
 *
 * @param configuration - Partial configuration object containing route tracking settings
 * @returns {MatomoFeature} A feature configuration object specifying route tracking configuration
 */
export function withRouteTracking(
  configuration: Partial<MatomoRouteTrackingConfiguration> = {},
): MatomoFeature {
  return { kind: 'routeTracking', parameters: configuration };
}

/**
 * Enables debug tracing for Matomo tracking operations.
 * This will log tracking-related information to help with debugging.
 *
 * @returns {MatomoFeature} A feature configuration object enabling debug tracing
 */
export function withDebugTracing(): MatomoFeature {
  return { kind: 'debugTracing' };
}
