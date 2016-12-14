import {Directive, ElementRef, Input, Output, EventEmitter, HostListener} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs";

@Directive({
    selector: '[bl-loader]'
})
export class LoaderDirective {
    @Input('bl-loader') destination: Observable<any>;
    @Output('load-data') loadData: EventEmitter<any> = new EventEmitter<any>();
    @Output('load-error') loadError: EventEmitter<any> = new EventEmitter<any>();
    @Output('load-complete') loadComplete: EventEmitter<any> = new EventEmitter<any>();

    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    loading: HTMLElement;

    constructor(private el: ElementRef) {
        this.loading = document.createElement("span");
        this.loading.setAttribute("class", "fa fa-calendar");
    }

    @HostListener('click') onClick() {
        let temp = this.el.nativeElement.innerHTML;
        this.el.nativeElement.innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i>";
        this.destination.subscribe(
            res => this.loadData.emit(res),
            err => {
                this.loadError.emit(err);
                this.el.nativeElement.innerHTML = temp;
            },
            () => {
                this.loadComplete.emit();
                this.el.nativeElement.innerHTML = temp;
            }
        )
    }
}