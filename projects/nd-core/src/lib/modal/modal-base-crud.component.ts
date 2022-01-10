import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {NavParams} from '@ionic/angular';
import {ModalService} from '../services/modal.service';
import {GlobalService} from '../services/global.service';
import {AlertService} from '../services/alert.service';
import {TabellaDiBase} from '../interfaces/tabella-di-base';
import {Sweetalert2Service} from '../services/sweetalert2.service';
import {BaseCrudConfig} from "../interfaces/base-crud-config";

@Component({
    selector: 'app-modal-base-crud',
    template: `
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-center">{{modalConfig?.title}}</ion-title>
            </ion-toolbar>
            <ion-item>
                <ion-label position="fixed">{{modalConfig?.labelDesc}}:</ion-label>
                <ion-input type="text" [(ngModel)]="localModel.desc" (keydown.enter)="save(null, $event)" required></ion-input>
            </ion-item>
            <ion-item *ngIf="modalConfig?.includeColor">
                <ion-label position="fixed">Colore:</ion-label>
              <div class="ion-box"
                   style="width: 100%; padding-bottom: 100%; position: relative;"
                   ngx-colors-trigger cpOutputFormat="hex"
                   [style.background]="localModel.color"
                   [(ngModel)]="localModel.color">
              </div>
                <!--<input cpPosition="bottom"
                       [cpDisableInput]="true"
                       cpOutputFormat="hex"
                       [cpCancelButton]="true"
                       cpCancelButtonText="Annulla"
                       [cpOKButton]="true"
                       cpOKButtonText="Scegli"
                       [(ngModel)]="localModel.color"
                       [(colorPicker)]="localModel.color"
                       [style.background]="localModel.color"
                       class="color-picker-style"/>-->
            </ion-item>
            <ion-row>
                <ion-col class="ion-text-center">
                    <ion-button color="success" (click)="save(null, $event)">{{modalConfig?.labelSaveButton}}</ion-button>
                </ion-col>
            </ion-row>
        </ion-header>

        <ion-content class="modal">

            <ion-list>
                <ion-item *ngFor="let item of data">
                    <ion-row style="width: 100%">
                        <!--<ion-col size="11" style="overflow: hidden;white-space: normal;" >{{item.descrizione}}</ion-col>-->
                        <ion-col size="1" *ngIf="modalConfig?.includeColor" class="center">
                            <span style="width: 100% !important;height: 100% !important;cursor: pointer !important;"
                                  [cpDisableInput]="true"
                                  cpDialogDisplay="inline"
                                  cpOutputFormat="hex"
                                  [(colorPicker)]="item.colore"
                                  [cpCancelButton]="true"
                                  cpCancelButtonText="Annulla"
                                  [cpOKButton]="true"
                                  cpOKButtonText="Scegli"
                                  [style.background]="item.colore"
                                  class="color-picker-style">
                            </span>
                        </ion-col>
                        <ion-col (click)="changeDetectorRef.detectChanges()"
                                 size="{{modalConfig?.includeColor ? 10 : 11}}"
                                 style="overflow: hidden;white-space: normal;">
                            <ion-input [(ngModel)]="item.descrizione" (ionBlur)="save(item, $event)"
                                       (keydown.enter)="save(item, $event)"></ion-input>
                        </ion-col>
                        <ion-col size="1" class="ion-text-center">
                            <ion-icon name="trash" color="danger" (click)="delete(item, $event)"></ion-icon>
                        </ion-col>
                    </ion-row>
                </ion-item>
            </ion-list>
        </ion-content>

        <ion-footer>
            <ion-row>
                <ion-col *ngIf="modalConfig?.labelExitButton">
                    <ion-button class="button-block" color="tertiary"
                                (click)="exit()">{{modalConfig?.labelExitButton}}</ion-button>
                </ion-col>
            </ion-row>
        </ion-footer>
    `,
    styles: []
})
export class ModalBaseCrudComponent implements AfterViewInit {

    constructor(
        public modal: ModalService,
        private _gs: GlobalService,
        private _alert: AlertService,
        private _params: NavParams,
        public changeDetectorRef: ChangeDetectorRef,
        private _sweetAlert: Sweetalert2Service,
    ) {
    }

    public modalConfig: BaseCrudConfig;
    public data: Array<TabellaDiBase> = [] as Array<TabellaDiBase>;
    public localModel: { desc: string, color: string } = {
        desc: undefined,
        color: undefined
    };

    ngAfterViewInit() {
        // dismissOnSave defaults to false so that it doesn't break all the instances where it's not provided
        // this.modalConfig.dismissOnSave = false;
        this.modalConfig = {...this._params.data} as BaseCrudConfig;
        this.list();
    }

    list() {
        this._gs.callGateway(this.modalConfig.listProcess, `'${localStorage.getItem('token')}'`, false).subscribe(data => {
            if (data.hasOwnProperty('error')) {
                this._sweetAlert.error(data.error);
                return;
            }
            this.data = data.recordset ? [...data.recordset] : [];
        }, error => this._sweetAlert.error(error.message));
    }

    save(item: TabellaDiBase, event) {
        event.stopPropagation();
        if (item) {
            if (!item.descrizione) {
                this._sweetAlert.warning('Inserire una descrizione !');
                return;
            }
            const params = this.modalConfig.includeColor ? `${item.id},'${item.descrizione}','${item.colore}','${localStorage.getItem('token')}'` : `${item.id},'${item.descrizione}','${localStorage.getItem('token')}'`;
            this._gs.callGateway(this.modalConfig.saveProcess, params).subscribe(data => {
                if (data.hasOwnProperty('error')) {
                    this._sweetAlert.error(data.error);
                    return;
                }
                this.list();
            }, error => this._sweetAlert.error(error.message));
        } else {
            if (!this.localModel.desc) {
                this._sweetAlert.warning('Inserire una descrizione !');
                return;
            }
            const params = this.modalConfig.includeColor ? `0,'${this.localModel.desc}','${this.localModel.color}','${localStorage.getItem('token')}'` : `0,'${this.localModel.desc}','${localStorage.getItem('token')}'`;
            this._gs.callGateway(this.modalConfig.saveProcess, params).subscribe(data => {
                if (data.hasOwnProperty('error')) {
                    this._sweetAlert.error(data.error);
                    return;
                }
                this.list();
                if (this.modalConfig?.dismissOnSave) {
                    // per avere l'id in output è necessario settare la stored procedure per inviare il recordset giusto
                    this.modal.dismiss({
                        id: (data.recordset[0].out_id) ? data.recordset[0].out_id : undefined,
                        descrizione: this.localModel.desc
                    });
                }
                this.localModel.desc = undefined;
                this.localModel.color = undefined;
            }, error => this._sweetAlert.error(error.message));
        }
    }

    delete(item: TabellaDiBase, event) {
        event.stopPropagation();
        const alertElimina = this._sweetAlert.confirm(`Sicuro di voler eliminare il record ?`);
        alertElimina.then(result => {
            if (result.isConfirmed) {
                this._gs.callGateway(this.modalConfig.deleteProcess, item.id).subscribe(data => {
                    if (data.hasOwnProperty('error')) {
                        this._sweetAlert.error(data.error);
                        return;
                    }
                    this.list();
                }, error => this._sweetAlert.error(error.message));
            }
        });
    }

    exit() {
        this.modal.dismiss(undefined);
    }

}
