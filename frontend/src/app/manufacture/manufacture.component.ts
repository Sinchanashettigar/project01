import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import * as countryCodes from 'country-codes-list';
import { APIService } from '../api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.css'],
})
export class ManufactureComponent implements OnInit {
  vaccineForm!: FormGroup;

  myCountryCodesObject: {
    countryCode: string;
    countryNameEn: string;
    countryCallingCode: string;
  }[] = [];
 


  

  constructor(private fb: FormBuilder, private apiService: APIService,private _snackBar: MatSnackBar,private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCountryCodes();
    

  }

  initializeForm() {
    this.vaccineForm = this.fb.group({
      vacc_name: ['', [Validators.required]],
      vacc_type: ['', [Validators.required]],
      approval_status: ['', [Validators.required]],
      production_date: ['', [Validators.required, this.nofutureDate]],
      expiry_date: [
        '',
        [Validators.required, this.noPastDate, this.expiryAfterProduction],
      ],
      vacc_batch: ['', Validators.required],
      dosage_instruction: ['', [Validators.required]],
      dosage_before: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dosage_after: ['', [Validators.required, this.dosageAfterValidator]],
      dosage_frequency: ['', [Validators.required]],
      age_group_name: ['', [Validators.required]],
      minimum_age: ['', [Validators.required]],
      maximum_age: ['', [Validators.required]],
      manufacture_name: ['', [Validators.required]],
      established_year: ['', [Validators.required]],
      contact_person_name: ['', [Validators.required]],
      email: ['', [Validators.required, this.emailValidator]],
      countryCode: ['+91', [Validators.required]],
      countryName: ['',Validators.required] ,
      phone_number: ['', [Validators.required, this.phoneNumberValidator]],
      description: ['', [Validators.required]],
      side_effects: ['', [Validators.required]],
      contraindications: ['', [Validators.required]],
    });
  }




  // it will prevent future date for production
  nofutureDate(control: AbstractControl): ValidationErrors | null {
    const today = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate > today ? { futureDate: true } : null;
  }

  noPastDate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const today = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate < today ? { paste: true } : null;
  }

  expiryAfterProduction(control: AbstractControl): ValidationErrors | null {
    const productionDate = control.root.get('productionDate')?.value;
    const expiryDate = control.value;

    if (!productionDate || !expiryDate) return null;

    const prodDate = new Date('productionDate');
    const expDate = new Date('expiryDate');
    return expDate <= prodDate ? { expiryBeforeProduction: true } : null;
  }

  dosageBeforeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    let errors: ValidationErrors = {};

    if (!value) {
      return { required: true };
    }
    if (!Number.isInteger(value) || value <= 0) {
      errors.invalidNumber = 'Dosage before must be  a +ve number';
    }

    return Object.keys(errors).length ? errors : null;
  }

  dosageAfterValidator(control: AbstractControl): ValidationErrors | null {
    const dosageBefore = control.root.get('dosagebefore')?.value;
    const dosageAfter = control.value;

    if (dosageAfter !== null && dosageBefore !== null) {
      return dosageAfter <= dosageBefore
        ? { invalidDosage: 'Dosage After must be greater than Dosage Before' }
        : null;
    }

    return null;
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmailFormat: true };
  }

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value ? control.value.replace(/^\+\d+\s*/, '') : '';

    let errors: ValidationErrors = {};

    if (!value) return { required: true };

    if (!/^\d+$/.test(value)) {
      errors.invalidCharacters = 'Only numbers are allowed';
    }
    if (value.length !== 10) {
      errors.invalidLength = 'Phone number must be 10 digits';
    }

    return Object.keys(errors).length ? errors : null;
  }

 private loadCountryCodes() {
     const rawCountryData = countryCodes.customList(
       'countryCode',
       '{countryCode},{countryNameEn},{countryCallingCode}'
     );
     this.myCountryCodesObject = Object.keys(rawCountryData).map((key) => {
      const [countryCode, countryNameEn, countryCallingCode] =
        rawCountryData[key].split(',');
        return { countryCode, countryNameEn, countryCallingCode };
    });
  }
  onCountryCodeChange(event: any) {
    const selectedCountry = event.value;
    const selectedCode = selectedCountry.countryCallingCode;
    const selectedCountryName = selectedCountry.countryNameEn;     
    let currentValue = this.vaccineForm.get('phoneNumber')?.value || '';

    if (!currentValue.startsWith(`+${selectedCode}`)) {
      currentValue = `+${selectedCode} ${currentValue.replace(
        /^\+\d+\s*/,
        ''
      )}`;
    }
    this.vaccineForm.patchValue({ phoneNumber: currentValue,countryName: selectedCountryName });
  }
  ageGroups = [
    { name: 'Infant', ageRange: '0 - 1 year' },
    { name: 'Toddler', ageRange: '1 - 3 years' },
    { name: 'Preschool', ageRange: '3 - 5 years' },
    { name: 'Child', ageRange: '5 - 12 years' },
    { name: 'Teenager', ageRange: '12 - 18 years' },
    { name: 'Adult', ageRange: '18 - 65 years' },
    { name: 'Senior', ageRange: '65+ years' }
  ];


  
  onSubmit() {
    console.log('Form submitted!', this.vaccineForm.value);
    this.apiService.postData1(this.vaccineForm.value).subscribe(
      (response) => {
        if (response.status === "auth-01") {
          this._snackBar.open("✔ Submitted successfully", "Done", { duration: 5000 });
          console.log("Added successfully");
          this.router.navigate(['/manufacture-details']);
        } else {
          console.log("Failed");
        }
      },
      (error) => {
        console.error("Error submitting form:", error);
      }
    );
  }
 
}