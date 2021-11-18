import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {NodDragDropDirective} from "./directives/file-drag-and-drop.directive";
import {ReadMoreDirective} from "./directives/readmore.directive";
import {ModalBaseCrudComponent} from "./modal/modal-base-crud.component";
import {ModalDescrizioneComponent} from "./modal/modal-descrizione.component";
import {ModalSearchComponent} from "./modal/modal-search.component";
import {IonicModule} from "@ionic/angular";
import {DescrizionePipe} from "./pipes/descrizione.pipe";
import {FileSizePipe} from "./pipes/file-size.pipe";
import {LinkPipe} from "./pipes/link.pipe";
import {NoextensionPipe} from "./pipes/noextension.pipe";
import {NomePipe} from "./pipes/nome.pipe";
import {OnlyExtensionPipe} from "./pipes/onlyextension.pipe";
import {SafeHtmlPipe} from "./pipes/safe-html.pipe";
import {EnvironmentConfig} from "./interfaces/environment-config";
import {installPackage} from "@angular/cli/utilities/install-package";

@NgModule({
  declarations: [
    NodDragDropDirective,
    ReadMoreDirective,
    ModalBaseCrudComponent,
    ModalDescrizioneComponent,
    ModalSearchComponent,
    DescrizionePipe,
    FileSizePipe,
    LinkPipe,
    NoextensionPipe,
    NomePipe,
    OnlyExtensionPipe,
    SafeHtmlPipe,
  ],
  imports: [
    IonicModule
  ],
  exports: [

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
      providers: [{provide: {} as EnvironmentConfig, useValue: environment}]
    };
  }
}
