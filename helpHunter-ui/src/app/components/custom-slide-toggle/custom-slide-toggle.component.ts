import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-custom-slide-toggle',
  templateUrl: './custom-slide-toggle.component.html',
  styleUrls: ['./custom-slide-toggle.component.scss']
})
export class CustomSlideToggleComponent {

  @Input() leftOption?: string;
  @Input() rightOption?: string;
  @Input() onOff?: boolean;
  @Input() canChanege?: boolean;

  @Output() dataEmitter = new EventEmitter<boolean>();

  toggle() {
    if (this.canChanege) {
      this.onOff = !this.onOff;
      this.dataEmitter.emit(this.onOff);
    }
  }
}
