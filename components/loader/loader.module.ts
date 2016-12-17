import { NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LoaderDirective} from "./loader.directive";

@NgModule({
    imports: [CommonModule, FormsModule],
  declarations: [LoaderDirective],
  exports: [LoaderDirective]
})
export class LoaderModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: LoaderModule, providers: []};
  }
}