import {LoadingController, LoadingOptions} from "@ionic/angular";

export class CustomLoaderController extends LoadingController {
  constructor() {
    super();
  }

  create(opts?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    if (!document.querySelector('ion-loading')) {
      return super.create(opts);
    }
  }

}
