import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class Helpers {
  private authenticationChanged = new Subject<boolean>();

  constructor() { }

  public isAuthenticated(): boolean {
    return !(window.localStorage['token'] === undefined || window.localStorage['token'] === null || window.localStorage['token'] === 'null' || window.localStorage['token'] === 'undefined' || window.localStorage['token'] === '');
  }

  public isAuthenticationChanged(): Observable<boolean> {
    return this.authenticationChanged.asObservable();
  }

  public setToken(token: any) {
    this.setStorageToken(token);
  }

  private setStorageToken(token: any): void {
    window.localStorage['token'] = token;
    this.authenticationChanged.next(this.isAuthenticated());
  }
}
