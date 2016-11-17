import {Component, Input} from "@angular/core";
import {ListItem} from "../models/listitem.model";

@Component({
    selector: 'bl-dropdown',
    templateUrl: './dropdown.component.html'
})
export class DropdownComponent{
@Input() items:ListItem[];

constructor(){

}

}