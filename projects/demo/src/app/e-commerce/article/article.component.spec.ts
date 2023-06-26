import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { CATALOG } from '../e-commerce.module';
import { ARTICLES } from './articles';
import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let router: Router;
  let route: ActivatedRoute;
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CATALOG, useValue: ARTICLES }],
      declarations: [ArticleComponent],
      imports: [RouterTestingModule.withRoutes([])],
    });
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
