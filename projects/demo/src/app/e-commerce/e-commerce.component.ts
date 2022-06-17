import { Component, OnInit } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo';

interface Article {
  id: number;
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  review?: number;
}

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: [],
})
export class ECommerceComponent implements OnInit {
  readonly articles: Array<Article> = [
    {
      id: 201,
      name: 'Nulla',
      price: 207,
      description: 'You really want to know what Nulla is?',
      category: 'Food',
      review: 78,
    },
    {
      id: 202,
      name: 'Corporis',
      price: 271,
      description: 'You really want to know what Corporis is?',
      category: 'Clothing',
      review: 67,
    },
    {
      id: 203,
      name: 'Minus',
      price: 295,
      description: 'You really want to know what Minus is?',
      category: 'Food',
      review: 116,
    },
    {
      id: 204,
      name: 'Qui',
      price: 280,
      description: 'You really want to know what Qui is?',
      category: 'Food',
      review: 78,
    },
    {
      id: 206,
      name: 'Est',
      price: 296,
      description: 'You really want to know what Est is?',
      category: 'Clothing',
      review: 107,
    },
    {
      id: 208,
      name: 'Ratione',
      price: 104,
      description: 'You really want to know what Ratione is?',
      category: 'Cosmetic',
      review: 104,
    },
    {
      id: 209,
      name: 'Similique',
      price: 262,
      description: 'You really want to know what Similique is?',
      category: 'Clothing',
      review: 44,
    },
    {
      id: 210,
      name: 'Molestias',
      price: 145,
      description: 'You really want to know what Molestias is?',
      category: 'Food',
      review: 95,
    },
    {
      id: 211,
      name: 'Modi',
      price: 228,
      description: 'You really want to know what Modi is?',
      category: 'Cosmetic',
      review: 153,
    },
    {
      id: 212,
      name: 'Voluptatibus',
      price: 172,
      description: 'You really want to know what Voluptatibus is?',
      category: 'Food',
      review: 29,
    },
    {
      id: 213,
      name: 'Sapiente',
      price: 100,
      description: 'You really want to know what Sapiente is?',
      category: 'Cosmetic',
      review: 200,
    },
    {
      id: 214,
      name: 'Alias',
      price: 152,
      description: 'You really want to know what Alias is?',
      category: 'Clothing',
      review: 68,
    },
    {
      id: 215,
      name: 'Non',
      price: 189,
      description: 'You really want to know what Non is?',
      category: 'Food',
      review: 86,
    },
    {
      id: 216,
      name: 'Quaerat',
      price: 280,
      description: 'You really want to know what Quaerat is?',
      category: 'Food',
      review: 135,
    },
  ];

  public order: { id: string; items: Array<{ article: Article; quantity: number }> } | null = null;

  /**
   * Creates an instance of ECommerceComponent.
   *
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   */
  constructor(private readonly matomoTracker: MatomoTracker) {}

  /**
   * Angular OnInit lifecycle hook.
   */
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
        article: this.articles.find((a) => a.id === articleId) ?? { id: 0 },
        quantity: 1,
      });
    }
    this.matomoTracker.addEcommerceItem(
      '' + articleId,
      this.articles.find((a) => a.id === articleId)?.name,
      this.articles.find((a) => a.id === articleId)?.category,
      this.articles.find((a) => a.id === articleId)?.price,
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
