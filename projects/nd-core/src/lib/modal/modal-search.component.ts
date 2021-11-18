import {AfterViewInit, Component} from '@angular/core';
import {NavParams} from '@ionic/angular';
import {GlobalService} from '../services/global.service';
import {ModalService} from '../services/modal.service';
import {SearchConfig} from '../interfaces/search-config';
import {ToolService} from '../services/tool.service';
import {Sweetalert2Service} from '../services/sweetalert2.service';

// @ts-ignore
@Component({
    selector: 'app-modal-search.ricerca',
    template: `
        <ion-header>
            <ion-toolbar>
                <ion-title class="modal-title">{{modalConfig?.title}}</ion-title>
                <ion-row *ngIf="this.modalConfig?.labelSearch">
                    <ion-col size="9" class="center">
                        <ion-searchbar placeholder="{{modalConfig?.labelSearch}}"
                                       [(ngModel)]="ricerca.searchText"
                                       maxlength="50"
                                       [debounce]="modalConfig?.searchDebounce || 600"
                                       (ngModelChange)="search()"
                                       (keydown.enter)="search()"
                                       (focusout)="toolService.setFocus('.searchbar-input')"></ion-searchbar>
                    </ion-col>
                    <ion-col size="3">
                        <ion-button class="button-block" style="margin-top: 12px" (click)="search()">Cerca</ion-button>
                    </ion-col>
                </ion-row>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding modal">
            <ion-list>
                <ion-item *ngFor="let item of ricerca.itemList" style="cursor: pointer" (click)="select(item)">
                    <ion-checkbox *ngIf="modalConfig?.multiSelect" slot="start" [(ngModel)]="item.selected"></ion-checkbox>
                    <ion-label>{{item[modalConfig?.labelDesc]}}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>

        <ion-footer>
            <ion-row>
                <ion-col>
                    <ion-button class="button-block" color="tertiary" (click)="esci()">
                        Chiudi
                    </ion-button>
                </ion-col>
                <ion-col size="4" *ngIf="this.modalConfig?.multiSelect">
                    <ion-button class="button-block" color="secondary" (click)="addAll()">
                        Aggiungi Tutti
                    </ion-button>
                </ion-col>
                <ion-col size="4" *ngIf="this.modalConfig?.multiSelect">
                    <ion-button class="button-block" color="primary" (click)="conferma()">
                        Conferma
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-footer>
    `,
    styles: []
})
export class ModalSearchComponent implements AfterViewInit {

    constructor(
        public gs: GlobalService,
        public toolService: ToolService,
        public modal: ModalService,
        private _params: NavParams,
        private _sweetAlert: Sweetalert2Service,
    ) {
    }

    public ricerca = {
        searchText: undefined,
        itemList: []
    };
    public modalConfig: SearchConfig;

    ngAfterViewInit(): void {
        this.modalConfig = {...this._params.data} as SearchConfig;
        if (this.modalConfig.searchOnStartup) {
            this.search();
        } else {
            this.toolService.setFocus('.searchbar-input');
        }
    }

    search(): void {
        let params = ``;
        if (!this.modalConfig.removeToken) {
            params = `'${localStorage.getItem('token')}'${(this.modalConfig.customAdditionalsParams) ? ',' : ''}`;
        }
        if (this.modalConfig.customAdditionalsParams) {
            params = params + `${this.modalConfig.customAdditionalsParams}`;
        }
        if (this.modalConfig.labelSearch) {
            params = `'${this.toolService.isnull(this.ricerca.searchText)}',` + params;
        }
        if (this.modalConfig.searchOnStartup) {
            this.gs.callGateway(this.modalConfig.listProcess, params).subscribe(data => {
                    if (data.hasOwnProperty('error')) {
                        this._sweetAlert.error(data.error);
                        return;
                    }
                    this.ricerca.itemList = data.recordset ? [...data.recordset] : [];
                    this.selectionGest();
                    this.toolService.setFocus('.searchbar-input');
                }, error => this._sweetAlert.error(error.message)
            );
        } else {
            if (this.ricerca.searchText !== undefined && this.ricerca.searchText !== '' && this.ricerca.searchText.length > 2) {
                this.gs.callGateway(this.modalConfig.listProcess, params).subscribe(data => {
                        if (data.hasOwnProperty('error')) {
                            this._sweetAlert.error(data.error);
                            return;
                        }
                        this.ricerca.itemList = data.recordset ? [...data.recordset] : [];
                        this.selectionGest();
                    }, error => this._sweetAlert.error(error.message)
                );
            }
        }
    }

    selectionGest(): void {
        if (this.modalConfig?.multiSelect) {
            this.ricerca.itemList = this.ricerca.itemList.map(item => {
                item.selected = false;
                return item;
            });
        }
    }

    select(item): void {
        if (!this.modalConfig?.multiSelect) {
            this.modal.dismiss(item);
        }
    }

    addAll(){
        this.ricerca.itemList.map(item => {
            item.selected = true;
            return item;
        });
        this.conferma();
    }

    conferma(): void {
        this.modal.dismiss(this.ricerca.itemList.filter(item => item.selected));
    }

    esci(): void {
        this.modal.dismiss(undefined);
    }

}
