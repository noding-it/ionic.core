import {Injectable} from '@angular/core';
import {AnimationController, ToastController} from '@ionic/angular';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private _toast: ToastController,
    private _animationController: AnimationController,
    private _router: Router,
  ) {
  }

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
      handler: () => {
      }
    },
    {
      side: 'end',
      icon: 'web',
      text: 'Vai al sito',
      handler: () => {
      }
    }
  ];

  async present(message: string, duration: number = 5000) {
    const toast = await this._toast.create({
      message,
      duration
    });
    toast.present();
  }

  async presentWithAnimation(message: string, color: string = 'success', position: string = 'bottom', duration: number = 5000, routes?: string, cssClass?: string) {

    const enterAnimation = (baseEl) => {
      const animation = this._animationController.create()
        // tslint:disable-next-line:no-non-null-assertion
        .addElement(baseEl.querySelector('.toast-wrapper')!)
        .beforeStyles({bottom: '1%'})
        .keyframes([
          {offset: 0, opacity: '0', transform: 'scale(0,0) translateY(100%)'},
          {offset: 0.5, opacity: '0.9', transform: 'scale(0.3,0.3) translateY(20%)'},
          {offset: 0.8, opacity: '1', transform: 'scale(1.2,1.2) translateY(-3%)'},
          {offset: 0.9, opacity: '1', transform: 'scale(0.9,0.9) translateY(1%)'},
          {offset: 1, opacity: '1', transform: 'scale(1,1) translateY(0)'}]);

      return this._animationController.create()
        .duration(400)
        .addAnimation(animation);
    };

    const leaveAnimation = (baseEl) => {
      const animation = this._animationController.create()
        // tslint:disable-next-line:no-non-null-assertion
        .addElement(baseEl.querySelector('.toast-wrapper')!)
        .fromTo('opacity', '1', '0');

      return this._animationController.create()
        .duration(2000)
        .addAnimation(animation);
    };

    const toast = await this._toast.create({
      duration,
//            animated: true,
      color,
      position: 'bottom',
      enterAnimation,
      leaveAnimation,
      buttons: [
        {
          side: 'start',
          text: `${message}`,
          cssClass: `${(cssClass) ? cssClass : ''}`,
          handler: () => {
            if (routes) {
              this._router.navigate([`${routes}`]);
            }
          },
        }]
    });
    await toast.present();
  }

  async notificationPresent(header: string, message: string, azione: number, url ?: string, color: string = 'warning', position: string = 'top', duration: number = 5000): Promise<void> {
    const toast = await this._toast.create({
      header,
      message,
      position: 'top',
      color,
      keyboardClose: false,
      buttons: [
        azione === 3 ? {
          ...this._systemButtons[azione - 1],
          handler: () => window.open(url, '_blank')
        } : {...this._systemButtons[azione - 1]}
      ]
    });
    return toast.present();
  }
}


