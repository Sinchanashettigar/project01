import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import {  ManufactureComponent  } from  './manufacture/manufacture.component';
 import { PatientComponent } from './patient/patient.component';
import { TableComponent } from './table/table.component';
import { RecipientDetailsComponent } from './recipient-details/recipient-details.component'; // ✅ Import the component

const routes: Routes = [
  {
     path:'manufacture',component:ManufactureComponent
   },
  {
    path:'patient',component:PatientComponent
   },
   {
      path:'table',component:TableComponent
   },
   { path: 'recipient-details', component: RecipientDetailsComponent },
   {
    path:'',redirectTo:'/manufacture', pathMatch:'full'
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
