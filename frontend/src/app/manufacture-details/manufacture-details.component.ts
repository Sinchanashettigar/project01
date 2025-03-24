import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

export interface UserData {
  vaccineName: string;
  vaccineType: string;
  productionDate: string;
  expiryDate: string;
  ageGroup: string;
  manufactureName: string;
  description: string;
}

@Component({
  selector: 'app-manufacture-details',
  styleUrls: ['./manufacture-details.component.css'],
  templateUrl: './manufacture-details.component.html',
})
export class ManufactureDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'vaccineName', 
    'vaccineType', 
    'productionDate', 
    'expiryDate', 
    'ageGroup', 
    'manufactureName', 
    'description'
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchManufactureData();
  }

  fetchManufactureData() {
    this.http.get<UserData[]>('http://localhost:5000/api/manufacturers') // Update with your API URL
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.error("Error fetching manufacturer data:", error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
