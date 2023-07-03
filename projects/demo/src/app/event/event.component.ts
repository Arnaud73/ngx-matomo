import { MatomoTracker } from 'ngx-matomo';

import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: [],
})
export class EventComponent {
  private readonly matomoTracker = inject(MatomoTracker);

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
   * Handles the click on the 'Click Me' button.
   */
  onClick(): void {
    console.log('Button has been pressed!');
    this.matomoTracker.trackEvent('Category', 'Button pressed', 'tracking with code');
  }
}
