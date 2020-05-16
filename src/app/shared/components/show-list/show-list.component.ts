import { Component, OnDestroy, OnInit } from '@angular/core';
import IProduct = LiveEdit.IProduct;
import { ProductService } from '../../../services/product.service';
import { ConditionService } from '../../../services/condition.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
  providers: [ConditionService]
})
export class ShowListComponent implements OnInit, OnDestroy {
  public products: IProduct[];
  public subscription = new Subscription();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.subscription.add(this.productService.productList$.subscribe(
      (products: IProduct[]) => {
        this.products = products;
      }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
