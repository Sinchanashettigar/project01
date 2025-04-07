import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/api/patients';

  constructor(private http: HttpClient) { }

  getPatients():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
  postPatients(patient: any): Observable<any>{
    return this.http.post(this.apiUrl,patient);

  }
 

}
