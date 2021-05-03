import { Component, OnInit } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: [],
})
export class ConsentComponent implements OnInit {
  /**
   * Creates an instance of ConsentComponent.
   *
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   * @param formBuilder Instance of FormBuilder provided by DI.
   */
  constructor(private readonly matomoTracker: MatomoTracker) {}

  /**
   * Angular OnInit lifecycle hook.
   */
  ngOnInit(): void {
    this.matomoTracker
      .hasCookies()
      .then((hasCookies: boolean) => console.log('Has Cookies:', hasCookies));
  }

  onGiveConsent(event: MouseEvent): void {
    this.matomoTracker.setConsentGiven();
    this.matomoTracker
      .hasCookies()
      .then((hasCookies: boolean) => console.log('Has Cookies:', hasCookies));
  }

  onRemoveConsent(event: MouseEvent): void {
    this.matomoTracker.forgetConsentGiven();
    this.matomoTracker
      .hasCookies()
      .then((hasCookies: boolean) => console.log('Has Cookies:', hasCookies));
  }
}
