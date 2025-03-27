import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { PatientService } from '../services/patient.service';
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
export class RecipientDetailsComponent implements OnInit,AfterViewInit{
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
  filterControl = new FormControl('');
  isSearchApplied = false;
  // fromDate = new FormControl('');
  // toDate = new FormControl('');


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.fetchpatientData();
   
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchpatientData() {
    this.patientService.getPatients().subscribe( data => {
      console.log('data received:',data);
        this.dataSource.data = data; 
         this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching patient data:', error);
      }
    ); 
  }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource){
      this.dataSource.filter =filterValue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
      this.isSearchApplied = filterValue.length > 0;
    }

  
  }
}
