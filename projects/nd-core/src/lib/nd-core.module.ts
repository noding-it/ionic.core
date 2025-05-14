import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {EnvironmentConfig} from "./interfaces/environment-config";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ColorPickerModule} from "ngx-color-picker";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {NgxColorsModule} from "ngx-colors";
import {CustomLoaderController} from "./overlay/custom-loader.controller";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ColorPickerModule,
    PdfViewerModule,
    NgxColorsModule,
  ],
  providers: [
    CustomLoaderController,
  ],
  exports: []
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

  public static forChild(environment: EnvironmentConfig): ModuleWithProviders<NdCoreModule> {
    return {
      ngModule: NdCoreModule,
      providers: [{provide: 'CORE_ENVIRONMENT', useValue: environment}]
    };
  }

}
