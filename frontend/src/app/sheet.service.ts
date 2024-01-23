import { Injectable } from '@angular/core';
import { Sheet } from './sheet';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  private sheetsUrl = 'http://localhost:5000/sheets';

  constructor(private http: HttpClient) { }

  getSheets(): Observable<Sheet[]> {
    // const SHEETS = of([{id: 1, rows: []}, {id: 2, rows: []}])
    return this.http.get<Sheet[]>(this.sheetsUrl);
  }
}
