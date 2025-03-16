import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import {
  provideMatomoTracking,
  withConfig,
  withDebugTracing,
  withRouteTracking,
  withTrackers,
} from 'ngx-matomo';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules) /*, withDebugTracing()*/),
    provideMatomoTracking(
      // Synchronous tracker configuration
      // withTrackers({
      //   scriptUrl: 'https://cdn.matomo.cloud/ngx.matomo.cloud/matomo.js',
      //   trackers: [
      //     {
      //       trackerUrl: 'https://ngx.matomo.cloud/matomo.php',
      //       siteId: 1,
      //     },
      //   ],
      // }),

      // Asynchronous tracker configuration
      withTrackers(
        new Promise(function (resolve) {
          setTimeout(() => {
            fetch('/trackers.json')
              .then((response) => response.json())
              .then(resolve);
          }, 5000);
        }),
      ),

      // With tracker loaded outside of the Angular application (Google Tag Manager, etc.)
      // withProvidedTracker(),

      // Use fake tracker
      // withMockedTracker(),

      // Tracking configuration
      withConfig({
        enableDoNotTrack: false,
        consentRequirement: 'requireNone',
        heartBeatTimer: 15,
        trackJavaScriptErrors: true,
        detectBrowserFeatures: true,
      }),

      // Route tracking configuration
      withRouteTracking({
        linkTracking: 'leftClickOnly',
        clearIds: true,
        clearQueryParams: true,
        clearHash: true,
      }),

      // Activate debug traces
      withDebugTracing(),
    ),
  ],
};
