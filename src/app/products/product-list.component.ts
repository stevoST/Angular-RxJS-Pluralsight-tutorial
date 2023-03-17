import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {BehaviorSubject, catchError, combineLatest, EMPTY, filter, map, Observable, of, startWith, Subject} from 'rxjs';
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

  // another approach to set initial value

  // private categorySelectedSubject = new Subject<Number>();
  private categorySelectedSubject = new BehaviorSubject<Number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();


  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$
      .pipe(
        // another approach to set initial value
        // startWith(0)
      )
  ])
    .pipe(
      map(( [products, selectedCategoryId]) =>
        products.filter(product =>
          selectedCategoryId ? product.categoryId === selectedCategoryId : true
    )),
  catchError( err => {
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

  constructor(private productService: ProductService,
              private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
    // this.selectedCategoryId = +categoryId;
    // console.log(categoryId)
  }
}
