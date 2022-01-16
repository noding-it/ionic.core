import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;

  constructor(public loadingController: LoadingController) {
  }

  async present(duration = 2000) {
    this.isLoading = true;
    const response = await this.loadingController.create({
      spinner: null,
      duration,
      cssClass: 'custom-loading'
    })
    return response.present();

  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss(); // console.log('dismissed'));
  }
}
