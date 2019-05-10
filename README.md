# ngx-matomo 

Wrapper for Matomo (aka. Piwik) analytics tracker for applications based on Angular 5, 6, 7 & 8.

## Install through source files

Download directly from github and place the src files in your Angular application. 

## npm install

```npm install --save ngx-matomo```

## Adding Matomo into to your Angular application

You can add Matomo either via script tag or using the MatomoInjector in your root component.

### Adding Matomo into your application via Script Tag.

To illustrate the set up, here's the code to inject into your header to initialize Matomo in your application. Matomo's [site](https://developer.matomo.org/guides/tracking-javascript-guide) has the detailed documentation on how to set up communication between Matomo and your application. 
Make sure you replace the MATOMO_URL with your Matomo server. You can remove all the _paq methods in this script and set them up in your Angular 5+ application. 

```html
<!-- Matomo -->
<script type="text/javascript">
  var _paq = _paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//{$MATOMO_URL}/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', {$IDSITE}]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo Code -->
```

### Initialize Matomo via Root Component 

To enable Matomo via your root component you can now inject the MatomoInjector in your root component.

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
    this.matomoInjector.init('YOUR_MATOMO_URL', YOUR_SITE_ID);
  }
}
```

## Include it in your application

Bootrapping this application is easy. Import ```MatomoModule``` into your root ```NgModule```.

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

Once that's done you can import ```MatomoTracker``` into any component in your application.

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


## Original Source

This module is lousily inspired from [Angular2Piwik](https://github.com/awronka/Angular2Piwik), which was also inspired from [Angulartics 2](https://github.com/angulartics/angulartics2).

## License

[MIT](LICENSE)
