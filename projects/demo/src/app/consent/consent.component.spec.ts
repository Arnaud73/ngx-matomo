import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatomoTracker } from 'ngx-matomo';
import { ConsentComponent } from './consent.component';

describe('ConsentComponent', () => {
  let component: ConsentComponent;
  let fixture: ComponentFixture<ConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MatomoTracker],
      declarations: [ConsentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
