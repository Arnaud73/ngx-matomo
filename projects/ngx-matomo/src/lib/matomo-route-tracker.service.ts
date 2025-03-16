import { DOCUMENT } from '@angular/common';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';

import {
  MATOMO_DEBUG_TRACING,
  MATOMO_ROUTE_TRACKING_INTERNAL_CONFIGURATION,
} from './matomo-configuration';
import { MatomoTracker } from './matomo-tracker.service';

const DefaultIdRegExp = new RegExp(
  [
    '\\d{8,}', // Numerical
    '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', // UUID / GUID
    '[a-f\\d]{24}', // ObjectId (MongoDB…)
    '[0-7][0-9A-HJKMNP-TV-Z]{25}', // ULID
    'c[a-z0-9]{24}', // CUID
    '[A-Za-z0-9_-]{21}', // NanoID
  ].join('|'),
  'g',
);

/**
 * Service for tracking route changes.
 *
 * @export
 */
@Injectable({ providedIn: 'root' })
export class MatomoRouteTracker implements OnDestroy {
  private previousRouteKey: string | null = null;
  private readonly routeTrackingConfiguration = inject(
    MATOMO_ROUTE_TRACKING_INTERNAL_CONFIGURATION,
  );
  private readonly debugTracing = inject(MATOMO_DEBUG_TRACING);
  private readonly matomoTracker = inject(MatomoTracker);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly document = inject(DOCUMENT);
  private subscription?: Subscription;

  /**
   * Starts tracking route changes.
   * Matomo DocumentTitle will be set with the `title` or `data.matomo.title` of your routes.
   *
   * This service shall not be used directly within an application.
   */
  startTracking(): void {
    if (this.debugTracing)
      console.debug('\x1B[1mngx-Matomo\x1B[m • 🚨 Start tracking route changes…');
    this.subscription = this.router.events
      .pipe(
        filter(
          (event: unknown): event is NavigationStart | NavigationEnd =>
            event instanceof NavigationStart || event instanceof NavigationEnd,
        ),
        map((event) => ({
          timestamp: new Date().getTime(),
          event,
        })),
        pairwise(),
        filter(([a, b]) => a.event instanceof NavigationStart && b.event instanceof NavigationEnd),
      )
      .subscribe({
        next: ([start, end]) => {
          if (this.debugTracing)
            console.groupCollapsed('\x1B[1mngx-Matomo\x1B[m • 🚧 New Route change sequence');
          if (this.debugTracing)
            console.debug('\x1B[1mngx-Matomo\x1B[m • 🔎 NavigationStart event', start.event);
          if (this.debugTracing)
            console.debug('\x1B[1mngx-Matomo\x1B[m • 🔎 NavigationEnd event', end.event);
          const locationUrl = new URL(this.document.location.href);

          // Check that the significant part of the location has changed before tracking anything
          const currentRouteKey = this.routeTrackingConfiguration.clearMatrixParams
            ? locationUrl.href.replace(/;[\w,%]+=[\w,%]+/g, '')
            : locationUrl.href + this.routeTrackingConfiguration.clearQueryParams
              ? ''
              : locationUrl.search + this.routeTrackingConfiguration.clearHash
                ? ''
                : locationUrl.hash;
          if (currentRouteKey === this.previousRouteKey) {
            return;
          }
          this.previousRouteKey = currentRouteKey;

          if (this.debugTracing)
            console.debug('\x1B[1mngx-Matomo\x1B[m • 🔎 Activated route', this.activatedRoute);
          let currentRoute = this.activatedRoute.snapshot.root;
          while (currentRoute.firstChild) {
            // if (this.debugTracing)
            //   console.debug('\x1B[1mngx-Matomo\x1B[m • 🔎 Candidate route snapshot', currentRoute);
            currentRoute = currentRoute.firstChild;
          }
          if (this.debugTracing)
            console.debug('\x1B[1mngx-Matomo\x1B[m • 🔎 Current route snapshot', currentRoute);

          // Check that the route is not marked as not to be tracked
          if (currentRoute.data['matomo']?.tracking === 'off') return;

          // Set referrer if appropriate
          if (start.event.id === 1) this.matomoTracker.setReferrerUrl(this.document.referrer);

          // Set custom URL for tracking
          const customUrl =
            (this.routeTrackingConfiguration.clearMatrixParams
              ? locationUrl.href.replace(/;[\w,%]+=[\w,%]+/g, '')
              : locationUrl.href) +
            (this.routeTrackingConfiguration.clearQueryParams ? '' : locationUrl.search) +
            (this.routeTrackingConfiguration.clearHash ? '' : locationUrl.hash);
          this.matomoTracker.setCustomUrl(
            this.routeTrackingConfiguration.clearIds
              ? customUrl.replace(
                  currentRoute.data['matomo']?.idRegExp instanceof RegExp
                    ? currentRoute.data['matomo']?.idRegExp
                    : this.routeTrackingConfiguration?.idRegExp instanceof RegExp
                      ? this.routeTrackingConfiguration?.idRegExp
                      : DefaultIdRegExp,
                  this.routeTrackingConfiguration.idReplacement!,
                )
              : customUrl,
          );

          // Remove all previously assigned custom variables
          this.matomoTracker.deleteCustomVariables('page');

          // Track page performance timing
          // TODO: Improve performance tracking
          this.matomoTracker.setPagePerformanceTiming(
            undefined,
            undefined,
            undefined,
            undefined,
            end.timestamp - start.timestamp,
            undefined,
          );

          // Track page view
          if (currentRoute.data['matomo']?.title)
            this.matomoTracker.trackPageView(currentRoute.data['matomo']?.title);
          else this.matomoTracker.trackPageView();

          if (this.routeTrackingConfiguration.linkTracking !== 'none')
            this.matomoTracker.enableLinkTracking(
              this.routeTrackingConfiguration.linkTracking === 'leftClickOnly' ? false : true,
            );

          if (this.debugTracing) console.groupEnd();
        },
      });
  }

  /**
   * Stops tracking route changes.
   */
  stopTracking(): void {
    if (this.subscription) {
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
