import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ECommerceRoutingModule } from './e-commerce-routing.module';
import { OrderComponent } from './order/order.component';
import { ArticleComponent } from './article/article.component';
import { ARTICLES } from './article/articles';

export const CATALOG = new InjectionToken<string>('Catalog');

@NgModule({
  declarations: [OrderComponent, ArticleComponent],
  imports: [CommonModule, ECommerceRoutingModule],
  providers: [{ provide: CATALOG, useValue: ARTICLES }],
})
export class ECommerceModule {}
