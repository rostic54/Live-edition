import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ConditionService } from '../../../services/condition.service';
import { ProductProperty } from '../../enums/productProperty';
import { StorageService } from '../../../services/storageService.service';
import IProduct = LiveEdit.IProduct;
import IFieldEmitter = LiveEdit.IFieldEmitter;
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  providers: [ConditionService, StorageService]
})
export class EditPageComponent implements OnInit, OnDestroy {
  public property = {
    brand: ProductProperty.BRAND,
    model: ProductProperty.MODEL
  };
  public products: IProduct[];
  private destroy$: Subject<boolean> = new Subject();

  constructor(private productsService: ProductService,
              private conditionService: ConditionService) {
  }

  ngOnInit(): void {
    this._getProducts();
  }

  public setOrDeleteLiveCondition(data: IFieldEmitter, index: number, property: ProductProperty): void {
    this.conditionService.notify({ id: String(index), type: property, ...data });
  }

  public getFieldStatus(id: number, type: ProductProperty): boolean {
    return this.conditionService.checkFieldStatus({ id, type });
  }


  private _getProducts(): void {
    this.productsService.productList$.pipe(takeUntil(this.destroy$)).subscribe(
      (products: IProduct[]) => {
        this.products = products;
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
