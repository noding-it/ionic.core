import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  constructor(public loadingController: LoadingController) {
  }

  /**
   * Contains in-progress loading requests
   */
  public loadingMap: Map<string, boolean> = new Map<string, boolean>();

  async present(duration = 2000): Promise<void> {
    const loader = await this.loadingController.create({
      spinner: null,
      duration,
      cssClass: 'custom-loading',
    });
    await loader.present();
  }

  async dismiss() {
    return await this.loadingController.dismiss(); // console.log('dismissed'));
  }


  /**
   * Sets the loadingSub property value based on the following:
   * - If loading is true, add the provided url to the loadingMap with a true value, set loadingSub value to true
   * - If loading is false, remove the loadingMap entry and only when the map is empty will we set loadingSub to false
   * This pattern ensures if there are multiple requests awaiting completion, we don't set loading to false before
   * other requests have completed. At the moment, this function is only called from the @link{HttpRequestInterceptor}
   * param loading {boolean}
   * param url {string}
   */
  async setLoading(loading: boolean, url: string): Promise<void> {
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      await this.present();
    } else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      await this.dismiss();
    }
  }

}
