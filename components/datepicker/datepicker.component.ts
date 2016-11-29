import {
    Component,
    Input,
    Output,
    EventEmitter,
    HostListener,
    ElementRef,
    Inject,
    OnChanges,
    SimpleChanges
} from "@angular/core";
import {DateUnit} from "./dateunit";
import {CalendarBase, Calendar} from "./calendarbase";
import {Gregorian} from "./calendars/gregorian";
import {Jalali} from "./calendars/jalali";
import {Row, Cell} from "./elements";
import {DateToStringPipe, NameOfMonthPipe} from "./pipes";

@Component({
    selector: 'bl-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css'],
    providers: [DateToStringPipe, NameOfMonthPipe]
})
export class DatepickerComponent implements OnChanges {
    @Input() calendar: string;
    @Input() width: number = 200;
    @Output() modelChange: EventEmitter<Date> = new EventEmitter<Date>();
    @Input() model: Date;

    private selectedDate: DateUnit;
    private currentViewDate: DateUnit;
    private pickerOpen: boolean = false;
    private rows: Row[];
    private header: Row;
    private _c: Calendar<CalendarBase>;

    constructor(@Inject(ElementRef) private _elementRef: ElementRef) {
        this.init();
    };

    ngOnChanges(changes: SimpleChanges): void {
        this.init();
    }

    init() {
        if (!this.model) {
            return;
        }
        if (this.calendar && this.calendar.toLowerCase() == 'jalali') {
            this._c = new Calendar<Jalali>(Jalali);
        } else {
            this._c = new Calendar<Gregorian>(Gregorian);
        }
        this.selectedDate = this._c._calendar.dateToDateUnit(this.model);
        this.currentViewDate = this._c._calendar.dateToDateUnit(this.model);
        this.resetView();
    }

    resetView() {
        this.header = this._c.weekHeaders();
        let currentMonthLength = this._c.monthLength(this.currentViewDate);
        let dayNumberofMonthFirst = this._c.dayNumberofMonthFirst(this.currentViewDate);
        this.rows = new Array<Row>();
        let cellIndex = 0;
        for (let weekIndex = 0; weekIndex < Math.ceil((currentMonthLength + dayNumberofMonthFirst) / 7); weekIndex++) {
            this.rows[weekIndex] = new Row();
            for (let colIndex = 0; colIndex < 7; colIndex++) {
                this.rows[weekIndex].cells[colIndex] = new Cell();
                if (weekIndex == 0 && colIndex < dayNumberofMonthFirst) {
                    continue;
                }
                if (cellIndex < currentMonthLength) {
                    this.rows[weekIndex].cells[colIndex].content = (cellIndex + 1).toString();
                }
                cellIndex++;
            }
        }
    }

    private setDate(cell: Cell) {
        this.selectedDate.year = this.currentViewDate.year;
        this.selectedDate.month = this.currentViewDate.month;
        this.selectedDate.day = +cell.content;
    }

    private confirm() {
        this.model = this._c._calendar.dateUnitToDate(this.selectedDate);
        this.modelChange.emit(this.model);
        this.pickerOpen = false;
    }

    private today() {
        this.model = new Date();
        this.modelChange.emit(this.model);
        this.pickerOpen = false;
    }

    private nextMonth() {
        this.currentViewDate.addMonth();
        this.resetView();
    }

    private prevMonth() {
        this.currentViewDate.subMonth();
        this.resetView();
    }

    private pickerClick() {
        this.pickerOpen = true;
        this.init();
    };

    private cancel() {
        this.pickerOpen = false;
    }

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }
        if (!this._elementRef.nativeElement.contains(targetElement)) {
            this.cancel();
        }
    };

}
;