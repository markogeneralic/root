import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { Country } from 'src/app/models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private pathApi = this.config.setting['PathAPI'];

  constructor(protected config: AppConfig, protected httpClient: HttpClient) { }

  getAll(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.pathApi + 'country/getAll');
  }

  save(country: Country) {
    return this.httpClient.post(this.pathApi + 'country/insertOrUpdate', country);
  }

  delete(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.httpClient.post(this.pathApi + 'country/delete', {}, { params: params });
  }
}
