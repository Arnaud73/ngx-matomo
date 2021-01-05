import { Component, OnInit } from '@angular/core';

import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  /**
   * Creates an instance of EventComponent.
   *
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   */
  constructor(private readonly matomoTracker: MatomoTracker) {}

  /**
   * Angular OnInit lifecycle hook.
   */
  ngOnInit(): void {}

  /**
   * Handles the click on the 'Click Me' button.
   */
  onClick(): void {
    console.log('Click!');
    this.matomoTracker.trackEvent('Welcome', 'Button pressed', 'cta');
  }
}
