import { Component, OnInit, AfterViewInit } from '@angular/core';

import { MatomoTracker } from 'ngx-matomo';

/**
 * Main component of the demo application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  /**
   * Creates an instance of AppComponent.
   *
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   */
  constructor(private readonly matomoTracker: MatomoTracker) {}

  /**
   * Angular OnInit lifecycle hook.
   */
  ngOnInit(): void {}

  /**
   * Angular AfterViewInit lifecycle hook.
   */
  ngAfterViewInit(): void {
    this.matomoTracker.getMatomoUrl().then((url: string) => console.log('Matomo URL:', url));
  }
}
