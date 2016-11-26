import { Component, Input, HostListener, ElementRef, Inject, OnChanges } from "@angular/core";
import * as moment from "moment";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'bl-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent {
    @Input() calendar: string;
    @Input() width: number = 200;
    @Input() model: Date = new Date();

    private selectedDate:Date;
    private currentViewDate:Date;
    private pickerOpen: boolean = false;
    private rows: Row[];
    private header: Row;
    private _c: Convertor;

    constructor( @Inject(ElementRef) private _elementRef: ElementRef) {
        this.init();
    };

    ngOnChanges() {
        this.init();
    }

    init() {
        this._c = new Convertor(this.calendar);
        this.selectedDate = this.model;
        this.currentViewDate = this.model;
        this.resetView();
    }

    resetView(){
        this.header = this._c.weekHeaders();
        let currentMonthLength = this._c.monthLength(this.currentViewDate);
        let dayNumberofMonthFirst = this._c.dayNumberofMonthFirst(this.currentViewDate);
        this.rows = new Array<Row>();
        let cellIndex = 0;
        for(let weekIndex=0;weekIndex<Math.ceil(currentMonthLength / 7);weekIndex++){
            this.rows[weekIndex]=new Row();
            for(let colIndex=0;colIndex<7;colIndex++){
                this.rows[weekIndex].cells[colIndex]=new Cell();
                if(weekIndex==0 && colIndex<dayNumberofMonthFirst){
                    continue;
                }
                if(cellIndex<currentMonthLength){
                this.rows[weekIndex].cells[colIndex].content=(cellIndex+1).toString();
                }
                cellIndex++;
            }
        }
    }

    nextMonth(){
        this.currentViewDate=new Date(this.currentViewDate.getFullYear(), this.currentViewDate.getMonth()+1, this.currentViewDate.getDate());
        this.resetView();
    }

    prevMonth(){
        this.currentViewDate=new Date(this.currentViewDate.getFullYear(), this.currentViewDate.getMonth()-1, this.currentViewDate.getDate());
        this.resetView();
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

    monthLength(date:Date) {
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    }

    weekHeaders(){
        let row=  new Row();
        for (let i = 0; i < 7; i++) {
            row.cells[i] = new Cell;
            let index = i + this.weekFirstDay;
            index -= (i + this.weekFirstDay < 7) ? 0 : 7;
            row.cells[i].content = this.weekDayNames[index];
        }
        return row;
    }

    dayNumberofMonthFirst(date:Date):number{
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }

    constructor(calendar: string) {
        if (!calendar || (['gregorian', 'jalali'].indexOf(calendar) < 0)) {
            calendar = 'gregorian';
        }
        switch (calendar) {
            case 'gregorian': {
                this.weekDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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