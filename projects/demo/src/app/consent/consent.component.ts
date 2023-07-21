import { Component, OnInit, inject } from '@angular/core';

import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: [],
})
export class ConsentComponent implements OnInit {
  private readonly matomoTracker = inject(MatomoTracker);
  public hasCookies: boolean = false;

  public readonly giveConsentCode = 'this.matomoTracker.setConsentGiven();';
  public readonly removeConsentCode = 'this.matomoTracker.forgetConsentGiven();';
  public readonly hasCookiesCode = 'this.matomoTracker.hasCookies().then(console.log);';

  ngOnInit(): void {
    this.matomoTracker.hasCookies().then((it) => {
      this.hasCookies = it;
    });
  }

  onGiveConsent(event: MouseEvent): void {
    this.matomoTracker.setConsentGiven();
    this.matomoTracker.hasCookies().then((it) => {
      this.hasCookies = it;
    });
  }

  onRemoveConsent(event: MouseEvent): void {
    this.matomoTracker.forgetConsentGiven();
    this.matomoTracker.hasCookies().then((it) => {
      this.hasCookies = it;
    });
  }
}
