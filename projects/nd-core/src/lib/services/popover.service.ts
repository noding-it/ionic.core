import {Injectable} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class PopoverService {

    constructor(public popoverController: PopoverController) {
    }

    private _active = false;

    async present(ev: any, component: any, params?: any, css?: string, backdropDismiss = true) {
        const popover = await this.popoverController.create({
            component,
            event: ev,
            translucent: true,
            componentProps: params,
            cssClass: css,
            backdropDismiss,
        });

        await popover.present().then(() => this._active = true);

        return popover.onDidDismiss();
    }

    public dismiss(data) {
        this.popoverController.dismiss(data);
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

