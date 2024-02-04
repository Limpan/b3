import { Component, Input } from '@angular/core';
import { Row } from '../../core/models/row.model';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [],
  templateUrl: './row.component.html'
})
export class RowComponent {
  @Input() row!: Row;
}
