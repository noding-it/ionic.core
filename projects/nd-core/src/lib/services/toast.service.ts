import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
      public toast: ToastController
  ) { }

  private _systemButtons: any[] = [
      {
          side: 'end',
          icon: 'reload',
          text: 'Ricarica',
          handler: () => {
              window.location.reload();
          }
      },
      {
          side: 'end',
          icon: '',
          text: 'OK',
          handler: () => { }
      },
      {
          side: 'end',
          icon: 'web',
          text: 'Vai al sito',
          handler: () => { }
      }
  ];

  async present(message: string, duration: number = 5000) {
      const toast = await this.toast.create({
          message,
          duration
      });
      toast.present();
  }

    async notificationPresent(header: string, message: string, azione: number, url?: string, color: string = 'warning', position: string = 'top', duration: number = 5000): Promise<void> {
        const toast = await this.toast.create({
            header,
            message,
            position: 'top',
            color,
            keyboardClose: false,
            buttons: [
                azione === 3 ? {...this._systemButtons[azione - 1], handler: () => window.open(url, '_blank')} : {...this._systemButtons[azione - 1]}
            ]
        });
        return toast.present();
    }

}
