import { Component, Input, ElementRef, Inject, HostListener } from "@angular/core";
import { ListItem } from "../models/listitem.model";

@Component({
    selector: 'bl-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
    @Input() items: ListItem[] = [];
    @Input() width: number = 200;
    @Input() search: boolean = true;


    private selectedItem: ListItem;
    private listOpen: boolean = false;

    constructor( @Inject(ElementRef) private _elementRef: ElementRef) {
        this.items = [{ label: "a", value: { id: 1 } }, { label: "b", value: { id: 2 } },{ label: "ab", value: { id: 3 } },{ label: "aa", value: { id: 4 } },{ label: "abc", value: { id: 5 } }];
        this.selectedItem = this.items[0];
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