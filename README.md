# ngx-Matomo

[![GitHub stars](https://img.shields.io/github/stars/Arnaud73/ngx-matomo.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/Arnaud73/ngx-matomo/)
![Build Status (GitHub)](https://github.com/Arnaud73/ngx-matomo/actions/workflows/ci.yml/badge.svg)
[![Build Status (Travis)](https://travis-ci.com/Arnaud73/ngx-matomo.svg?branch=master)](https://travis-ci.com/Arnaud73/ngx-matomo)
[![NPM version](https://img.shields.io/npm/v/ngx-matomo.svg)](https://www.npmjs.com/package/ngx-matomo)
[![Next NPM version](https://img.shields.io/npm/v/ngx-matomo/next.svg)](https://www.npmjs.com/package/ngx-matomo)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b650cf6a9d3d4ab393af8d29d63fc8cc)](https://www.codacy.com/app/Arnaud73/ngx-matomo?utm_source=github.com&utm_medium=referral&utm_content=Arnaud73/ngx-matomo&utm_campaign=Badge_Grade)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Wrapper for Matomo (aka. Piwik) analytics tracker for Angular applications.

Choose the version corresponding to your Angular version:

| Angular | ngx-matomo    |
| ------- | ------------- |
| 14+     | 1.x           |
| 13      | not available |
| 9 to 12 | 1.0.0-rc1     |
| 5 to 8  | 0.x           |

# Installation

Use `npm` or `yarn` to add the module to your current project:

```shell session
npm install --save ngx-matomo
```

or

```shell session
yarn add ngx-matomo
```

## Using ngxMatomo

### Injecting the tracker

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

### Customizing tracking

Once that's done you can import `MatomoTracker` into any component of your application.

```ts
import { Component } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private matomoTracker: MatomoTracker) {}

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
  templateUrl: './myButton.html',
})
export class MyComponent {
  constructor(private matomoTracker: MatomoTracker) {}

  whatHappensOnClick(someVal) {
    /*
     * some code...
     */
    this.matomoTracker.trackEvent('category', 'action', 'name', someVal);
  }
}
```

## Test driving ngxMatomo

A demo application is available in order to get you quickly up to speed.

1. Clone the ngxMatomo repository: `git clone https://github.com/Arnaud73/ngx-matomo.git`
2. `cd` into the repository
3. Build the ngxMatomo library: `npm run build:ngx-matomo:prod`
4. Run the demo application: `npm run test`

## Migrating from earlier versions (0.x)

ngxMatomo 1.0 is a major evolution from previous versions. If you plan migrating from a previous release, follow the next steps:

- Remove any Matomo injection script in your `index.html` if you chose to inject the tracker this way.
- Remove any use of `MatomoInjector` in your code if you chose to inject the tracker this way.
- Import the MatomoModule with `MatomoModule.forRoot()` call and provide a MatomoConfiguration object so that the tracker is correctly injected into your application.
- Decide if you want to take advantage of the newly added features (route tracking, consent management) and update you configuration accordingly.

## Original Source

This module is inspired from [Angular2Piwik](https://github.com/awronka/Angular2Piwik), which was also inspired from [Angulartics 2](https://github.com/angulartics/angulartics2).

## License

[MIT](LICENSE)

## See also

Matomo's [site](https://developer.matomo.org/) has the detailed documentation on how to use Matomo and integrate it in an application.
See also:

- [Single-Page Application Tracking](https://developer.matomo.org/guides/spa-tracking)
- [JavaScript Tracking Client User Guide](https://developer.matomo.org/guides/tracking-javascript-guide)
- [JavaScript Tracking Client API](https://developer.matomo.org/api-reference/tracking-javascript)
- [Tracking HTTP API](https://developer.matomo.org/api-reference/tracking-api)
