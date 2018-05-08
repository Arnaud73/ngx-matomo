import { NgModule } from '@angular/core';

import { MatomoInjector } from './service/matomo-injector.service';
import { MatomoTracker } from './service/matomo-tracker.service';

@NgModule({
    providers: [MatomoInjector, MatomoTracker]
})
export class MatomoModule {}
