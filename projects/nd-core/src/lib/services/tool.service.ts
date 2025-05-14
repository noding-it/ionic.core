import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs';
import * as FileSaver from 'file-saver';
import {Sweetalert2Service, ToolService, WindowService} from "@myvirtualab.angular/core";

@Injectable({
  providedIn: 'root'
})
export class IonicCoreToolService extends ToolService {

  constructor(
     public _platform: Platform,
     _sweetAlert: Sweetalert2Service,
     _windowService: WindowService,
  ) {
    super(_sweetAlert, _windowService)
  }



  public isIOS(): boolean {
    return this._platform.is('ios') || this._platform.is('ipad') || this._platform.is('iphone');
  }

  public isDesktop(): boolean {
    return this._platform.is('desktop');
  }

  public isTablet(): boolean {
    return this._platform.is('tablet') && !this._platform.is('desktop');
  }

  public isDesktopOrTablet(): boolean {
    return this._platform.is('desktop') || this._platform.is('tablet');
  }


}
