import {AfterViewInit, Component} from '@angular/core';
import {NavParams} from '@ionic/angular';
import {ModalService} from '../services/modal.service';
import {ModalConfig} from '../interfaces/modal-config';

@Component({
    selector: 'app-modal-descrizione',
    template: `
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-center">{{modalConfig?.title}}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="modal">
            <ion-item *ngIf="this.modalConfig?.title !== 'Modifica file'">
                <ion-label position="fixed">Nome:</ion-label>
                <ion-input type="text" *ngIf="modalConfig?.data" [(ngModel)]="modalConfig.data.descrizione" required ></ion-input>
            </ion-item>
            <ion-item *ngIf="modalConfig?.title !== 'Modifica file'">
                <ion-label position="fixed">Colore:</ion-label>
                <input *ngIf="modalConfig?.data"
                       cpPosition="bottom"
                       [cpDisableInput]="true"
                       cpOutputFormat="hex"
                       [(ngModel)]="modalConfig.data.colore"
                       [(colorPicker)]="modalConfig.data.colore"
                       [style.background]="modalConfig.data.colore"/>
            </ion-item>
            <ion-item *ngIf="modalConfig?.data?.arc_codi">
                <ion-label position="fixed">Commento:</ion-label>
                <ion-textarea type="text" *ngIf="modalConfig?.data" [(ngModel)]="modalConfig.data.commento" ></ion-textarea>
            </ion-item>
        </ion-content>

        <ion-footer>
            <ion-row>
                <ion-col *ngIf="modalConfig?.cancelText">
                    <ion-button class="button-block" color="tertiary" (click)="esci()">{{modalConfig?.cancelText}}</ion-button>
                </ion-col>
                <ion-col *ngIf="modalConfig?.confirmText">
                    <ion-button class="button-block" (click)="conferma()">{{modalConfig?.confirmText}}</ion-button>
                </ion-col>
            </ion-row>
        </ion-footer>
    `,
    styles: []
})
export class ModalDescrizioneComponent implements AfterViewInit {

    constructor(
        public modal: ModalService,
        private _params: NavParams,
    ) { }

    public modalConfig: ModalConfig;

    ngAfterViewInit() {
        this.modalConfig = {...this._params.data} as ModalConfig;
        console.log(this.modalConfig.title);
    }

    conferma() {
        this.modal.dismiss({...this.modalConfig.data});
    }

    esci() {
        this.modal.dismiss(undefined);
    }

}
