


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManufactureService } from '../services/manufacture.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  expandedRow: any = null;
  isEditing: boolean = false;

  constructor(
    private router: Router,
    private manufactureService: ManufactureService,
    private snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['data']) {
      this.expandedRow = navigation.extras.state['data'];
      console.log('Received Data:', this.expandedRow);
      
    }
  }

  ngOnInit(): void {}

  enableEditing(): void {
    this.isEditing = true;
  }

  
  saveChanges(): void {
    if (!this.expandedRow || !this.expandedRow._id) {
      console.error(' Missing _id in expandedRow:', this.expandedRow);
      return;
    }
  
    const id = this.expandedRow._id;
  
    this.manufactureService.updateManufacture(id, this.expandedRow).subscribe({
      next: (response) => {
        console.log(' Vaccine updated:', response);
        this.snackBar.open('Vaccine updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.isEditing = false;
        this.router.navigate(['/manufacturer-details']);
      },
      error: (error) => {
        console.error(' Error updating vaccine:', error);
        this.snackBar.open('Failed to update vaccine.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
  
      }
    });
  }
}  
    

