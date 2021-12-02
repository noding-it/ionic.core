import {Injectable} from '@angular/core';

enum NotificationPermissionEnum {
  GRANTED = 'granted',
  DEFAULT = 'default',
  DENIED = 'denied',
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
    this._supported = ('Notification' in window);
    if (this._supported) {
      this._permission = Notification.permission;
      if (this._permission === NotificationPermissionEnum.DEFAULT || this._permission === NotificationPermissionEnum.DENIED) {
        Notification.requestPermission().then(status => this._permission = status);
      }
    }
  }


  //
  // Private
  //
  private _supported: boolean;
  private _permission: string;

  //
  // Public
  //

  /**
   * Metodo per il "PUSH" della notifica
   * @param title
   * @param message
   * @param icon
   */
  public show(title: string, message: string, icon: string) {
    if (!this._supported || this._permission !== NotificationPermissionEnum.GRANTED) {
      alert(message);
    } else {
      new Notification(title, {
        body: message,
        icon // `assets/images/logo/xage_logo.png`
      });
    }
  }

}


