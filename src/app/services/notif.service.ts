import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  private notifier: NotifierService;

  constructor(notifier: NotifierService) {
    this.notifier = notifier;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}
