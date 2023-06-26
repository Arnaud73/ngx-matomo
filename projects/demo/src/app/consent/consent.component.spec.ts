import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatomoModule } from 'ngx-matomo';

import { ConsentComponent } from './consent.component';

describe('ConsentComponent', () => {
  let component: ConsentComponent;
  let fixture: ComponentFixture<ConsentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatomoModule.forRoot({})],
      declarations: [ConsentComponent],
    });
    fixture = TestBed.createComponent(ConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
