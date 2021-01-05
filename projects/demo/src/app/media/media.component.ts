import { Component, OnInit } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

/**
 *
 */
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent implements OnInit {
  /**
   * Creates an instance of MediaComponent.
   *
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   */
  constructor(private readonly matomoTracker: MatomoTracker) {}

  /**
   * Angular OnInit lifecycle hook.
   */
  ngOnInit(): void {}

  onLike(): void {
    console.log('Like!');
    this.matomoTracker.trackEvent('Media', 'Button pressed', 'Like');
  }

  onShare(): void {
    console.log('Share!');
    this.matomoTracker.trackEvent('Media', 'Button pressed', 'Share');
  }
}
