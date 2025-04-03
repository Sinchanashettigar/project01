import { Component, OnInit } from '@angular/core';
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
    }
toggleRow(row: UserData) {
   
    console.log('Selected row:', row);

    this.expandedRow = this.expandedRow === row ? null : row;
    console.log('Expanded row set to:', this.expandedRow);
  }
}