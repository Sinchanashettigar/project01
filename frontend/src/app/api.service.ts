import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  postData(data: any): Observable<any> {
    return this.http.post(this.apiUrl+'/patient', data).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

  postData1(data: any): Observable<any> {
    return this.http.post(this.apiUrl+'/manufacture/', data).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }
}

//   getData(): Observable<any[]> { 
//     return this.http.get<any[]>(this.apiUrl);
//   }
// } 

