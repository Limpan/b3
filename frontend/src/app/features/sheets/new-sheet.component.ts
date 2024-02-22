import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../shared/components/page-layout.component';
import { RowComponent } from './row.component';
import { KeyboardComponent } from '../../shared/components/keyboard/keyboard.component';
import { Row } from '../../core/models/row.model';
import { SheetService } from '../../core/services/sheet.service';

@Component({
  selector: 'app-new-sheet',
  standalone: true,
  imports: [PageLayoutComponent, RowComponent, KeyboardComponent],
  templateUrl: './new-sheet.component.html'
})
export class NewSheetComponent {
  rows: Row[] = []

  constructor(private sheetService: SheetService) {}

  newItem(item: Row) {
    console.log({item})
    this.rows.push(item)
  }

  saveSheet() {
    console.log('Save sheet.')

    this.sheetService.createSheet({rows: this.rows}).subscribe((sheet) => console.log({sheet}));
  }
}
