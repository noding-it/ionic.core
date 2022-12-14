import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs';
import * as FileSaver from 'file-saver';
import {Sweetalert2Service, ToolService as CoreToolService} from "@myvirtualab.angular/core";

@Injectable({
  providedIn: 'root'
})
export class IonToolService extends CoreToolService {

  constructor(
    private _platform: Platform,
    private _sweetalert: Sweetalert2Service
  ) {
   super(_sweetalert)
  }

}
