import { MatomoTracker } from 'ngx-matomo';

import { Component, inject, OnInit } from '@angular/core';

import { Article } from '../article/article.model';
import { CATALOG } from '../e-commerce.module';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: [],
})
export class OrderComponent implements OnInit {
  private readonly matomoTracker = inject(MatomoTracker);
  readonly catalog = inject(CATALOG);

  public order: { id: string; items: Array<{ article: Article; quantity: number }> } | null = null;

  ngOnInit(): void {
    if (!this.order) {
      this.order = { id: '' + Math.floor(Math.random() * 10000), items: [] };
    }
  }

  addArticle(articleId: number): void {
    const item = this.order?.items.find((i) => i.article.id === articleId);
    if (!!item) {
      item.quantity += 1;
    } else {
      this.order?.items.push({
        article: this.catalog.find((a) => a.id === articleId) ?? { id: 0 },
        quantity: 1,
      });
    }
    this.matomoTracker.addEcommerceItem(
      '' + articleId,
      this.catalog.find((a) => a.id === articleId)?.name,
      this.catalog.find((a) => a.id === articleId)?.category,
      this.catalog.find((a) => a.id === articleId)?.price,
      1
    );
    this.matomoTracker.trackEcommerceCartUpdate(this.getGrandTotalPrice());
  }

  removeArticle(articleId: number): void {
    if (!!this.order) {
      const index = this.order.items.findIndex((i) => i.article.id === articleId);
      if (index >= 0) {
        if (this.order.items[index]?.quantity > 1) {
          this.order.items[index].quantity -= 1;
        } else {
          this.order.items.splice(index, 1);
        }
      }
    }
  }

  getGrandTotalPrice(): number {
    if (!!this.order) {
      return this.order.items.reduce(
        (acc, cur) => acc + cur.quantity * (cur.article.price ?? 0),
        0
      );
    } else {
      return 0;
    }
  }

  validateOrder(): void {
    if (!!this.order) {
      this.matomoTracker.trackEcommerceOrder(this.order.id, this.getGrandTotalPrice());
    }
  }
}
