export const environment = {
  production: true,
  matomoConfig: {
    scriptUrl: '//cdn.matomo.cloud/ngx.matomo.cloud/matomo.js',
    trackers: [
      {
        trackerUrl: 'https://ngx.matomo.cloud/matomo.php',
        siteId: 1,
      },
    ],
    requireConsent: true,
    routeTracking: {
      enable: true,
    },
  },
};
