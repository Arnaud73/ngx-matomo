import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isDefined } from '../../../helpers';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { CATALOG } from '../e-commerce.module';
import { Article } from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: [],
})
export class ArticleComponent {
  public article$: Observable<Article>;

  constructor(
    private readonly route: ActivatedRoute,
    @Inject(CATALOG) readonly catalog: Array<Article>
  ) {
    this.article$ = this.route.params.pipe(
      map((params) => this.catalog.find((a) => a.id === +params['id'])),
      filter(isDefined)
    );
  }
}
