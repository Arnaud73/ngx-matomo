import { Component } from '@angular/core';

import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: [],
})
export class EventComponent {
  public readonly eventTrackingCode =
    "this.matomoTracker.trackEvent('Category', 'Button pressed', 'tracking with code');";
  public readonly clickTrackingCode =
    '<button\n\
  matomoClickCategory="Category"\n\
  matomoClickAction="Button pressed"\n\
  matomoClickName="Tracking with directive"\n\
>\n\
  Click Me!\n\
</button>';

  /**
   * Creates an instance of EventComponent.
   *
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   */
  constructor(private readonly matomoTracker: MatomoTracker) {}

  /**
   * Handles the click on the 'Click Me' button.
   */
  onClick(): void {
    console.log('Button has been pressed!');
    this.matomoTracker.trackEvent('Welcome', 'Button pressed', 'cta');
  }
}
