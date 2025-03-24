import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  id: string;
  dob: string;
  street: string;
}

@Component({
  selector: 'app-recipient-details',
  styleUrls: ['./recipient-details.component.css'],
  templateUrl: './recipient-details.component.html',
})
export class RecipientDetailsComponent implements AfterViewInit,OnInit{
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'gender',
    'phone_number',
    'id',
    'dob',
    'street'
  ];
  
  dataSource = new MatTableDataSource<UserData>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchpatientData();
  }

  fetchpatientData() {
    this.http.get<UserData[]>('http://localhost:3000/api/patients').subscribe(
      (data) => {
        this.dataSource.data = data; 
        if (this.paginator) this.dataSource.paginator = this.paginator;
        if (this.sort) this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching patient data:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
