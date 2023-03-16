import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {catchError, EMPTY, filter, map, Observable, of} from 'rxjs';
import {ProductCategory} from '../product-categories/product-category';

import {Product} from './product';
import {ProductService} from './product.service';
import {ProductCategoryService} from "../product-categories/product-category.service";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  selectedCategoryId = 1;


  products$ = this.productService.productsWithCategory$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  productSimpleFilter$ = this.productService.productsWithCategory$
    .pipe(
      map(products =>
        products.filter( product =>
        this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true)
      )
    );

  constructor(private productService: ProductService,
              private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.selectedCategoryId = +categoryId;
  }
}
