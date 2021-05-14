import { Component, AfterViewInit } from '@angular/core';

import { MatomoTracker } from 'ngx-matomo';

/**
 * Main component of the demo application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements AfterViewInit {
  /**
   * Creates an instance of AppComponent.
   *
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   */
  constructor(private readonly matomoTracker: MatomoTracker) {}

  /**
   * Angular AfterViewInit lifecycle hook.
   */
  ngAfterViewInit(): void {
    this.matomoTracker.getMatomoUrl().then((url: string) => console.log('Matomo URL:', url));
  }
}
