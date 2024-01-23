import { Component, Input } from '@angular/core';
import { Row } from '../row';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [NgIf],
  templateUrl: './row.component.html',
  styleUrl: './row.component.css'
})
export class RowComponent {
  @Input() row?: Row;
}
