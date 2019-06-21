# ngx-Matomo 

Wrapper for Matomo (aka. Piwik) analytics tracker for applications based on Angular 5, 6, 7 & 8.

## Warning

This new release of ngx-Matomo has been rebuilt with Angular CLI v8. As a result, the produced library uses Angular Package Format (APF) v8. It has been tested with an Angular 6 application, but if your Angular 5, 6 or 7 application is running into trouble, please log an issue on GitHub.

## Installation

Use `npm` or `yarn` to add the module to your current project:  
```npm install --save ngx-matomo```

## Adding Matomo

You can add Matomo either via script tag or using the (recommended) MatomoInjector in your root component.

### (Recommended) Initialize Matomo via root component and MatomoInjector service

Import ```MatomoModule``` into your root ```NgModule```.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatomoModule } from 'ngx-matomo';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    MatomoModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Inject Matomo into your root component and call `init` function.

```ts
import { Component } from '@angular/core';
import { MatomoInjector } from 'ngx-matomo';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(
    private matomoInjector: MatomoInjector
  ) {
    // For example if you installed Matomo in the subdomain analytics.my-website.com
    this.matomoInjector.init('//analytics.my-website.com/');
  }
}
```

Once that's done you can import ```MatomoTracker``` into any component of your application.

```ts
// component
import { Component } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(
    private matomoTracker: MatomoTracker
  ) { }

  ngOnInit() {
    this.matomoTracker.setUserId('UserId');
    this.matomoTracker.setDocumentTitle('ngx-Matomo Test');
  }
}
```

### (alternative) Adding Matomo into your application via script tag.
*You can skip this part if you have initialized Matomo via Root component.*

Matomo provide this script when you set up a new website to be tracked.

Inject the code into your header to initialize Matomo in your application.  
Make sure to replace the $MATOMO_URL with your Matomo server url, and $IDSITE by the id of your website on Matomo. 
You can remove all the `_paq` methods in this script and set them up in your Angular 5+ application. 

```html
<!-- Matomo -->
<script type="text/javascript">
  var _paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//{$MATOMO_URL}/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', {$IDSITE}]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo Code -->
```

## Tracking events
For now tracking events and actions is manual and is not injected into the html. 

```html
<button (click)="whatHappensOnClick(1)"></button>
```

```ts
// component
import { Component } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app',
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

## Tips
You can add two websites on Matomo, one for production, and another one for dev environment. And use them like that: 

```ts
    this.matomoInjector.init(
      '//analytics.my-website.com/',
      environment.production ? 1 : 2
    );
```

## Matomo documentation
Matomo's [site](https://developer.matomo.org/guides/tracking-javascript-guide) has the detailed documentation on how to set up communication between Matomo and your application.

## Original Source
This module is lousily inspired from [Angular2Piwik](https://github.com/awronka/Angular2Piwik), which was also inspired from [Angulartics 2](https://github.com/angulartics/angulartics2).

## License

[MIT](LICENSE)
