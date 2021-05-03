import { Component, OnInit } from '@angular/core';

import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: [],
})
export class WelcomeComponent implements OnInit {
  /**
   * Creates an instance of WelcomeComponent.
   *
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   */
  constructor(private readonly matomoTracker: MatomoTracker) {}

  /**
   * Angular OnInit lifecycle hook.
   */
  ngOnInit(): void {}
}
