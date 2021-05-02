import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MATOMO_CONFIGURATION, MatomoTracker } from 'ngx-matomo';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: MATOMO_CONFIGURATION,
          useValue: {
            trackers: [],
            trackAppStarting: true,
            requireConsent: false,
            enableLinkTracking: true,
            enableLinkTrackingValue: false,
            enableRouteTracking: false,
          },
        },
        MatomoTracker,
      ],
      declarations: [WelcomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
