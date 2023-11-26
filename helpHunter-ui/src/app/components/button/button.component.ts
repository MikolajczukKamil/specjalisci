import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
    @Input() type: 'basic' | 'raised' | 'stroked' | 'flat' = 'flat';
    @Input() size: 'small' | 'medium' | 'large' = 'medium';
    @Input() color: 'primary' | 'accent' | 'warn' | undefined = 'primary';
    @Input() text: string = '';
    @Input() disabled: boolean = false;
    @Input() submit: boolean = false;
    @Input() class: string = '';
    @Input() style: string = '';
}
