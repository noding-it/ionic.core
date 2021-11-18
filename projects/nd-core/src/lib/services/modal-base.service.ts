import {Injectable} from '@angular/core';
import {BaseCrudConfig} from '../interfaces/base-crud-config';
import {ModalBaseCrudComponent} from '../modal/modal-base-crud.component';
import {SearchConfig} from '../interfaces/search-config';
import {ModalSearchComponent} from '../modal/modal-search.component';
import {ModalService} from './modal.service';

@Injectable({
    providedIn: 'root'
})
export class ModalBaseService {

    constructor(
        private _modalService: ModalService,
    ) {
    }

    public openBaseCrudGest(baseCrudConfig: BaseCrudConfig): Promise<any> {
        return this._modalService.present(ModalBaseCrudComponent, {...baseCrudConfig});
    }

    public openSearchSelect(searchConfig: SearchConfig): Promise<any> {
        return this._modalService.present(ModalSearchComponent, {...searchConfig});
    }
}
