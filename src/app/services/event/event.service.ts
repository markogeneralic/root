import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { PharmaEvent } from 'src/app/models/pharmaEvent';
import { TimelineEvent } from 'src/app/models/timelineEvent';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  timelineMock = [
    {
      activity: 'Date for early advice',
      apr: [
        {
          country: 'FR'
        }
      ],
      may: [
        {
          country: 'DE',
          note: 'Note for DE'
        },
        {
          country: 'FR',
          note: 'Note for FR'
        }
      ]
    }
  ];

  private pathApi = this.config.setting['PathAPI'];

  constructor(protected config: AppConfig, protected httpClient: HttpClient) { }

  getAll(): Observable<PharmaEvent[]> {
    return this.httpClient.get<PharmaEvent[]>(this.pathApi + 'pharmaevent/getAll');
  }

  save(event: PharmaEvent) {
    return this.httpClient.post(this.pathApi + 'pharmaevent/insertOrUpdate', event);
  }

  delete(id: number) {
    const params = new HttpParams().set('id', '' + id);
    return this.httpClient.post(this.pathApi + 'pharmaevent/delete', {}, { params: params });
  }

  getTimeline(productId: number, arrCountryId: number[], year: number): Observable<TimelineEvent[]> {
    const body = {
      productId: productId,
      arrCountryId: arrCountryId,
      year: year
    }
    return this.httpClient.post<PharmaEvent[]>(this.pathApi + 'pharmaevent/getTimeline', body);
  }
}
