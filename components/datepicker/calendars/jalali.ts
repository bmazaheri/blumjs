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

    nameOfMonth(num: number): string {
        return this.monthNames[num];
    }

    dateToString(date: Date, format: string): string {
        return new DatePipe('fa-fa').transform(date, format);
    }

    dateToDateUnit(date: Date): DateUnit {
        let uDate: DateUnit = new DateUnit();
        let tempDate = this._calCulateDate(date.getFullYear(), date.getMonth(), date.getDate())
        uDate.year = tempDate.year;
        uDate.month = tempDate.month;
        uDate.day = tempDate.day;
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
////////////////////////////////////////////
    private _miladiLeapYears = [2012, 2016, 2020];
    private _monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    private leapYearMonthLength = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    private numberOfLeapYears: number;
    _calculateLeapYears(futureYear: number) {
        let firstIndex = 0;
        while (2011 > this._miladiLeapYears[firstIndex]) {
            firstIndex++;
        }
        let secondIndex = 0;
        while (futureYear > this._miladiLeapYears[secondIndex]) {
            secondIndex++;
        }
        return this.numberOfLeapYears = secondIndex - firstIndex;
    }

    _calculateDays(year: number, month: number, day: number) {
        let differenceYear: number;
        let differenceMonth: number;
        let d: number;
        if (month > 2 || (day >= 21 && month == 2)) {
            this.numberOfLeapYears = this._calculateLeapYears(year + 1);
            differenceYear = year - 2011;
            if (month == 2) {
                d = day - 21;
            } else {
                differenceMonth = month - 3;
                d = 10;
                for (var i = 0; i < differenceMonth; i++) {
                    d = d + this._monthLength[i + 3];
                }
                d = d + day;
            }
            return (365 * differenceYear) + this.numberOfLeapYears + d + 1;
        } else {
            this.numberOfLeapYears = this._calculateLeapYears(year);
            differenceYear = year - 2011 - 1;
            d = 285;
            if (year == 2012 || year == 2016 || year == 2020) {
                for (var i = 0; i < month; i++) {
                    d = d + this.leapYearMonthLength[i];
                }
                d = d + day;
            } else {
                for (var i = 0; i < month; i++) {
                    d = d + this._monthLength[i];
                }
                d = d + day;
            }
            return (365 * differenceYear) + this.numberOfLeapYears + d + 1;
        }
    }

    _calculateMonthAndDay(numberOfDays: number): any {
        let mah: number;
        let rooz: number;
        if (0 <= numberOfDays && numberOfDays <= 186) {
            if ((numberOfDays) % 31 == 0) {
                mah = Math.floor((numberOfDays) / 31);
                rooz = 31;
                return mah + "/" + rooz;
            } else {
                mah = Math.floor((numberOfDays) / 31) + 1;
                rooz = (numberOfDays) % 31;
                return mah + "/" + rooz;
            }
        } else {
            numberOfDays = numberOfDays - 186;
            if ((numberOfDays) % 30 == 0) {
                mah = Math.floor(numberOfDays / 30) + 6;
                rooz = 30;
                return mah + "/" + rooz;
            }
            mah = Math.floor(numberOfDays / 30) + 7;
            rooz = numberOfDays % 30;
            return { month: mah, day: rooz };
        }
    }

    _calCulateDate(year: number, month: number, day: number) {
        let numberOfDays: number = this._calculateDays(year, month, day);
        let sal: number;
        let y: number;
        if (0 <= numberOfDays && numberOfDays <= 365) {
            sal = 1390;
            y = numberOfDays;
        }
        else if (365 < numberOfDays && numberOfDays <= 731) {
            sal = 1391;
            y = numberOfDays - 365;
        }
        else if (731 < numberOfDays && numberOfDays <= 1096) {
            sal = 1392;
            y = numberOfDays - 731;
        }
        else if (1096 < numberOfDays && numberOfDays <= 1461) {
            sal = 1393;
            y = numberOfDays - 1096;
        }
        else if (1461 < numberOfDays && numberOfDays <= 1826) {
            sal = 1394;
            y = numberOfDays - 1461;
        }
        else if (1826 < numberOfDays && numberOfDays <= 2192) {
            sal = 1395;
            y = numberOfDays - 1826;
        }
        else if (2192 < numberOfDays && numberOfDays <= 2557) {
            sal = 1396;
            y = numberOfDays - 2192;
        }
        else if (2557 < numberOfDays && numberOfDays <= 2922) {
            sal = 1397;
            y = numberOfDays - 2557;
        }
        else if (2922 < numberOfDays && numberOfDays <= 3287) {
            sal = 1398;
            y = numberOfDays - 2922;
        }
        else if (3287 < numberOfDays && numberOfDays <= 3653) {
            sal = 1399;
            y = numberOfDays - 3287;
        }
        else if (3653 < numberOfDays && numberOfDays <= 4018) {
            sal = 1400;
            y = numberOfDays - 3653;

        }
        let x = this._calculateMonthAndDay(y);
        return { year: sal, month: x.month, day: x.day }
    }
}
