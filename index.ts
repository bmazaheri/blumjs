import {NgModule} from "@angular/core";
import {DatepickerComponent} from "./components/datepicker/datepicker.component";
import {DropdownComponent} from "./components/dropdown/dropdown.component";
import {LoaderDirective} from "./components/loader/loader.directive";

@NgModule({
    exports: [
        DropdownComponent,
        DatepickerComponent,
        LoaderDirective,
    ]
})
export class BlumModule {
}

export * from "./components/dropdown";
export * from "./components/datepicker";
export * from "./components/loader";