import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { ManufactureService } from '../services/manufacture.service';
import { Router } from '@angular/router';

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
export class ManufactureDetailsComponent implements OnInit ,AfterViewInit{
  vaccineForm: FormGroup;
  displayedColumns: string[] = [
    'vaccineName', 
    'vaccineType', 
    'productionDate', 
    'expiryDate', 
    'ageGroup', 
    'manufactureName', 
    'description',
    'actions'
    
  ];
 fromDate: Date | null = null;
 toDate : Date | null = null;

 allData = [];

 filteredData = [...this.allData];
 noRecords = false;
 dataFound = false;


  
  dataSource = new MatTableDataSource<UserData>([]);
  filterControl = new FormControl('');
  isSearchApplied = false; 
  expandedRow: UserData | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private manufactureService: ManufactureService,private router:Router) {
   

  }
  
 
  originalData: any[] = [];
  ngOnInit() {
    this.fetchManufactureData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetchManufactureData() {
    this.manufactureService.getManufacturers().subscribe(
       data => {
      console.log('data received:',data);


      this.dataSource.data = data; 

      this.dataSource.data = data.map((item: any) => ({
        vaccineName: item.vaccine_produced?.vacc_name ?? '',  
        vaccineType: item.vaccine_produced?.vacc_type ?? '',  
        productionDate: item.vaccine_produced?.production_date 
          ? new Date(item.vaccine_produced.production_date).toLocaleDateString() 
          : '',  
        expiryDate: item.vaccine_produced?.expiry_date 
          ? new Date(item.vaccine_produced.expiry_date).toLocaleDateString() 
          : '',  
        ageGroup: item.target_age_group?.age_group_name ?? '',  
        manufactureName: item.contact_information?.manufacture_name ?? '',  
        description: item.vaccine_detail?.description ?? '',  
      }));
            
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error) => {
        console.error("Error fetching manufacturer data:", error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
      this.isSearchApplied = filterValue.length > 0;
    }
  }
  applyDateFilter(){
    if(this.fromDate && this.toDate){
      this.filteredData=this.allData.filter(item =>
        item.date >= this.fromDate! && item.date <= this.toDate!
      );
      this.noRecords =  this.filteredData.length === 0;
      this.dataFound = this.filteredData.length > 0;

    }else
    {
      this.filteredData =  [...this.allData];
      this.noRecords = false;
      this.dataFound = false;
    }
  }

 
 
  goToDetails(rowData: any) {
    console.log('Navigating with data:', rowData); 
    this.router.navigate(['details'],{ state: { data: rowData } });
  }
}