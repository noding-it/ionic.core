import {AfterViewInit, Component} from '@angular/core';
import {NavParams} from '@ionic/angular';
import {ModalService} from '../services/modal.service';

@Component({
  selector: 'nod-modal-preview-edit',
  template: `
      <ion-header>
          <ion-toolbar>
              <ion-title>{{file?.name}}</ion-title>
          </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-row style="width: 100%;height: 100%;">
          <ion-col size="12" class="center">
            <img *ngIf="file?.type === 'image'" src="{{file?.link}}" alt="{{file?.name}}">
            <pdf-viewer *ngIf="file?.type === 'pdf'"
                        [src]="file?.link"
                        [render-text]="true"
                        [external-link-target]="'blank'"
                        style="display: block;"
            ></pdf-viewer>
          </ion-col>
        </ion-row>
      </ion-content>

      <ion-footer>
          <ion-toolbar>
              <ion-row>
                  <ion-col><ion-button class="button-block" color="tertiary" (click)="esci()">Chiudi</ion-button></ion-col>
              </ion-row>
          </ion-toolbar>
      </ion-footer>
  `,
  styles: []
})
export class ModalPreviewComponent implements AfterViewInit {

  constructor(
      public modal: ModalService,
      private _params: NavParams,
  ) { }

  //
  // Public
  //
    public file: {name: string, link: string, type: 'image' | 'pdf'};

    ngAfterViewInit() {
        this.file = {...this._params.data} as {name: string, link: string, type: 'image' | 'pdf'};
    }

    esci() {
        this.modal.dismiss(undefined);
    }

}
