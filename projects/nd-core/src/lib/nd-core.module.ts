import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ModalBaseCrudComponent} from "./modal/modal-base-crud.component";
import {ModalDescrizioneComponent} from "./modal/modal-descrizione.component";
import {ModalSearchComponent} from "./modal/modal-search.component";
import {IonicModule} from "@ionic/angular";
import {EnvironmentConfig} from "./interfaces/environment-config";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ModalPreviewComponent} from "./modal/modal-preview.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
  declarations: [
    ModalBaseCrudComponent,
    ModalDescrizioneComponent,
    ModalSearchComponent,
    ModalPreviewComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ColorPickerModule,
    PdfViewerModule,
  ],
  exports: [
    ModalBaseCrudComponent,
    ModalDescrizioneComponent,
    ModalSearchComponent,
    ModalPreviewComponent,
  ]
})
export class NdCoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: NdCoreModule) {
    if (parentModule) {
      throw new Error(
        'NdCoreModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(environment: EnvironmentConfig): ModuleWithProviders<NdCoreModule> {
    return {
      ngModule: NdCoreModule,
      providers: [{provide: 'CORE_ENVIRONMENT', useValue: environment}]
    };
  }
}
