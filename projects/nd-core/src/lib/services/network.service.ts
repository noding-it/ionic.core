import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    private _online = true;

    public checkConnection(): boolean {
        // @ts-ignore
      const networkState = navigator['connection'].type || navigator['connection']['effectiveType'];

        // @ts-ignore
      const Connection = window['Connection'] || {
            'CELL': 'cellular',
            'CELL_2G': '2g',
            'CELL_3G': '3g',
            'CELL_4G': '4g',
            'ETHERNET': 'ethernet',
            'NONE': 'none',
            'UNKNOWN': 'unknown',
            'WIFI': 'wif'
        };

        const states = {};
        // @ts-ignore
      states[Connection.UNKNOWN] = 'Unknown connection';
        // @ts-ignore
      states[Connection.ETHERNET] = 'Ethernet connection';
        // @ts-ignore
      states[Connection.WIFI] = 'WiFi connection';
        // @ts-ignore
      states[Connection.CELL_2G] = 'Cell 2G connection';
        // @ts-ignore
      states[Connection.CELL_3G] = 'Cell 3G connection';
        // @ts-ignore
      states[Connection.CELL_4G] = 'Cell 4G connection';
        // @ts-ignore
      states[Connection.CELL] = 'Cell generic connection';
        // @ts-ignore
      states[Connection.NONE] = 'No network connection';

        this._online = !(networkState === Connection.NONE);
        return this._online;
    }

    public isOnline(): boolean {
        return this._online;
    }
}
