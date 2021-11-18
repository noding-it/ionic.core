import { Injectable } from '@angular/core';
import {AnimationController, ModalController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
      public modalController: ModalController,
      public animationCtrl: AnimationController,
  ) { }

    private _active = false;

    async present(page , params, cssClass?: string, showBackdrop = true, backdropDismiss = true) {
        const enterAnimation = (baseEl: any) => {
            const backdropAnimation = this.animationCtrl.create()
                // tslint:disable-next-line:no-non-null-assertion
                .addElement(baseEl.querySelector('ion-backdrop')!)
                .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

            const wrapperAnimation = this.animationCtrl.create()
                // tslint:disable-next-line:no-non-null-assertion
                .addElement(baseEl.querySelector('.modal-wrapper')!)
                .keyframes([
                    { offset: 0, opacity: '0', transform: 'scale(0)' },
                    { offset: 1, opacity: '0.99', transform: 'scale(1)' }
                ]);

            return this.animationCtrl.create()
                .addElement(baseEl)
                .easing('ease-out')
                .duration(350)
                .addAnimation([backdropAnimation, wrapperAnimation]);
        };

        const leaveAnimation = (baseEl: any) => {
            return enterAnimation(baseEl).direction('reverse');
        };

        const modal = await this.modalController.create({
            component: page,
            componentProps: params,
            showBackdrop,
            backdropDismiss,
            cssClass,
            enterAnimation,
            leaveAnimation,
        });

        await modal.present().then(() => this._active = true);
        return modal.onDidDismiss();
    }

    public dismiss(data) {
        this.modalController.dismiss(data);
        this._active = false;
    }

    public isActive() {
        return this._active;
    }

    public dismissIfActive() {
        if (this._active) {
            this.dismiss(undefined);
        }
    }

}
