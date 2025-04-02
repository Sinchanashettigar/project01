import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from '../services/patient.service';
// import { Patient } from '..src/app/patient';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface UserData {
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  id: string;
  dob: string;
  email?: string;
  bloodgroup?: string;
  address?: {
    street: string;
    city: string;
    postal_code: string;
    country: string;
    
  };
}

@Component({
  selector: 'app-recipient-details',
  styleUrls: ['./recipient-details.component.css'],
  templateUrl: './recipient-details.component.html',
})
export class RecipientDetailsComponent implements OnInit, AfterViewInit {
  myForm: FormGroup; 
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'gender',
    'phone_number',
    'id',
    'dob',
    'street',
    'actions',
  ];
  fromDate: Date | null = null;
  toDate: Date | null = null;

  allData = [];

  filteredData = [...this.allData];
  noRecords = false;
  dataFound = false;

  dataSource = new MatTableDataSource<UserData>([]);
  filterControl = new FormControl('');
  isSearchApplied = false;
  expandedRow: UserData | null = null;

  // expandedRow: any = null;

  // isPanelExpanded = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patientService: PatientService,private fb: FormBuilder) {
    this.myForm = this.fb.group({
      vaccinename: ['', Validators.required],
      dosageform: ['', Validators.required],
      vaccinedatepicker: ['', Validators.required],
      hasChronicIllness: [''],
      chronicIllnessDetails: [''],
      hasAllergies: [''],
      allergyDetails: [''],
      hasmedications: [''],
      medicationsDetails: [''],
      hasillnesses: [''],
      illnessesDetails: [''],
      hasPhysicalDisabilities: [''],
      mentalhealthDetails: [''],
      hassurgeries: [''],
      surgeriesDetails: [''],
      hashospitalized: [''],
      hospitalizedDetais: [''],
      hasmedicalconditions: [''],
      medicalconditionsDetails: [''],
      hasDietaryRestrictions: [''],
      isAdditionalVaccineDetailsUsed: ['']
    });
  }
  

  ngOnInit() {
    this.fetchpatientData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchpatientData() {
    this.patientService.getPatients().subscribe(
      (data) => {
        console.log('data received:', data);

        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching patient data:', error);
      }
    );
  }
  
  toggleRow(row: UserData) {
   
    console.log('Selected row:', row);

    this.expandedRow = this.expandedRow === row ? null : row;
    console.log('Expanded row set to:', this.expandedRow);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
      this.isSearchApplied = filterValue.length > 0;
    }
  }
  applyDateFilter() {
    if (this.fromDate && this.toDate) {
      // if (this.fromDate && this.toDate) {
      this.filteredData = this.allData.filter(
        (item) => item.date >= this.fromDate! && item.date <= this.toDate!
      );

      this.noRecords = this.filteredData.length === 0;
      this.dataFound = this.filteredData.length > 0;
    } else {
      this.filteredData = [...this.allData];
      this.noRecords = false;
      this.dataFound = false;
    }
  }

}
