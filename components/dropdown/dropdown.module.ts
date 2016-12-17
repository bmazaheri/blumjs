import { NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DropdownComponent} from "./dropdown.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent]
})
export class DropdownModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: DropdownModule, providers: []};
  }
}