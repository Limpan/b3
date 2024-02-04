import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RowComponent } from "../../shared/components/row/row.component";
import { Sheet } from '../../core/models/sheet.model';
import { SheetService } from '../../core/services/sheet.service';
import { PageLayoutComponent } from '../../shared/components/page-layout.component';

@Component({
    selector: 'app-sheets',
    standalone: true,
    templateUrl: './sheets.component.html',
    imports: [NgFor, RowComponent, PageLayoutComponent]
})
export class SheetsComponent implements OnInit {
  sheets: Sheet[] = []
  rows = [
    {seller: 'X-03', amount: 20},
    {seller: 'P-07', amount: 25},
    {seller: 'A-03', amount: 10},
    {seller: 'R-01', amount: 100},
    {seller: 'A-01', amount: 35},
    {seller: 'X-03', amount: 10},
  ]

  constructor(private sheetService: SheetService) {}

  ngOnInit(): void {
    this.getSheets();
  }

  getSheets(): void {
    this.sheetService.getSheets().subscribe(sheets => this.sheets = sheets);
  }
}
