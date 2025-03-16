import {
  MatomoRouteTrackingConfiguration,
  MatomoTrackers,
  MatomoTrackingConfiguration,
} from './matomo-configuration';

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
 * Require a Matomo script to be loaded and trackers to be set.
 *
 * @param trackers
 * @param {string} configuration.scriptUrl URL of the Matomo JS script to execute.
 * @param configuration.trackers list of trackers to register
 * @param {string} configuration.trackers[].trackerUrl URL of the tracker to register
 * @param {number} configuration.trackers[].siteId Website Id of the tracker to register
 *
 * @returns feature request for Matomo tracking
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
export function withPreloadedTracker(): MatomoFeature {
  return { kind: 'preloadedTracker' };
}

export function withDummyTracker(): MatomoFeature {
  return { kind: 'dummyTracker' };
}

export function withConfig(configuration: Partial<MatomoTrackingConfiguration>): MatomoFeature {
  return { kind: 'trackingConfiguration', parameters: configuration };
}

export function withRouteTracking(
  configuration: Partial<MatomoRouteTrackingConfiguration> = {},
): MatomoFeature {
  return { kind: 'routeTracking', parameters: configuration };
}

export function withDebugTracing(): MatomoFeature {
  return { kind: 'debugTracing' };
}
