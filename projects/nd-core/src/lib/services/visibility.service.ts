import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VisibilityService {

    constructor() {
        if (typeof document.hidden !== 'undefined') {
            this.hiddenProperty = 'hidden';
            this.visibilityChange = 'visibilitychange';
        } else if (typeof (document as any)['msHidden'] !== 'undefined') {
            this.hiddenProperty = 'msHidden';
            this.visibilityChange = 'msvisibilitychange';
        } else if (typeof (document as any)['webkitHidden'] !== 'undefined') {
            this.hiddenProperty = 'webkitHidden';
            this.visibilityChange = 'webkitvisibilitychange';
        }
        this.visibilityChangeEvent$ = new Subject<boolean>();
    }

    private _listener: any;
    public visibilityChange: string = '';
    public hiddenProperty: string = '';
    public visibilityChangeEvent$: Subject<boolean>;

    public init(): void {
        this._listener = document.addEventListener(this.visibilityChange, () => {
            this.visibilityChangeEvent$.next((document as any)[this.hiddenProperty]);
        }, false);
    }

    public destroy(): void {
        if (this._listener) {
            document.removeEventListener(this.visibilityChange, this._listener);
            this._listener = null;
            this.visibilityChangeEvent$ = new Subject<boolean>();
        }
    }

}
