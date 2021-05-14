import { Component } from '@angular/core';

import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: [],
})
export class WelcomeComponent {
  /**
   * Creates an instance of WelcomeComponent.
   *
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   */
  constructor(private readonly matomoTracker: MatomoTracker) {}
}
