import { NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DatepickerComponent} from "./datepicker.component";
import {DateToStringPipe, NameOfMonthPipe} from "./pipes";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DatepickerComponent,DateToStringPipe,NameOfMonthPipe],
  exports: [DatepickerComponent]
})
export class DatepickerModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: DatepickerModule, providers: []};
  }
}