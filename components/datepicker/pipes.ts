import { Pipe, PipeTransform } from "@angular/core";
import { CalendarBase } from "./calendarbase";

@Pipe({
    name: 'dateToString'
})
export class DateToStringPipe implements PipeTransform {
    transform(value: Date, format: string, calendar: CalendarBase) {
        return calendar.dateToString(value, format);
    }
}

@Pipe({
    name: 'nameOfMonth'
})
export class NameOfMonthPipe implements PipeTransform {
    transform(value: number, calendar: CalendarBase) {
        return calendar.nameOfMonth(value);
    }
}