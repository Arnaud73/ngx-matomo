import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { filter, map } from 'rxjs/operators';

import { isDefined } from '../../../helpers';
import { CATALOG } from '../e-commerce.module';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: [],
})
export class ArticleComponent {
  private readonly catalog = inject(CATALOG);
  public readonly article$ = inject(ActivatedRoute).params.pipe(
    map((params) => this.catalog.find((a) => a.id === +params['id'])),
    filter(isDefined)
  );
}
