import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatepickerComponent } from "./components/datepicker/datepicker.component";
import { DropdownComponent } from "./components/dropdown/dropdown.component";
import { DateToStringPipe, NameOfMonthPipe } from "./components/datepicker/pipes";

@NgModule({
    imports: [CommonModule],
    declarations: [DropdownComponent, DatepickerComponent, DateToStringPipe, NameOfMonthPipe],
    exports: [DropdownComponent, DatepickerComponent]
})
export class BlumModule { }