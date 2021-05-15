import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalEventsService {
  showDialog: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  triggerShowDialog(show: boolean) {
    this.showDialog.emit(show);
  }
}
