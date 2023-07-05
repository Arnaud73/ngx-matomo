export const environment = {
  production: true,
  matomoConfig: {
    mode: <'ACTIVE'>'ACTIVE',
    scriptUrl: '//cdn.matomo.cloud/ngx.matomo.cloud/matomo.js',
    trackers: [
      {
        trackerUrl: 'https://ngx.matomo.cloud/matomo.php',
        siteId: 1,
      },
    ],
    skipTrackingInitialPageView: false,
    requireConsent: true,
    routeTracking: {
      enable: true,
    },
    trackLinks: true,
  },
};
