import { Component, Input, ElementRef, Inject, HostListener, OnChanges } from "@angular/core";
import { ListItem } from "../models/listitem.model";

@Component({
    selector: 'bl-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnChanges {
    @Input() items: ListItem[];
    @Input() width: number = 200;
    @Input() search: boolean = true;


    private selectedItem: ListItem;
    private listOpen: boolean = false;

    constructor( @Inject(ElementRef) private _elementRef: ElementRef) {
        this.init();        
    }

    ngOnChanges() {
        this.init();
    }

    init() {
        if (!this.items) {
            this.items = [];
        }
        this.selectedItem = this.items.length>0? this.items[0]: <ListItem>{};
    }

    itemClick(event: Event, item: ListItem) {
        this.selectedItem = item;
        this.listOpen = false;
    }

    boxClick() {
        this.listOpen = true;
        console.log(this._elementRef);
    }

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }
        if (!this._elementRef.nativeElement.contains(targetElement)) {
            this.listOpen = false;
        }
    }

}