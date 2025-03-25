import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ManufactureService } from '../services/manufacture.service';

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
  displayedColumns: string[] = [
    'vaccineName', 
    'vaccineType', 
    'productionDate', 
    'expiryDate', 
    'ageGroup', 
    'manufactureName', 
    'description'
  ];

  // manufacturers: any[] = [];
  // dataSource: MatTableDataSource<UserData>;
  
  dataSource = new MatTableDataSource<UserData>([]);
  filterControl = new FormControl('');
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private manufactureService: ManufactureService) {}
  fromDate: Date | null = null;
  toDate: Date | null = null;
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
    }
  }
}
