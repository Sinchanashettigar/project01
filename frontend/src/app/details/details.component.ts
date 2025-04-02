import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup} from '@angular/forms';

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
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    // vaccineForm!: FormGroup;
  
    // expandedRow: UserData | null = null;
    expandedRow: any = null;

    constructor(private router: Router) { 
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state && navigation.extras.state['data']) {
        this.expandedRow = navigation.extras.state['data'];
        console.log('✅ Received Data:', this.expandedRow); 
      } else {
        console.warn('⚠ No data received, initializing empty object');
        this.expandedRow = {  // Only initialize if no data is received
          vacc_name: '',
          vacc_type: '',
          approval_status: '',
          production_date: '',
          expiry_date: '',
          vacc_batch: '',
          dosage_instruction: '',
          dosage_before: '',
          dosage_after: '',
          dosage_frequency: '',
          age_group_name: '',
          minimum_age: '',
          maximum_age: '',
          manufacture_name: '',
          established_year: '',
          contact_person_name: '',
          email: '',
          countryCode: '+91',
          countryName: '',
          phone_number: '',
          description: '',
          side_effects: '',
          contraindications: '',
        };
      }
    }
    
   
  

  

    ngOnInit(): void {
      if (this.expandedRow && 'vaccineName' in this.expandedRow) {
        this.expandedRow = {
          vacc_name: this.expandedRow.vaccineName,
          vacc_type: this.expandedRow.vaccineType,
          approval_status: this.expandedRow.ApprovalStatus,
          production_date: this.expandedRow.productionDate,
          expiry_date: this.expandedRow.expiryDate,
          vacc_batch: '',
          dosage_instruction: '',
          dosage_before: '',
          dosage_after: '',
          dosage_frequency: '',
          age_group_name: this.expandedRow.ageGroup,
          minimum_age: '',
          maximum_age: '',
          manufacture_name: this.expandedRow.manufactureName,
          established_year: '',
          contact_person_name: '',
          email: '',
          countryCode: '+91',
          countryName: '',
          phone_number: '',
          description: this.expandedRow.description,
          side_effects: '',
          contraindications: '',
        };
      }
    }
   
    
toggleRow(row: UserData) {
   
    console.log('Selected row:', row);

    this.expandedRow = this.expandedRow === row ? null : row;
    console.log('Expanded row set to:', this.expandedRow);
  }
}
