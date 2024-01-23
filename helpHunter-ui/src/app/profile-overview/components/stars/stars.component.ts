import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-stars',
    templateUrl: './stars.component.html',
    styleUrls: ['./stars.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StarsComponent),
            multi: true,
        },
    ],
})
export class StarsComponent implements ControlValueAccessor {
    @Input() rating: number = 0;
    @Input() isEditable: boolean = false;

    savedRating: number | undefined = undefined;

    constructor() {}

    onChanges!: (rating: number) => void;
    onTouched!: () => void;

    writeValue(rating: number): void {
        this.rating = rating;
    }
    registerOnChange(fn: (rating: number) => void): void {
        this.onChanges = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.isEditable = !isDisabled;
    }

    setRating(rating: number): void {
        if (this.isEditable) {
            this.rating = rating;
            this.savedRating = rating;
            this.onChanges(this.rating);
        }
    }
}
