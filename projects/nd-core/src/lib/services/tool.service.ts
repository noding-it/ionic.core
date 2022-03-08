import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(
    private _platform: Platform,
  ) {
    this._getLocalIPAddress().subscribe(address => {
      this.localIPAddress = address;
    });
  }

  public localIPAddress = '';

  public escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  public replaceAll(str, term, replacement) {
    return str.replace(new RegExp(this.escapeRegExp(term), 'g'), replacement);
  }

  public shuffleArray(arr) {
    return arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  public sortByKey(array, key, order) {
    if (order === 'asc' || order === '') {
      return array.sort((a, b) => {
        const x = a[key];
        const y = b[key];
        return ((x.toLowerCase() < y.toLowerCase()) ? -1 : ((x.toLowerCase() > y.toLowerCase()) ? 0 : 1));
      });
    } else {
      return array.sort((a, b) => {
        const x = a[key];
        const y = b[key];
        return ((x.toLowerCase() > y.toLowerCase()) ? -1 : ((x.toLowerCase() < y.toLowerCase()) ? 0 : 1));
      });
    }
  }

  public setFocus(selector: string) {
    (Array.from(document.querySelectorAll(`${selector}`))?.reverse()[0] as HTMLInputElement)?.focus();
  }

  public normalizeNumberString(str: string) {
    str = this.isnull(str);
    return str.toString().replace('"', '').replace('"', '');
  }

  public makeRandomID(length): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public focusInput(input) {
    setTimeout(() => {
      input.setFocus();
    }, 150);
  }

  public isnull(value, replace: any = '') {
    if (value === null || value === undefined || value === 'null') {
      if (replace !== null && replace !== undefined) {
        return replace;
      }
      return '';
    }
    return value;
  }

  public isNullOrEmpty(str: string) {
    try {
      if (str === undefined) {
        return '';
      }
      return (!str || 0 === str.trim().length || /^\s*$/.test(str));
    } catch {
      return false;
    }
  }

  public isApp(): boolean {
    return (
      document.URL.indexOf('http://localhost') === 0 ||
      document.URL.indexOf('ionic') === 0 ||
      document.URL.indexOf('https://localhost') === 0
    );
  }

  public isBrowser(): boolean {
    return !this.isApp();
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

  private _getLocalIPAddress(): Observable<string> {
    const RTCPeerConnection = window['webkitRTCPeerConnection'] || window['mozRTCPeerConnection'];
    if (RTCPeerConnection) {
      return new Observable(observer => {
        const rtc = new RTCPeerConnection({
          iceServers: []
        });
        if (1 || window['mozRTCPeerConnection']) {
          rtc.createDataChannel('', {
            ordered: true,
          });
        }
        rtc.onicecandidate = (evt) => {
          observer.next(evt.candidate?.address);
          observer.complete();
        };
        rtc.createOffer((offerDesc) => {
          rtc.setLocalDescription(offerDesc);
        }, (e) => {
          console.warn('offer failed', e);
        });
      });
    } else {
      return of('ND');
    }
  }

  public urlToBase64(url: string, apiMediaUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          let canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL();
          canvas = null;
          resolve(dataURL);
        };
        img.src = `${apiMediaUrl}?url=${url}`;
      } catch (e) {
        reject('');
      }
    });
  }

  public downloadFileWithContentDisposition(data: any): void {
    let fileName = '';
    const contentDisposition = data.headers.get('Content-Disposition');
    if (contentDisposition) {
      const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = fileNameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        fileName = matches[1].replace(/['"]/g, '');
      }
    }
    FileSaver.saveAs(data.body, fileName);
  }

  public downloadFileFromLink(url: string, filename: string): void {
    const a = document.createElement('a');
    a.href = url.indexOf('dropbox.com') > -1 ? `${url}&dl=1` : url;
    a.setAttribute('download', filename);
    a.click();
  }

  // https://gist.github.com/DerZyklop/3188dbe064c75fc84a5c
  public rotateBase64Image90Degree(base64data: string, canvas: HTMLCanvasElement): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const ctx = canvas.getContext('2d');
        const image = new Image();

        image.src = base64data;
        image.onload = () => {
          canvas.width = image.height;
          canvas.height = image.width;
          ctx.rotate(270 * Math.PI / 180);
          ctx.translate(-canvas.height, 0);
          ctx.drawImage(image, 0, 0);
          resolve(canvas.toDataURL());
        };
      } catch (e) {
        reject('');
      }
    });
  }

  isTestMode(): boolean {
    return window.location.hostname.indexOf('test.') > -1;
  }

  public getBrowserResolution(): { width: number, height: number } {
    return {width: window.innerWidth || 0, height: window.innerHeight || 0};
  }

  public toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  public linkNavigateTo(link: string, method: '_top' | '_blank'): void {
    window.open(link, method);
  }

  public mailCallTo(contact: string, type: string, $event = null): void {
    // contact => phone number or e-mail
    // type => 'tel' or 'mailto'
    // $event => eg. click()
    if ($event) {
      $event.stopPropagation();
    }
    window.open(`${type}:${contact}`);
  }

}
