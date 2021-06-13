import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { Activity } from 'src/app/models/activity';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private pathApi = this.config.setting['PathAPI'];

  constructor(protected config: AppConfig, protected httpClient: HttpClient) { }

  getAll(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.pathApi + 'activity/getAll');
  }

  save(activity: Activity) {
    return this.httpClient.post(this.pathApi + 'activity/insertOrUpdate', activity);
  }

  delete(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.httpClient.post(this.pathApi + 'activity/delete', {}, { params: params });
  }
}
