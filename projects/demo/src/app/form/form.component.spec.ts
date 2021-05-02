import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { MATOMO_CONFIGURATION, MatomoTracker } from 'ngx-matomo';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        FormBuilder,
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
      declarations: [FormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
