import { AfterViewInit, Component, inject } from '@angular/core';

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
  private readonly matomoTracker = inject(MatomoTracker);

  ngAfterViewInit(): void {
    this.matomoTracker.getMatomoUrl().then((url: string) => console.log('Matomo URL:', url));
  }
}
