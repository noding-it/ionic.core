import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChromeExtensionService {

  /**
   * Metodo per l'invio dell'azione all'estensione
   * @param extID
   * @param message
   * @param data
   * @private
   */
  private _sendMessageToExtension<T>(extID: string, message: string, data?: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        // @ts-ignore
        if (!!window.chrome) {
          // @ts-ignore
          chrome.runtime.sendMessage(extID, {message},
            function (reply: T) {
              resolve(reply);
            });
        } else {
          reject('Not Chromium');
        }
      } catch (e) {
        reject('Estensione non installata!');
      }
    })
  }

  /**
   * Funzione per la verifica
   * @param extID
   */
  public hasExtension(extID: string): Promise<boolean> {
    return this._sendMessageToExtension<boolean>(extID, 'exists');
  }

  public clearCache(extID: string): Promise<boolean> {
    return this._sendMessageToExtension<boolean>(extID, 'cache');
  }

}
