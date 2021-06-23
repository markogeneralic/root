import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventsService {
  showDialog: EventEmitter<boolean> = new EventEmitter();
  selectProduct: EventEmitter<Product> = new EventEmitter();
  requestProduct: EventEmitter<void> = new EventEmitter();
  filterTable: EventEmitter<any> = new EventEmitter();

  constructor() { }

  triggerShowDialog(show: boolean) {
    this.showDialog.emit(show);
  }

  triggerSelectProduct(product: Product) {
    this.selectProduct.emit(product);
  }

  triggerRequestProduct() {
    this.requestProduct.emit();
  }

  triggerFilterTable(column: string, value: string, type = 'text') {
    this.filterTable.emit({column: column, value: value, type: type});
  }
}
