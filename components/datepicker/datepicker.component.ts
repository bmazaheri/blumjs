import { Component, Input, HostListener, ElementRef, Inject, OnChanges } from "@angular/core";

@Component({
    selector: 'bl-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent {
    @Input() calendar: string;
    @Input() width: number = 200;
    @Input() model: Date = new Date();

    private pickerOpen: boolean = false;
    private rows: Row[];
    private header: Row;
    private _c: Convertor;

    constructor( @Inject(ElementRef) private _elementRef: ElementRef) {
        this.reset();
    };

    ngOnChanges() {
        this.reset();
    }

    reset() {
        this._c = new Convertor(this.calendar);
        this.header = new Row();
        for (let i = 0; i < 7; i++) {
            this.header.cells[i] = new Cell;
            let index = i + this._c.weekFirstDay;
            index -= (i + this._c.weekFirstDay < 7) ? 0 : 7;
            this.header.cells[i].content = this._c.weekDayNames[index];
        }
        let currentMonthLength = this._c.monthLength();
    }

    pickerClick() {
        this.pickerOpen = true;
    };

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }
        if (!this._elementRef.nativeElement.contains(targetElement)) {
            this.pickerOpen = false;
        }
    };

};

class Row {
    public cells: Cell[];

    constructor() {
        this.cells = new Array<Cell>(7);
    }
};

class Cell {
    content: string;
}

class Convertor {
    public weekDayNames: string[];
    public monthNames: string[];
    public weekFirstDay: number = 0;

    // monthLength() {
    //     return new Date(year, month, 0).getDate();
    // }

    constructor(calendar: string) {
        if (!calendar || (['gregorian', 'jalali'].indexOf(calendar) < 0)) {
            calendar = 'gregorian';
        }
        switch (calendar) {
            case 'gregorian': {
                this.weekDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                this.weekFirstDay = 0;
                this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                break;
            }
            case 'jalali': {
                this.weekDayNames = ['دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه', 'یکشنبه'];
                this.weekFirstDay = 5;
                this.monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
                break;
            }
        }
    }

}