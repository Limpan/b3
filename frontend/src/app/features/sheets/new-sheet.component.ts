import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../shared/components/page-layout.component';
import { RowComponent } from './row.component';
import { KeyboardComponent } from '../../shared/components/keyboard/keyboard.component';
import { Row } from '../../core/models/row.model';

@Component({
  selector: 'app-new-sheet',
  standalone: true,
  imports: [PageLayoutComponent, RowComponent, KeyboardComponent],
  templateUrl: './new-sheet.component.html'
})
export class NewSheetComponent {
  rows: Row[] = [
    {seller: "X-07", amount: 25}
  ]

  newItem(item: string) {
    console.log({item})
    this.rows.push({seller: item, amount: 25})
  }
}
