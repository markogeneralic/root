import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private pathApi = this.config.setting['PathAPI'];

  constructor(protected config: AppConfig, protected httpClient: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.pathApi + 'product/getAll');
  }

  save(product: Product) {
    return this.httpClient.post(this.pathApi + 'product/insertOrUpdate', product);
  }

  delete(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.httpClient.post(this.pathApi + 'product/delete', {}, { params: params });
  }
}
