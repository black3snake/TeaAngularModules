import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription, takeUntil, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {SearchService} from "../../../shared/services/search.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products: ProductType[] = [];
  loading: boolean = false;
  currentQuery = '';

  private subscribption: Subscription | null = null;
  private search1: Subscription | null = null;
  private search2: Subscription | null = null;
  private search3: Subscription | null = null;
  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
              private searchService: SearchService, private router: Router) {
  }

  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   if (params['search']) {
    //     this.paramsSearch = params['search'];
    //     console.log(params['search']);
    //     this.searchProducts(this.paramsSearch);
    //   } else {
    //     this.loadingProducts();
    //   }
    // })

    // Подписываемся на изменения результатов
    this.search1 = this.searchService.searchResults$
      .subscribe(results => {
        this.products = results;
        this.loading = false;
      });

    // Подписываемся на изменения запроса
    this.search2 = this.searchService.currentQuery$
      .subscribe(query => {
        this.currentQuery = query;
      });

    // Обрабатываем прямой переход по URL
    this.search3 = this.activatedRoute.queryParams
      .subscribe(params => {
        const query = params['search'];
        if (query) {
          this.loading = true;
          this.searchService.searching(query).subscribe();
        } else {
          this.loadingProducts();
        }
      });

  }



  searchProducts(searchTerm: string) {
    // Реализация загрузки продуктов
    console.log('Ищем продукты по запросу:', searchTerm);
    this.searchService.searching(searchTerm)
      .pipe(
        tap(() => {
          this.loading = false;
          console.log('Запускаем поиск')
        })
      )
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error('Ошибка запроса:', err);
        }
      })
  }

  loadingProducts() {
    this.loading = true;
    this.subscribption = this.productService.getProducts()
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.products = data
        },
        error: (error: string) => {
          console.log('Error!!!, ', error)
          this.router.navigate(['/']);
        }
      })
  }

  ngOnDestroy(): void {
    this.subscribption?.unsubscribe();
    this.search1?.unsubscribe();
    this.search2?.unsubscribe();
    this.search3?.unsubscribe();

    // this.destroy$.next();
    // this.destroy$.complete();
  }
}
