import {Inject, Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {Sweetalert2Service} from './sweetalert2.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvironmentConfig} from '../interfaces/environment-config';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DropboxService as CoreDropboxService} from "@myvirtualab.angular/core";

@Injectable({
  providedIn: 'root',
})
export class DropboxService extends  CoreDropboxService{

  constructor(
    @Inject('CORE_ENVIRONMENT')  _viewConfig: EnvironmentConfig,
     _http: HttpClient,
     _gs: GlobalService,
     _sweetAlert: Sweetalert2Service,
     _modal: NgbModal,
  ) {
    super(_viewConfig,_http,_gs,_sweetAlert,_modal)
  }



}
