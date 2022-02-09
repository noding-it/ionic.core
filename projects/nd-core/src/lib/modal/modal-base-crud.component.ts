import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {NavParams} from '@ionic/angular';
import {ModalService} from '../services/modal.service';
import {GlobalService} from '../services/global.service';
import {AlertService} from '../services/alert.service';
import {TabellaDiBase} from '../interfaces/tabella-di-base';
import {Sweetalert2Service} from '../services/sweetalert2.service';
import {BaseCrudConfig} from '../interfaces/base-crud-config';
import {PopoverService} from '../services/popover.service';
import {IconPickerPopoverComponent} from '../popover/icon-picker-popover.component';

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
        <ngx-colors class="ion-box" style="width: 34px"
                    ngx-colors-trigger cpOutputFormat="hex"
                    [style.background]="localModel.color"
                    [(ngModel)]="localModel.color">
        </ngx-colors>
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
      <ion-item *ngIf="modalConfig?.includeIcon">
        <ion-label position="fixed">Icona:</ion-label>
        <ion-icon [name]="(localModel.icona) ? localModel.icona : 'document'" class="ion-box center"
                  (click)="openIconPopover($event)"
                  style=" font-size: 31px !important"></ion-icon>
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
              <ngx-colors class="ion-box" style="width: 100%;"
                          ngx-colors-trigger cpOutputFormat="hex"
                          [style.background]="item.colore"
                          [(ngModel)]="item.colore"
                          (change)="save(item, $event)">
              </ngx-colors>
              <!--<span style="width: 100% !important;height: 100% !important;cursor: pointer !important;"
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
              </span>-->
            </ion-col>
            <ion-col size="1" *ngIf="modalConfig?.includeIcon" class="center">
              <ion-icon [name]="(item.icona) ? item.icona : 'document'" class="ion-box center"
                        (click)="openIconPopover($event, item)"
                        style=" font-size: 31px !important"></ion-icon>
            </ion-col>
            <ion-col (click)="changeDetectorRef.detectChanges()"
                     size="{{11 - (modalConfig?.includeColor ? 1 : 0) - (modalConfig?.includeIcon ? 1 : 0)}}"
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
  styles: [`
    .ion-box {
      border-radius: 10px !important;
      border: 2px solid #048e8a !important;
      background: #FFFFFF;
      filter: drop-shadow(0.1rem 0.3rem 0.3rem rgba(4, 142, 138, 0.6));
    }
  `],
})
export class ModalBaseCrudComponent implements AfterViewInit {

  constructor(
    public modal: ModalService,
    public popover: PopoverService,
    public changeDetectorRef: ChangeDetectorRef,
    private _gs: GlobalService,
    private _alert: AlertService,
    private _params: NavParams,
    private _sweetAlert: Sweetalert2Service,
  ) {
  }

  public modalConfig: BaseCrudConfig;
  public data: Array<TabellaDiBase> = [] as Array<TabellaDiBase>;
  public localModel: { desc: string, color: string, icona: string } = {
    desc: undefined,
    color: undefined,
    icona: undefined,
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
    // event.stopPropagation();
    if (item) {
      if (!item.descrizione) {
        this._sweetAlert.warning('Inserire una descrizione !');
        return;
      }
      const params = (this.modalConfig.includeColor) ? ((this.modalConfig.includeIcon) ? (`${item.id},'${item.descrizione}','${item.colore}','${item.icona}','${localStorage.getItem('token')}'`) : (`${item.id},'${item.descrizione}','${item.colore}','${localStorage.getItem('token')}'`)) : ((this.modalConfig.includeIcon) ? (`${item.id},'${item.descrizione}','${item.icona}','${localStorage.getItem('token')}'`) : (`${item.id},'${item.descrizione}','${localStorage.getItem('token')}'`));
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
      const params = (this.modalConfig.includeColor)
        ? ((this.modalConfig.includeIcon) ? (`0,'${this.localModel.desc}','${this.localModel.color}','${this.localModel.icona}','${localStorage.getItem('token')}'`)
          : (`0,'${this.localModel.desc}','${this.localModel.color}','${localStorage.getItem('token')}'`))
        : ((this.modalConfig.includeIcon) ? (`0,'${this.localModel.desc}','${this.localModel.icona}','${localStorage.getItem('token')}'`)
          : (`0,'${this.localModel.desc}','${localStorage.getItem('token')}'`));
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
        this.localModel.icona = undefined;
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

  openIconPopover($event, item?: TabellaDiBase): void {
    this.popover.present($event, IconPickerPopoverComponent, '', 'color-picker-popover').then(
      dataFromPopover => {
        if (dataFromPopover.data && dataFromPopover.data.hasOwnProperty('icon') && !item) {
          this.localModel.icona = dataFromPopover.data.icon;
        }
        if (dataFromPopover.data && dataFromPopover.data.hasOwnProperty('icon') && item) {
          item.icona = dataFromPopover.data.icon;
          this.save(item, $event)
        }
      });
  }

}
