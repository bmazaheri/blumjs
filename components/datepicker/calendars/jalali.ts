import { DatePipe } from "@angular/common";
import { Calendar, CalendarBase } from "../calendarbase"
import { DateUnit } from "../dateunit";
import { Row, Cell } from "../elements";

export class Jalali implements CalendarBase {
    weekDayNames = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    weekFirstDay = 6;
    monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'ابان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    minYear = 1350;
    maxYear = 1450;

    nameOfMonth(num: number): string{
        return this.monthNames[num];
    }

    dateToString(date: Date, format: string): string {
        return new DatePipe('fa-fa').transform(date, format);
    }

    dateToDateUnit(date: Date): DateUnit {
        let uDate: DateUnit = new DateUnit();
        uDate.year = date.getFullYear();
        uDate.month = date.getMonth();
        uDate.day = date.getDate();
        uDate.hour = date.getHours();
        uDate.minute = date.getMinutes();
        uDate.seconds = date.getSeconds();
        return uDate;
    }

    dateUnitToDate(date: DateUnit): Date {
        return new Date(date.year, date.month, date.day, date.hour, date.minute, date.seconds);
    }

    monthLength(date: DateUnit) {
        return new Date(date.year, date.month + 1, 0).getDate();
    }

    weekHeaders() {
        let row = new Row();
        for (let i = 0; i < 7; i++) {
            row.cells[i] = new Cell;
            let index = i + this.weekFirstDay;
            index -= (i + this.weekFirstDay < 7) ? 0 : 7;
            row.cells[i].content = this.weekDayNames[index];
        }
        return row;
    }

    dayNumberOfMonthFirst(date: DateUnit): number {
        return new Date(date.year, date.month, 1).getDay();
    }
}