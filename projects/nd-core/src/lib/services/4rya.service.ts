import {Inject, Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {AryaService as CoreAryaService} from "@myvirtualab.angular/core";
import {EnvironmentConfig} from "../interfaces/environment-config";
import {ToolService} from "./tool.service";
import {Sweetalert2Service} from "./sweetalert2.service";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";




@Injectable({
  providedIn: 'root',
})
export class AryaService extends CoreAryaService{

  constructor(
    @Inject('CORE_ENVIRONMENT')  _viewConfig: EnvironmentConfig,
     _globalService: GlobalService,
     _toolService: ToolService,
     _sweetAlert: Sweetalert2Service,
     _translateService: TranslateService,
     _modal: NgbModal,
  ) {
    super(_viewConfig,_globalService,_toolService,_sweetAlert,_translateService,_modal)
  }


}
