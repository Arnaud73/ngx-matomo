import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    data: { matomoTitle: 'eCommerce Order Page' },
  },
  {
    path: 'article/:id',
    component: ArticleComponent,
    data: { matomoTitle: 'eCommerce Article Page' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ECommerceRoutingModule {}
