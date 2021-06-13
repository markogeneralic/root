import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private pathApi = this.config.setting['PathAPI'];

  constructor(protected config: AppConfig, protected httpClient: HttpClient) { }

  login(loginInfo: any): Observable<any> {
    return this.httpClient.post<any>(this.pathApi + 'user/login', loginInfo);
  }
}
