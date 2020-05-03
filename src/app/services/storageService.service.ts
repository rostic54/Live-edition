import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import IStoredData = LiveEdit.IStoredData;

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {
  private onSubject = new Subject<IStoredData>();
  public changes = this.onSubject.asObservable().pipe(
    distinctUntilChanged());

  constructor() {
    this.start();
  }

  ngOnDestroy() {
    this.stop();
  }

  public getStorage(key: string): IStoredData {
    return JSON.parse(localStorage.getItem(key));
  }

  public store(key: string, data: IStoredData): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubject.next(data);
  }

  public clear(key): void {
    localStorage.removeItem(key);
    this.onSubject.next({ id: key, value: null });
  }


  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent): void {
    if (event.storageArea === localStorage) {
      let value;
      try {
        value = JSON.parse(event.newValue);
      } catch (e) {
        value = event.newValue;
      }
      this.onSubject.next(value);
    }
  }

  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }
}
