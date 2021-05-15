import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GlobalEventsService } from 'src/app/events/global-events.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { AbstractDataMainComponent } from '../abstract/abstract-data-main/abstract-data-main.component';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnInit {

  cols = [
    {
      field: 'name',
      header: 'Product'
    },
    {
      field: 'note',
      header: 'Note'
    }
  ];

  filters = [
    {
      field: 'name',
      type: 'text'
    },
    {
      field: 'note',
      type: 'containsText'
    }
  ];

  products: Product[];
  selectedProduct: Product;
  editProduct: Product;

  constructor(protected productsService: ProductService, protected messageService: MessageService, protected globalEventsService: GlobalEventsService) { }

  ngOnInit(): void {
    this.selectedProduct = new Product();
    this.editProduct = new Product();
    this.productsService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  onOpenEdit() {
    this.editProduct = Object.assign({}, this.selectedProduct);
  }

  onSave() {
    if (AbstractDataMainComponent.stringIsFilled(this.editProduct.name)) {
      this.productsService.save(this.editProduct).subscribe(() => {
        this.globalEventsService.triggerShowDialog(false);
        this.refresh();
      });
    }
  }

  onRemove(product: Product) {
    this.productsService.delete(product.id).subscribe(() => {
      this.refresh();
    })
  }

  refresh() {
    this.productsService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  showToast(err: any) {
    this.messageService.add({key: 'br-toast', severity:'error', summary: 'Error', detail: err.error});
  }
}
