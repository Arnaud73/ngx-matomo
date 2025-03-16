# ngx-Matomo

[![GitHub stars](https://img.shields.io/github/stars/Arnaud73/ngx-matomo.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/Arnaud73/ngx-matomo/)
![Build Status (GitHub)](https://github.com/Arnaud73/ngx-matomo/actions/workflows/ci.yml/badge.svg)
[![NPM version](https://img.shields.io/npm/v/ngx-matomo.svg)](https://www.npmjs.com/package/ngx-matomo)
[![Next NPM version](https://img.shields.io/npm/v/ngx-matomo/next.svg)](https://www.npmjs.com/package/ngx-matomo)
[![NPM bundle size](https://img.shields.io/bundlephobia/min/ngx-matomo)](https://bundlephobia.com/package/ngx-matomo)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b650cf6a9d3d4ab393af8d29d63fc8cc)](https://www.codacy.com/app/Arnaud73/ngx-matomo?utm_source=github.com&utm_medium=referral&utm_content=Arnaud73/ngx-matomo&utm_campaign=Badge_Grade)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Wrapper for Matomo (aka. Piwik) analytics tracker for Angular applications.

Choose the version corresponding to your Angular version:

| **Angular** | **ngx-matomo**                             |
| ----------- | ------------------------------------------ |
| 18          | 3.x                                        |
| 17          | 2.x - with limitations (no route tracking) |
| 16          | 2.x                                        |
| 14 and 15   | 1.x                                        |
| 13          | not available                              |
| 9 to 12     | 1.0.0-rc1                                  |
| 5 to 8      | 0.x                                        |

# Installation

Use `npm`, `yarn` or `pnpm` to add the module to your current project:

```shell session
npm install --save ngx-matomo
```

or

```shell session
yarn add ngx-matomo
```

or

```shell session
pnpm add ngx-matomo
```

## Using ngx-Matomo

### Getting started

**ngx-Matomo** lets you interact with Matomo. To add this functionality to your application, you need to update the `app.config.ts` file to use the **ngx-Matomo** providers function, `provideMatomoTracking`. You import this provider function from **ngx-matomo**.

From your code editor, open the `app.config.ts` file.

Add the following import statements:

```ts
import { provideMatomoTracking } from 'ngx-matomo';
```

Update the providers in the appConfig:

```ts
providers: [provideMatomoTracking(…)];
```

And then, add the required features, through feature functions:

- Tracker features • used to prepare your application for dealing with the Matomo tracker.
- Configuration feature • used to define the context in which is going to operate this library.
- Route Tracking feature • used to automate tracking of your route events from theAngular Router.
- Miscellaneous features • such as debug tracing…

For NgModule based applications, put the `provideMatomoTracking` in the providers list of the AppModule, or whichever module is passed to bootstrapModule in the application.

### Tracker features

**ngx-Matomo** provides you with several approaches for integrating with the Matomo tracker:

- Use a preloaded Matomo tracker that has been set up externally (such as through Google Tag Manager, Matomo Tag Manager, or other third-party tools)
- Inject the Matomo JavaScript script directly into the DOM using a static configuration
- Inject the Matomo JavaScript script directly into the DOM using an asynchronous configuration (where configuration details are received after the application has started)
- Use a dummy tracker for development and testing purposes

**ngx-Matomo** expects to interact with Matomo version 4 or later. If you plan to use the Route Tracking feature, please use Matomo 4.5 or later.

**ngx-Matomo** requires one tracker feature, and one only, to be defined.

#### Preloaded tracker

When the tracker will be initialized outside of your Angular application, add the `withPreloadedTracker` feature to your `provideMatomoTracking` providers function:

```ts
providers: [provideMatomoTracking(withPreloadedTracker(), …)];
```

Warning: it is advised not to have the preloaded tracker track the first page view, or some additional parameters you may wish to set, won't have any effect.

#### Locally defined tracker • Synchronous configuration

When you want your application to handle the injection of the Matomo tracker, with statically defined information regarding the Matomo JS script and Matomo trackers, add the `withTrackers` feature to your `provideMatomoTracking` providers function:

```ts
providers: [provideMatomoTracking(withTrackers(trackers), …)];
```

The `trackers` object contains the following elements:

| Option      | Type                                       | Description                                                                                                                                      |
| ----------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `scriptUrl` | `string`                                   | The URL of the Matomo JS script to be injected in the DOM.                                                                                       |
| `trackers`  | `{ trackerUrl: string; siteId: number }[]` | List of trackers towards which to send events. Must contain at least one tracker. The first one will be the main tracker (as Matomo defines it). |

Example:

```ts
providers: […,
  provideMatomoTracking(
    withTrackers({
      scriptUrl: 'https://cdn.matomo.cloud/ngx.matomo.cloud/matomo.js',
      trackers: [
        {
          trackerUrl: 'https://ngx.matomo.cloud/matomo.php',
          siteId: 1,
        },
      ],
    }),
    …
  ),
  …
];
```

#### Locally defined tracker • Asynchronous configuration

In many situations, your application won't know statically the required details for injecting the Matomo tracker, since, for example, it might receive its configuration during init from an external source. **ngx-Matomo** handles this situation nicely and enables you to provide this information asynchronously.

Depending on your situation, you have two solutions:

- Providing a configuration `Promise` to the `withTrackers` feature.
- Not providing the `withTrackers` feature with any configuration and handle the providing of the `MATOMO_TRACKERS_INTERNAL_CONFIGURATION` injection token with a trackers configuration. This solution will enable you to rely on other dependencies for retrieving the configuration.

Examples:

Promise base trackers configuration:

```ts
providers: [
  …,
  provideMatomoTracking(
    withTrackers(
      new Promise(function (resolve) {
        setTimeout(() => {
          fetch('/trackers.json')
            .then((response) => response.json())
            .then(resolve);
        }, 5000);
      }),
    ),
    …
  ),
  …
];
```

Manual definition of the `MATOMO_TRACKERS_INTERNAL_CONFIGURATION` injection token:

```ts
providers: [
  …,
  provideMatomoTracking(withTrackers(), …),
  {
    provide: MATOMO_TRACKERS_INTERNAL_CONFIGURATION,
    useFactory: (dependencies) => {
      /* Your logic*/
    },
    deps: [DEPENDENCIES]
  },
  …
];
```

#### Dummy tracker

When you need your code not to make any real Matomo request, add the `withDummyTracker` feature to your `provideMatomoTracking` providers function:

```ts
providers: [provideMatomoTracking(withDummyTracker(), …)];
```

### Configuration features

In order to specify common configuration options, add the `withConfig` feature to your `provideMatomoTracking` providers function:

```ts
providers: [provideMatomoTracking(…, withConfig(configuration), …)];
```

where `configuration`· is an object containing some of the following options:

| Option                              | Type                                           | Description                                                                                                                                                                                        |
| ----------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disableCrossDomainLinking`         | `boolean`, default: `false`                    | Currently inactive.                                                                                                                                                                                |
| `disableCookies`                    | `boolean`, default: `false`                    | Disables cookie usage.                                                                                                                                                                             |
| `secureCookie`                      | `boolean`, optional                            | Enables secure cookies.                                                                                                                                                                            |
| `cookieDomain`                      | `string`, optional                             | Defines the cookie domain.                                                                                                                                                                         |
| `cookiePath`                        | `string`, optional                             | Defines the cookie path.                                                                                                                                                                           |
| `cookieSameSite`                    | `'lax'` , `'strict'` or `'none'`, optional     | Defines policy for cookies used in cross domain linking                                                                                                                                            |
| `doNotUserSendBeacon`               | `boolean`, default: `false`                    | Prevents the use of `navigator.sendBeacon()`                                                                                                                                                       |
| `detectBrowserFeatures`             | `boolean`, default: `false`                    | Enables the detection of browser features (mainly, the screen resolution)                                                                                                                          |
| `enableDoNotTrack`                  | `boolean`, default: `false`                    | Respects browser's DNT option if set.                                                                                                                                                              |
| `consentRequirement`                | `'requireNone'`, `'cookie'` or `'tracking'`    | Defines the consent requirements: `'NONE'`: no consent is required, `'COOKIE'`: consent is required for cookies and tracking, `'TRACKING'`: consent is required for tracking, but not for cookies. |
| `trackJavaScriptErrors`             | `boolean`, default: `false`                    | Enables the tracking of JavaScript errors.                                                                                                                                                         |
| `localDomains`                      | `string[]`, optional                           | List of domains to handle as local.                                                                                                                                                                |
| `heartBeatTimer`                    | `number`, optional                             | Enables the heart beat timer.                                                                                                                                                                      |
| `customDimensions`                  | `{ index: number; value: string }[]`, optional | List of custom dimensions values to be set when the tracker will start.                                                                                                                            |
| `disableCampaignParametersTracking` | `boolean`, default: `false`                    | Disables the campaign parameters tracking.                                                                                                                                                         |

### Route Tracking feature

In a single page application, the browser won't request the server for the content of additional pages. It is up to you to track new pages once the user has initiated navigation. Although you can do it all by yourself, you may wish to take advantage of this service that will handle most of the situations for you.

In order to activate the Route Tracking feature, add the `withRouteTracking` feature to your `provideMatomoTracking` providers function:

```ts
providers: [provideMatomoTracking(…, withRouteTracking(routeTrackingConfiguration), …)];
```

where `routeTrackingConfiguration` is an object containing some of the following options:

| Option              | Type                                                                               | Description                                                                                                                               |
| ------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `linkTracking`      | One of `'none'`, `'leftClickOnly'` or `'leftMiddleRightClicks'`, default: `'none'` | For each new route, Installs link tracking on all applicable link elements. Links will react to left clicks, or left/middle/right clicks. |
| `clearIds`          | `boolean`, default: `false`                                                        | Removes Ids (numerical, UUID, GUID, MongoDB Id, ULID, CUID, nanoID) from the tracked URL.                                                 |
| `idRegExp`          | `RegExp`, optional                                                                 | When the default Id formats are not enough for you, you may provide with a specific RegExp for identifying your Ids.                      |
| `idReplacement`     | `string`, default value: `:id`                                                     | When `clearIds` is set, defines the string to replace Ids with.                                                                           |
| `clearMatrixParams` | `boolean`, default: `false`                                                        | Removes matrix parameters from the tracked URL.                                                                                           |
| `clearQueryParams`  | `boolean`, default: `false`                                                        | Removers query parameters from the tracked URL.                                                                                           |
| `clearHash`         | ` boolean`, default: `false`                                                            | Removers hash value from the tracked URL.                                                                                                 |

Additionally, you may want to add a `matomo` object to your defined `RouteData` (see [Angular Router Reference](https://angular.dev/guide/routing/router-reference)) in order to have options applying only to specific routes. Here are the options you may define in this object:

| Option     | Type                                   | Description                                                                                                                         |
| ---------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `tracking` | `'AUTO'` or `'OFF'`, default: `'AUTO'` | When set to `'OFF'`, the route won't be tracked.                                                                                    |
| `title`    | `string`, optional                     | By default, Matomo will get the title from `document.title`, use this option to overwrite it (useful for maintaining uniform texts) |
| `idRegExp` | `RegExp`, optional                     | Overwrites the Id RegExp for this route.                                                                                            |

### Miscellaneous features

#### Debug tracing

**ngx-Matomo** provides you with a debug tracing feature. In order to activate it, just add the following feature to your `provideMatomoTracking` providers function:

```ts
providers: [provideRouter(…, withDebugTracing(), …)];
```

### Tracking events

#### Page view tracking

Add `MatomoTracker` to your component and use the `trackPageView` method.

```ts
import { Component } from '@angular/core';

import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [ MatomoTracker ]
  template: '…',
})
export class MyComponent {
  private readonly matomoTracker = inject(MatomoTracker)

  ngOnInit() {
    this.matomoTracker.setUserId('UserId');
    this.matomoTracker.setDocumentTitle('ngxMatomo Test');
    this.matomoTracker.trackPageView();
  }
}
```

#### Event tracking

Add `MatomoTracker` to your component and use the `trackEvent` method.

```ts
import { inject, Component } from '@angular/core';

import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [ MatomoTracker ]
  templateUrl: '<button (click)="onClick($event)"></button>',
})
export class MyComponent {
  private readonly matomoTracker = inject(MatomoTracker)

  onClick(event: ClickEvent) {
    /*
     * Some logic…
     */
    this.matomoTracker.trackEvent('category', 'action', 'name', someVal);
  }
}
```

## Test driving ngx-Matomo

A demo application is available in order to get you quickly up to speed.

1. Clone the ngxMatomo repository: `git clone https://github.com/Arnaud73/ngx-matomo.git`
2. `cd` into the repository
3. Run the demo application: `npm run demo`

## Migrating from earlier versions

ngxMatomo 3 is a major evolution from previous versions. It has been wholly redesigned to match latest Angular (18+) guidelines.

### Migrating from versions 1.x and 2.x

Please proceed as:

- Remove use of `MatomoModule` imports and provide and set correct providers through dedicated functions.
- Decide if you want to take advantage of the newly added features (route tracking, consent management) and update your providers accordingly.

### Migrating from versions 0.x

Please proceed as:

- Remove any Matomo injection script in your `index.html` if you chose to inject the tracker this way.
- Remove any use of `MatomoInjector` in your code if you chose to inject the tracker this way.
- Remove use of `MatomoModule` imports and provide and set correct providers through dedicated functions.
- Decide if you want to take advantage of the newly added features (route tracking, consent management) and update your providers accordingly.

## Original Source

This module is inspired from [Angular2Piwik](https://github.com/awronka/Angular2Piwik), which was also inspired from [Angulartics 2](https://github.com/angulartics/angulartics2).

## License

This library is copyrighted under the [MIT](LICENSE) license. Feel free to fork your own version.

## See also

Matomo's [site](https://developer.matomo.org/) has the detailed documentation on how to use Matomo and integrate it in an application.
See also:

- [Single-Page Application Tracking](https://developer.matomo.org/guides/spa-tracking)
- [JavaScript Tracking Client User Guide](https://developer.matomo.org/guides/tracking-javascript-guide)
- [JavaScript Tracking Client API](https://developer.matomo.org/api-reference/tracking-javascript)
- [Tracking HTTP API](https://developer.matomo.org/api-reference/tracking-api)
