import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface UserData {
  vaccine_produced: {
    vacc_name:string,
    vacc_type:string,
    approval_status:string,
    expiry_date:string,
    production_date:string,
    vacc_batch:string,
    dosage_after:string,
    dosage_before:string,
    dosage_frequency:string,
  },
  target_age_group: {
    age_group_name:string,
    minimum_age:string,
    maximum_age:string,
  },
  contact_information: {
    manufacture_name:string,
    established_year:string,
    contact_person_name:string,
    email:string,
    phone_number:string,
  },
  vaccine_detail: {
    description:string,
    dosage_instruction:string,
  },
  side_effects: string,
  contraindication:string
};


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    
    expandedRow: any = null;

    constructor(private router: Router) { 
      
        const navigation = this.router.getCurrentNavigation();
      
      if (navigation?.extras.state?.['data']) {
        this.expandedRow = navigation.extras.state['data'];
        console.log('Received Data:', this.expandedRow);
      
      }
    
    }
  

  
    ngOnInit(): void {
      console.log('ExpandedRow:', this.expandedRow);
    }

}