import { Injectable, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';

import { isNonNull } from '../helpers';
import { MatomoConfiguration, MATOMO_CONFIGURATION } from './matomo-configuration';
import { MatomoTracker } from './matomo-tracker.service';

/**
 * Service for tracking route changes.
 *
 * @export
 */
@Injectable()
export class MatomoRouteTracker implements OnDestroy {
  /**
   * Previous route url of matomo route tracker.
   */
  private previousPageUrl?: string;
  /**
   * Subscription for managing route events.
   */
  private subscription?: Subscription;

  /**
   * Creates an instance of MatomoRouteTracker.
   *
   * @param configuration Matomo configuration provided by DI.
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   * @param router Instance of Router provided by DI.
   * @param activatedRoute Instance of ActivatedRoute provided by DI.
   */
  constructor(
    @Inject(MATOMO_CONFIGURATION) private readonly configuration: MatomoConfiguration,
    private readonly matomoTracker: MatomoTracker,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  /**
   * Starts tracking route changes.
   * Matomo DocumentTitle will be set with `data.motomoTitle` of your routes.
   *
   * This service shall not be used directly within an application.
   */
  startTracking(): void {
    this.subscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart || event instanceof NavigationEnd),
        map((event) => ({ timestamp: new Date().getTime(), event })),
        pairwise(),
        filter(([a, b]) => a.event instanceof NavigationStart && b.event instanceof NavigationEnd)
      )
      .subscribe({
        next: ([start, end]) => {
          let currentRoute = this.activatedRoute.root;
          while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
          }
          // Set referrer if it exists
          if (this.previousPageUrl) {
            this.matomoTracker.setReferrerUrl(this.previousPageUrl);
          }
          // Track current page
          if (!!currentRoute.snapshot.data['matomoTitle']) {
            this.matomoTracker.setDocumentTitle(currentRoute.snapshot.data['matomoTitle']);
          }
          this.matomoTracker.setCustomUrl(window.location.href);
          // Remove all previously assigned custom variables
          // (requires Matomo (formerly Piwik) 3.0.2+)
          this.matomoTracker.deleteCustomVariables('page');
          this.matomoTracker.setGenerationTimeMs(end.timestamp - start.timestamp);
          this.matomoTracker.trackPageView();
          // Set previous route URL
          this.previousPageUrl = window.location.href;

          // Make Matomo aware of newly added content
          this.configuration?.routeTracking?.contentIds
            ?.map(document.getElementById)
            ?.filter(isNonNull)
            ?.forEach((content) => {
              // TODO To be implemented when Media Analytics will be supported.
              // this.matomoTracker.scanForMedia(content);
              // TODO To be implemented when Form Analytics will be supported.
              // this.matomoTracker.scanForForms(content);
              this.matomoTracker.trackContentImpressionsWithinNode(content);
            });

          if (this.configuration.trackLinks === true) {
            this.matomoTracker.enableLinkTracking(this.configuration.trackLinkValue);
          }
        },
      });
  }

  /**
   * Stops tracking route changes.
   */
  stopTracking(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Angular OnDestroy lifecycle hook.
   */
  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
