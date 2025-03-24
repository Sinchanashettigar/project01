import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ManufactureService {
  private apiUrl = 'http://localhost:5000/api/manufacturers'; // ✅ Correct API URL

  constructor(private http: HttpClient) {}

  getManufacturers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching manufacturers:', error);
        return throwError(() => new Error('Failed to fetch manufacturers.'));
      })
    );
  }
}