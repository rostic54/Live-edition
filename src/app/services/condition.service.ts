import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { StorageService } from './storageService.service';
import IStoredData = LiveEdit.IStoredData;

@Injectable({
  providedIn: 'root'
})
export class ConditionService {
  private storageKey = 'notify';
  public editableField: IStoredData;

  constructor(private storageMap: StorageService,
              private productService: ProductService) {
    this.watchStorageNotifications();
  }

  public checkFieldStatus(data): boolean {
    return this.editableField && (this.editableField.id === data.id) && this.editableField.type === data.type;
  }

  public getStoredData() {
    this.editableField = this.storageMap.getStorage(this.storageKey);
  }

  public updateProductValue(id: number, type: string, value: string): void {
    this.productService.updateProducts(id, value, type);
  }

  public watchStorageNotifications(): void {
    this.storageMap.changes.subscribe(
      (data) => {
        if (data) {
          this.updateProductValue(Number(data.id), data.type, data.value);
        }
        this.getStoredData();
      }
    );
  }

  public updateStoreValue(value: IStoredData): void {
    this.storageMap.store(this.storageKey, value);
  }

  public deleteFromStorage() {
    this.storageMap.clear(this.storageKey);
  }
}
