import {Component, Input, ElementRef, Inject, HostListener, OnChanges, Output, EventEmitter} from "@angular/core";
import {ListItem} from "../models/listitem.model";

@Component({
    selector: 'bl-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnChanges {
    @Input() items: ListItem[];
    @Input() searchable: boolean = true;

    @Input() selection: ListItem;
    @Output() selectionChange: EventEmitter<ListItem> = new EventEmitter<ListItem>();

    private listOpen: boolean = false;

    private suggestions: ListItem[];

    constructor(@Inject(ElementRef) private _elementRef: ElementRef) {
        this.init();
    }

    ngOnChanges() {
        this.init();
    }

    init() {
        if (!this.items) {
            this.items = [];
        }
        this.selection = this.items.length > 0 ? this.items[0] : <ListItem>{};
        this.suggestions = this.items;
    }

    onItemSelect(event: Event, item: ListItem) {
        this.selection = item;
        this.selectionChange.emit(item);
        this.listOpen = false;
    }

    onDropdownClick() {
        this.listOpen = true;
    }

    searchTerm(term: string) {
        if (term === '') {
            this.suggestions = this.items;
            return;
        }

        this.suggestions = [];

        for (let item of this.items) {
            if (item.label.toLowerCase().indexOf(term.toLowerCase()) > -1) {
                this.suggestions.push(item);
            }
        }
    }

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!
                targetElement
        ) {
            return;
        }
        if (!this._elementRef.nativeElement.contains(targetElement)) {
            this.listOpen = false;
        }
    }

}