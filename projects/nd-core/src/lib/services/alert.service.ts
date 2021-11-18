import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController) { }

    async alert(title, subTitle, message) {
        const alert = await this.alertController.create({
            header: title,
            subHeader: subTitle,
            message,
            buttons: ['OK']
        });

        await alert.present();

        return alert.onDidDismiss();
    }

    async confirm(title, message) {
        const alert = await this.alertController.create({
            header: title,
            message,
            buttons: [
                {
                    text: 'NO',
                    role: 'KO',
                    cssClass: 'secondary',
                    handler: (blah) => { }
                }, {
                    text: 'SI',
                    role: 'OK',
                    handler: () => { }
                }
            ]
        });

        await alert.present();

        return alert.onDidDismiss();
    }

    dismiss(data) {
      this.alertController.dismiss(data);
    }
}
