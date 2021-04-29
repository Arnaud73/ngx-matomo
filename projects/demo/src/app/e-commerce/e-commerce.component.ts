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
  styleUrls: ['./e-commerce.component.css'],
})
export class ECommerceComponent implements OnInit {
  readonly articles: Array<Article> = [
    {
      id: 201,
      name: 'Nulla',
      price: 207,
      description:
        'Culpa sed tenetur incidunt quia veniam sed mollitia exercitationem. ' +
        'Laboriosam reprehenderit laborum pariatur ea rem qui inventore. In asperiores dignissimos temporibus et. ' +
        'Beatae consequatur corrupti nam praesentium.',
      category: 'Food',
      review: 78,
    },
    {
      id: 202,
      name: 'Corporis',
      price: 271,
      description:
        'Nam incidunt blanditiis odio inventore. Nobis voluptatum quibusdam laboriosam a numquam. ' +
        'Delectus sequi ipsa possimus ratione repellendus quibusdam. Molestiae fuga laudantium natus dolorem.',
      category: 'Clothing',
      review: 67,
    },
    {
      id: 203,
      name: 'Minus',
      price: 295,
      description:
        'Quod reiciendis aspernatur ipsum cum debitis. Quisquam tempore doloremque quo ipsum ipsa tempora. ' +
        'Dignissimos qui ex ad facilis. Quo sequi recusandae eveniet autem ducimus nam.',
      review: 116,
    },
    {
      id: 204,
      name: 'Qui',
      price: 280,
      description:
        'Occaecati dolore assumenda facilis error quaerat. Rem harum alias cum eum quam corporis. Esse numquam vero facilis labore.',
      category: 'Food',
      review: 78,
    },
    {
      id: 206,
      name: 'Est',
      price: 296,
      description:
        'Aut consequatur fugit ut voluptates fugit numquam vero velit. ' +
        'Distinctio minima quo nesciunt maiores voluptatem dolorum. Doloribus quam nisi molestiae nostrum iure sint debitis.',
      category: 'Clothing',
      review: 107,
    },
    {
      id: 208,
      name: 'Ratione',
      price: 104,
      description:
        'Occaecati nam laudantium est quos. Fuga molestias facere consequatur sapiente cum reprehenderit quibusdam. ' +
        'Earum omnis ipsum numquam facilis perspiciatis architecto. Iste reiciendis minus distinctio corrupti eos. ' +
        'Excepturi ut sequi id blanditiis exercitationem.',
      category: 'Cosmetic',
      review: 104,
    },
    {
      id: 209,
      name: 'Similique',
      price: 262,
      description:
        'Autem blanditiis similique saepe excepturi at error. Fugit qui accusantium expedita. ' +
        'Illo similique suscipit sunt magni eos est.',
      category: 'Clothing',
      review: 44,
    },
    {
      id: 210,
      name: 'Molestias',
      price: 145,
      description:
        'Deserunt ad ducimus recusandae praesentium. Repudiandae officia aliquam quas mollitia. ' +
        'Voluptatum ipsam iure eos debitis asperiores iusto repudiandae occaecati. Neque itaque sit totam sunt aspernatur at placeat.',
      category: 'Food',
      review: 95,
    },
    {
      id: 211,
      name: 'Modi',
      price: 228,
      description:
        'Iure similique perferendis quia optio provident asperiores ad. Perferendis id voluptatibus impedit.' +
        'Rerum totam quam distinctio eligendi omnis id cumque voluptatem. Et qui odio atque voluptatibus consectetur vel aut. ' +
        'Qui voluptatem deleniti laboriosam nulla temporibus.',
      category: 'Cosmetic',
      review: 153,
    },
    {
      id: 212,
      name: 'Voluptatibus',
      price: 172,
      description:
        'Cum aperiam sapiente non magni sequi facere. Et nihil soluta illum ipsum fuga vero. ' +
        'Magnam nihil quasi illo laudantium pariatur dignissimos. Est officiis quidem fuga dolorem.',
      category: 'Food',
      review: 29,
    },
    {
      id: 213,
      name: 'Sapiente',
      price: 100,
      description:
        'Totam repudiandae assumenda facilis quod suscipit repellat delectus eligendi. ' +
        'Nihil repellendus officiis officia distinctio aperiam dolorem veritatis culpa. ' +
        'Ab natus doloremque alias dolores deleniti a accusamus.',
      category: 'Cosmetic',
      review: 200,
    },
    {
      id: 214,
      name: 'Alias',
      price: 152,
      description:
        'At non doloribus alias optio delectus sit. Aperiam officiis soluta molestias asperiores similique reiciendis pariatur. ' +
        'Ab dignissimos iure voluptates error temporibus. Velit ullam quod fugiat molestias nisi explicabo blanditiis.',
      category: 'Clothing',
      review: 68,
    },
    {
      id: 215,
      name: 'Non',
      price: 189,
      description:
        'Eligendi rem perspiciatis quas accusamus. Consequatur perferendis placeat qui deleniti amet commodi harum reprehenderit. ' +
        'At quibusdam harum numquam quo.',
      category: 'Food',
      review: 86,
    },
    {
      id: 216,
      name: 'Quaerat',
      price: 280,
      description:
        'Nisi eos aspernatur exercitationem eius architecto dignissimos. Nam recusandae repellat saepe hic.',
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
