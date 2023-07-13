import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: [],
})
export class WelcomeComponent {
  public readonly configurationCode =
    "matomoConfig = {\n\
    scriptUrl: '//cdn.matomo.cloud/ngx.matomo.cloud/matomo.js',\n\
    trackers: [\n\
      {\n\
        trackerUrl: 'https://ngx.matomo.cloud/matomo.php',\n\
        siteId: 1,\n\
      },\n\
    ],\n\
    skipTrackingInitialPageView: false,\n\
    requireConsent: true,\n\
    routeTracking: {\n\
      enable: true,\n\
    },\n\
    trackLinks: true,\n\
  }";
}
