import { Injectable, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';

import { isNonNull } from '../helpers';
import { MATOMO_CONFIGURATION } from './matomo-configuration';
import { MatomoTracker } from './matomo-tracker.service';

/**
 * Service for tracking route changes.
 *
 * @export
 */
@Injectable()
export class MatomoRouteTracker implements OnDestroy {
  /**
   * Configuration provided by DI
   */
  private readonly configuration = inject(MATOMO_CONFIGURATION);

  /**
   * MatomoTracker provided by DI
   */
  private readonly matomoTracker = inject(MatomoTracker);

  /**
   * Router provided by DI
   */
  private readonly router = inject(Router);

  /**
   * Activated route provided by DI
   */
  private readonly activatedRoute = inject(ActivatedRoute);

  /**
   * Previous route url of matomo route tracker.
   */
  private previousPageUrl?: string;
  /**
   * Subscription for managing route events.
   */
  private subscription?: Subscription;

  /**
   * Starts tracking route changes.
   * Matomo DocumentTitle will be set with `data.matomoTitle` of your routes.
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
          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }
          // Set referrer if it exists
          if (this.previousPageUrl) {
            this.matomoTracker.setReferrerUrl(this.previousPageUrl);
          }
          // Track current page
          if (!!currentRoute.snapshot.data['matomoTitle'] || !!currentRoute.snapshot.title) {
            this.matomoTracker.setDocumentTitle(
              currentRoute.snapshot.data['matomoTitle'] ?? currentRoute.snapshot.title
            );
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
    if (!!this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  /**
   * Angular OnDestroy lifecycle hook.
   */
  ngOnDestroy(): void {
    this.stopTracking();
  }
}
