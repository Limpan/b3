import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Sticker } from '../../core/models/sticker.model';

@Component({
  selector: 'app-sticker',
  standalone: true,
  imports: [],
  templateUrl: './sticker.component.html'
})
export class StickerComponent {
  active = false;

  @Input() sticker?: Sticker;

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onDeleteSticker = new EventEmitter<Event>();

  handleClick() {
    this.active = !this.active
    console.log("CLICK")
  }
}