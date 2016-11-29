import { DateUnit } from "./dateunit";
import { Row, Cell } from "./elements";

export interface CalendarBase {
    weekDayNames: string[];
    monthNames: string[];
    weekFirstDay: number;
    minYear: number;
    maxYear: number;
    monthLength(date: DateUnit): number;
    weekHeaders(): Row;
    dayNumberOfMonthFirst(date: DateUnit): number;
    dateToDateUnit(date: Date): DateUnit;
    dateToString(date: Date, format: string): string;
    dateUnitToDate(date:DateUnit):Date;
    nameOfMonth(num: number): string;
}

export class Calendar<TCal extends CalendarBase> {
    _calendar: TCal;

    constructor(TCreator: { new (): TCal; }) {
        this._calendar = new TCreator();
    }

    nameOfMonth(num: number): string{
        return this._calendar.nameOfMonth(num);
    }

    dateToString(date: Date, format: string): string{
        return this._calendar.dateToString(date, format);
    }

    monthLength(date: DateUnit) {
        return this._calendar.monthLength(date);
    }

    weekHeaders() {
        return this._calendar.weekHeaders();
    }

    dayNumberofMonthFirst(date: DateUnit): number {
        return this._calendar.dayNumberOfMonthFirst(date);
    }

}