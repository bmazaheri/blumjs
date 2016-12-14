import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DatepickerComponent} from "./components/datepicker/datepicker.component";
import {DropdownComponent} from "./components/dropdown/dropdown.component";
import {DateToStringPipe, NameOfMonthPipe} from "./components/datepicker/pipes";
import {LoaderDirective} from "./components/loader/loader.directive";
import {ToasterService} from "./components/toaster/toaster.service";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
        DropdownComponent,
        DatepickerComponent,
        DateToStringPipe,
        NameOfMonthPipe,
        LoaderDirective,
    ],
    exports: [
        DropdownComponent,
        DatepickerComponent,
        LoaderDirective,
    ]
})
export class BlumModule {
}