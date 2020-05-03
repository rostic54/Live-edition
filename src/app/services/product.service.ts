import { Injectable } from '@angular/core';
import Product = LiveEdit.IProduct;
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import IProduct = LiveEdit.IProduct;

const productsList: Product[] = [
  {brand: 'Samsung', model: 'Galaxy Note 15', index: 1},
  {brand: 'Samsung', model: 'Galaxy S-20', index: 2},
  {brand: 'Samsung', model: 'Galaxy Z Flip', index: 3},
  {brand: 'Iphone', model: 'XI', index: 4},
  {brand: 'Iphone', model: 'X', index: 5},
  {brand: 'Iphone', model: 'SE', index: 6},
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _productsListSubject$ = new BehaviorSubject<Product[]>(null);
  public  productList$: Observable<Product[]> = this._productsListSubject$.asObservable().pipe(
    distinctUntilChanged());

  constructor() {
    this.getProducts();
  }

  // Here we call get method of API.service in real app.
  public getProducts() {
    this._productsListSubject$.next(productsList);
  }


  public updateProducts(id: number, value: string, type: string): void {
    productsList.forEach((product: IProduct) => {
      if (product.index === id) {
        product[type] = value;
      }
    })
  }
}
