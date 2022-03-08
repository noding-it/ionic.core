import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CustomLoaderController} from "../overlay/custom-loader.controller";

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  constructor(
    public loadingController: CustomLoaderController
  ) {
    this.isLoading.subscribe(async (loaderFlag) => {
      if (loaderFlag) {
        await this.present();
      } else {
        await this.dismiss();
      }
    })
  }


  public isLoading = new BehaviorSubject<boolean>(false);

  async present(duration = 0, htmlLoader?: string): Promise<void> {
    let templateLoader = htmlLoader || `
          <div class="custom-loading">
            <div class="background"></div>
            <div class="active-element"></div>
          </div>
        `;
    const loader = await this.loadingController.create({
      spinner: null,
      htmlAttributes: {
        innerHTML: templateLoader
      },
    });
    await loader.present();
  }

  async dismiss() {
    await this.loadingController.dismiss();
  }

}
