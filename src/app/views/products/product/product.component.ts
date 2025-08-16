import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  private subscribption: Subscription | null = null;
  product: ProductType;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router ) {
    this.product = {
      id: 0,
      image: '',
      imageAlt: '',
      title: '',
      price: 0,
      description: '',
    }
  }

  ngOnInit(): void {
    this.subscribption = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.productService.getProduct(+params['id'])
          .subscribe({
            next: (data) => {
              this.product = data;
            },
            error: (error: string) => {
              console.log('Error!!! in product, ', error)
              this.router.navigate(['/']);
            }
          })
      }
    })
  }

  ngOnDestroy(): void {
  }
}
