import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    private _online = true;

    public checkConnection(): boolean {
        const networkState = navigator['connection'].type || navigator['connection'].effectiveType;

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
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        this._online = !(networkState === Connection.NONE);
        return this._online;
    }

    public isOnline(): boolean {
        return this._online;
    }
}
