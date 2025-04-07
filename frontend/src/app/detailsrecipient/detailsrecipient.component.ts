import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-detailsrecipient',
  templateUrl: './detailsrecipient.component.html',
  styleUrls: ['./detailsrecipient.component.css']
})
export class DetailsrecipientComponent implements OnInit {
 myForm: FormGroup;
  expandedRow: any = null;
  isEditing: boolean = false;


  constructor(private fb: FormBuilder,private router: Router , private patientService : PatientService,private _snackBar: MatSnackBar) {
    const navigation = this.router.getCurrentNavigation();
  
  if (navigation?.extras.state?.['data']) {
    this.expandedRow = navigation.extras.state['data'];
    console.log('Received Data:', this.expandedRow);
  } 
  this.myForm = this.fb.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postal_code: ['', Validators.required],
    country: ['', Validators.required],
  });
   }

  ngOnInit(): void {

  }
   enableEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    this.isEditing = true;
   
console.log('Saved data:', this.expandedRow);

/* POST API FOR UPDATE*/
     this.patientService.postPatients(this.expandedRow).subscribe({
      next: (data) => {
        console.log('patient data updated',data);
        this._snackBar.open('Patient  Data Updated successfully ','Done',{
          duration: 3000,
          });
          this.router.navigate(['/recipient-details']);
        
      },
      error: (error) => {
        console.error('Error updating patient data:',error);
        this._snackBar.open('Update Failed.Try again.','close',{
          duration: 3000,
        });
      }
     });
  }

}
