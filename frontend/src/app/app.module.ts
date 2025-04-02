import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {DemoMaterialModule} from './material-module';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { PatientComponent } from './patient/patient.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatTableModule } from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { APIService } from './api.service';
import { ManufactureDetailsComponent } from './manufacture-details/manufacture-details.component';
import { RecipientDetailsComponent } from './recipient-details/recipient-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
ManufactureComponent,
    PatientComponent,
    SnackbarComponent,
    ManufactureDetailsComponent,
    RecipientDetailsComponent,
    DetailsComponent,
    
    
 
    
 
  
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatRadioModule,
    MatStepperModule,
   MatButtonModule,
   MatSelectModule,
   MatInputModule,
   MatFormFieldModule,
   MatTableModule,
   MatTooltipModule,
   FormsModule,
   MatSortModule,
   MatDialogModule,
   MatPaginatorModule
   
   
  ],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
