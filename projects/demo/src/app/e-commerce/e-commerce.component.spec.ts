import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatomoTracker } from 'ngx-matomo';
import { ECommerceComponent } from './e-commerce.component';

describe('ECommerceComponent', () => {
  let component: ECommerceComponent;
  let fixture: ComponentFixture<ECommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MatomoTracker],
      declarations: [ECommerceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
