import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { StorageService } from './storageService.service';
import IStoredData = LiveEdit.IStoredData;

@Injectable({
  providedIn: 'root'
})
export class ConditionService {
  private storageKey = 'notify';
  public fieldsInProgress = new Map();

  constructor(private storageMap: StorageService,
              private productService: ProductService) {
    this.watchStorageNotifications();
  }

  public checkFieldStatus(data): boolean {
    return this.fieldsInProgress.get(String(data.id)) === data.type;
  }

  public updateProductValue(id: number, type: string, value: string): void {
    this.productService.updateProducts(id, value, type, );
  }

  public watchStorageNotifications(): void {
    this.storageMap.changes.subscribe(
      ({ status, id, type, value }: IStoredData) => {
        if (status) {
          this.fieldsInProgress.set(id, type);
        } else {
          this.updateProductValue(Number(id), type, value);
          this.fieldsInProgress.delete(id);
        }
      }
    );
  }

  public notify(value: IStoredData): void {
    this.storageMap.store(this.storageKey, value);
    this.storageMap.clear(this.storageKey);
  }
}
