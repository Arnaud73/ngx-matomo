import { NgModule } from '@angular/core';
import { MatomoInjector } from './matomo-injector.service';
import { MatomoTracker } from './matomo-tracker.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [MatomoInjector, MatomoTracker]
})
export class MatomoModule {}
