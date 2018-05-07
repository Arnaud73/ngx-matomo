import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatomoTracker, MatomoInjector } from 'ngx-matomo';

@Component({
    selector: 'demo-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

    /**
     * Creates an instance of AppComponent.
     *
     * @param matomoInjector
     * @param matomoTracker
     * @memberof AppComponent
     */
    constructor(
        private matomoInjector: MatomoInjector,
        private matomoTracker: MatomoTracker
    ) {
        this.matomoInjector.init('http://localhost:44444/', 1);
    }

    ngOnInit() {
        this.matomoTracker.setUserId('UserId');
        this.matomoTracker.setDocumentTitle('ngx-Matomo Test');
    }

    ngAfterViewInit() {
        this.matomoTracker.trackPageView('It Works!');
        this.matomoTracker.trackEvent('category', 'action', 'name', 1);
    }

}
