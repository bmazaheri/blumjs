import {NgModule, ModuleWithProviders} from "@angular/core";
import {DatepickerModule} from "./components/datepicker/datepicker.module";
import {DropdownModule} from "./components/dropdown/dropdown.module";
import {LoaderModule} from "./components/loader/loader.module";

@NgModule({
    imports:[
        DropdownModule.forRoot(),
        DatepickerModule.forRoot(),
        LoaderModule.forRoot()
    ],
    exports: [
        DropdownModule,
        DatepickerModule,
        LoaderModule,
    ]
})
export class BlumModule {
}