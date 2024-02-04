import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../shared/components/page-layout.component';
import { RowComponent } from './row.component';

@Component({
  selector: 'app-new-sheet',
  standalone: true,
  imports: [PageLayoutComponent, RowComponent],
  templateUrl: './new-sheet.component.html'
})
export class NewSheetComponent {

}
