import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatomoTracker, MatomoInjector } from 'ngx-matomo';

/**
 * Main component of the demo application
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  /**
   * Creates an instance of AppComponent.
   *
   * @param matomoInjector
   * @param matomoTracker
   * @memberof AppComponent
   */
  constructor(private matomoInjector: MatomoInjector, private matomoTracker: MatomoTracker) {
    this.matomoInjector.init(
      'http://ngx.matomo.cloud/',
      1,
      '//cdn.matomo.cloud/ngx.matomo.cloud/matomo.js'
    );
  }

  /**
   * OnInit lifecycle hook
   *
   * @memberof AppComponent
   */
  ngOnInit() {
    this.matomoTracker.setUserId('UserId');
    this.matomoTracker.setDocumentTitle('ngx-Matomo Test');
  }

  /**
   * AfterViewInit lifecycle hook
   *
   * @memberof AppComponent
   */
  ngAfterViewInit() {
    this.matomoTracker.trackPageView('It Works!');
    this.matomoTracker.trackEvent('category', 'action', 'name', 1);

    this.matomoTracker.getUserId().then((userId: string) => console.log('User ID:', userId));
    this.matomoTracker
      .getVisitorId()
      .then((visitorId: string) => console.log('Visitor ID:', visitorId));
    this.matomoTracker
      .getVisitorInfo()
      .then((visitorInfo: string[]) => console.log('Visitor Info:', visitorInfo));
    this.matomoTracker
      .hasCookies()
      .then((hasCookies: boolean) => console.log('Has Cookies:', hasCookies));
  }
}
