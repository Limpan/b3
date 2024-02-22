import { Injectable } from '@angular/core';
import { Sheet } from '../models/sheet.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getSheets(): Observable<Sheet[]> {
    // const SHEETS = of([{id: 1, rows: []}, {id: 2, rows: []}])
    return this.http.get<Sheet[]>(this.apiUrl + '/sheets/');
  }

  getSheet(id: number): Observable<Sheet> {
    return this.http.get<Sheet>(this.apiUrl + '/sheets/' + id);
  }

  createSheet(sheet: Omit<Sheet, "id">): Observable<Sheet> {
    return this.http.post<Sheet>(this.apiUrl + '/sheets/', sheet)
  }
}
