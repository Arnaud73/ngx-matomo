import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, OnInit, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatomoTracker } from 'ngx-matomo';

import { Article } from '../article/article.model';
import { CATALOG } from '../e-commerce.tokens';

@Component({
  selector: 'demo-order',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrls: [],
})
export class OrderComponent implements OnInit {
  private readonly matomoTracker = inject(MatomoTracker);
  private readonly dialogElt = viewChild<ElementRef<HTMLDialogElement>>('confirmation');
  readonly catalog = inject(CATALOG);

  public order: { id: string; items: { article: Article; quantity: number }[] } | null = null;

  ngOnInit(): void {
    if (!this.order) this.order = createOrder();
  }

  addArticle(articleId: number): void {
    const item = this.order?.items.find((i) => i.article.id === articleId);
    if (item) item.quantity += 1;
    else
      this.order?.items.push({
        article: this.catalog.find((a) => a.id === articleId) ?? { id: 0 },
        quantity: 1,
      });

    this.matomoTracker.addEcommerceItem(
      '' + articleId,
      this.catalog.find((a) => a.id === articleId)?.name,
      this.catalog.find((a) => a.id === articleId)?.category,
      this.catalog.find((a) => a.id === articleId)?.price,
      1,
    );
    this.matomoTracker.trackEcommerceCartUpdate(this.getGrandTotalPrice());
  }

  removeArticle(articleId: number): void {
    if (this.order) {
      const index = this.order.items.findIndex((i) => i.article.id === articleId);
      if (index >= 0) {
        if (this.order.items[index]?.quantity > 1) {
          this.order.items[index].quantity -= 1;
        } else {
          this.order.items.splice(index, 1);
        }
        this.matomoTracker.trackEvent('eCommerce', 'RemoveItem', '' + articleId, 1);
      }
      this.matomoTracker.trackEvent('eCommerce', 'RemoveItem', '' + articleId);
    }
    this.matomoTracker.removeEcommerceItem('' + articleId);
    this.matomoTracker.trackEcommerceCartUpdate(this.getGrandTotalPrice());
  }

  getGrandTotalPrice(): number {
    if (this.order) {
      return this.order.items.reduce(
        (acc, cur) => acc + cur.quantity * (cur.article.price ?? 0),
        0,
      );
    } else {
      return 0;
    }
  }

  validateOrder(): void {
    if (this.order) {
      this.matomoTracker.trackEcommerceOrder(this.order.id, this.getGrandTotalPrice());
    }
    this.dialogElt()?.nativeElement.showModal();
  }

  clearOrder(): void {
    this.order = createOrder();
    this.matomoTracker.clearEcommerceCart();
  }

  closeDialog(): void {
    this.order = createOrder();
    this.dialogElt()?.nativeElement.close();
  }
}

const createOrder = () => ({ id: '' + Math.floor(Math.random() * 10000), items: [] });
