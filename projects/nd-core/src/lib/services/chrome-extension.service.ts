import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChromeExtensionService {

  public hasExtension(extID: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      // @ts-ignore
      chrome.runtime.sendMessage(extID, {message: 'exists'},
        function (reply: any) {
          resolve(!!reply);
        });
    })
  }

}
