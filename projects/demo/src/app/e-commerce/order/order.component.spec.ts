import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MATOMO_CONFIGURATION, MatomoTracker } from 'ngx-matomo';

import { ArticleComponent } from '../article/article.component';
import { ARTICLES } from '../article/articles';
import { OrderComponent } from './order.component';
import { CATALOG } from '../e-commerce.module';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: CATALOG, useValue: ARTICLES },
        {
          provide: MATOMO_CONFIGURATION,
          useValue: {
            trackers: [],
            requireConsent: false,
            enableLinkTracking: true,
            enableLinkTrackingValue: false,
            enableRouteTracking: false,
          },
        },
        MatomoTracker,
      ],
      declarations: [OrderComponent, ArticleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
