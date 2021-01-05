import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatomoModule, MatomoTracker } from 'ngx-matomo';

describe('Demo App', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MatomoTracker],
      imports: [
        RouterTestingModule,
        MatomoModule.forRoot({
          trackAppStarting: true,
          isConsentRequired: false,
          enableRouteTracking: false,
          enableLinkTracking: true,
          enableLinkTrackingValue: false,
          contentIds: [],
          trackers: [],
        }),
      ],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
