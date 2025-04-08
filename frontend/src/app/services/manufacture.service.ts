import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ManufactureService {
  private apiUrl = 'http://localhost:3000/api/manufacturers'; 

  constructor(private http: HttpClient) {}

   getManufacturers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getAllManufacturers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/manufacturers');
  }
  
 updateManufacture(id: string, manufacturer: any): Observable<any> {
  return this.http.put<any>(`http://localhost:3000/api/manufacturers/${id}`, manufacturer);
}

  
 
  
  }

