# ngx-Matomo 

[![Build Status](https://travis-ci.com/Arnaud73/ngx-matomo.svg?branch=master)](https://travis-ci.com/Arnaud73/ngx-matomo)
[![NPM version](https://img.shields.io/npm/v/ngx-matomo.svg)](https://www.npmjs.com/package/ngx-matomo)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b650cf6a9d3d4ab393af8d29d63fc8cc)](https://www.codacy.com/app/Arnaud73/ngx-matomo?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arnaud73/ngx-matomo&amp;utm_campaign=Badge_Grade)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![dependencies Status](https://david-dm.org/Arnaud73/ngx-matomo/status.svg)](https://david-dm.org/Arnaud73/ngx-matomo)
[![devDependencies Status](https://david-dm.org/Arnaud73/ngx-matomo/dev-status.svg)](https://david-dm.org/Arnaud73/ngx-matomo?type=dev)
[![peerDependencies Status](https://david-dm.org/Arnaud73/ngx-matomo/peer-status.svg)](https://david-dm.org/Arnaud73/ngx-matomo?type=peer)

Wrapper for Matomo (aka. Piwik) analytics tracker for applications based on Angular 9, 10, 11 or 12.

If your application is based on Angular 5, 6, 7 or 8, please consider using the latest 0.x version of this library instead.

## Installation

Use `npm` or `yarn` to add the module to your current project:

```shell session
npm install --save ngx-matomo
```

or

```shell session
yarn add ngx-matomo
```

## Using ngxMatomo

### Inject the tracker

In order to add Matomo capabilities to your application, you need to import `MatomoModule` into your root `NgModule`.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatomoModule } from 'ngx-matomo';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    ...
    MatomoModule.forRoot({
      scriptUrl: '//matomo.example.com/matomo.js',
      trackers: [
        {
          trackerUrl: 'http://matomo.example.com/matomo.php',
          siteId: 1
        }
      ],
      routeTracking: {
        enable: true
      }
    }),
    ...
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

If you are using an old version of Matomo (3.x or less), please add `scriptVersion` with the version number (2, 3, 4…) to the configuration object passed the the `MatomoModule.forRoot()` function. This will activate some features present in Matomo 3 that were deprecated in Matomo 4.

### Customize tracking

Once that's done you can import `MatomoTracker` into any component of your application.

```ts
import { Component } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(
    private matomoTracker: MatomoTracker
  ) { }

  ngOnInit() {
    this.matomoTracker.setUserId('UserId');
    this.matomoTracker.setDocumentTitle('ngxMatomo Test');
  }
}
```

Then, let's find an action you would like to track:

```html
<button (click)="whatHappensOnClick($event)"></button>
```

Just add the MatomoTracker to your component and use the `trackEvent` function.

```ts
import { Component } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-my',
  templateUrl: './myButton.html'
})
export class MyComponent {
  constructor(
    private matomoTracker: MatomoTracker
  ) { }

  whatHappensOnClick(someVal){
    /*
     * some code...
     */
    this.matomoTracker.trackEvent('category', 'action', 'name', someVal);
  }
}
```

## Migration from earlier version (0.x)

ngxMatomo 1.0 is a major evolution from previous versions. If you plan migrating from a previous release, follow the next steps:
-   Remove any Matomo injection script in your `index.html` if you chose to inject the tracker this way.
-   Remove any use of `MatomoInjector` in your code if you chose to inject the tracker this way.
-   Import the MatomoModule with `MatomoModule.forRoot()` call and provide a MatomoConfiguration object so that the tracker is correctly injected into your application.
-   Decide if you want to take advantage of the newly added features (route tracking, consent management) and update you configuration accordingly.

Also, this new release of ngx-Matomo has been rebuilt with Angular CLI v9. As a result, the produced library uses Angular Package Format (APF) v9. As a result, compatibity with previous versions of Angular is not guaranteed.

## Original Source

This module is inspired from [Angular2Piwik](https://github.com/awronka/Angular2Piwik), which was also inspired from [Angulartics 2](https://github.com/angulartics/angulartics2).

## License

[MIT](LICENSE)

## See also

Matomo's [site](https://developer.matomo.org/) has the detailed documentation on how to use Matomo and integrate it in an application.
See also:
-   [Single-Page Application Tracking](https://developer.matomo.org/guides/spa-tracking)
-   [JavaScript Tracking Client User Guide](https://developer.matomo.org/guides/tracking-javascript-guide)
-   [JavaScript Tracking Client API](https://developer.matomo.org/api-reference/tracking-javascript)
-   [Tracking HTTP API](https://developer.matomo.org/api-reference/tracking-api)
