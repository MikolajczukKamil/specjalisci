import {Component, Input, Output} from '@angular/core';

@Component({
  selector: 'app-custom-slide-toggle',
  templateUrl: './custom-slide-toggle.component.html',
  styleUrls: ['./custom-slide-toggle.component.scss']
})
export class CustomSlideToggleComponent {

  @Input() leftOption?: string;
  @Input() rightOption?: string;
  @Input() onOff?: boolean;

  @Output() dataEmitter?: boolean;

  toggle() {
    this.onOff = !this.onOff;
    this.dataEmitter = this.onOff;
  }
}
