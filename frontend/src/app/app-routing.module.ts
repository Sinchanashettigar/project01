import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import {  ManufactureComponent  } from  './manufacture/manufacture.component';
 import { PatientComponent } from './patient/patient.component';
 import { ManufactureDetailsComponent } from './manufacture-details/manufacture-details.component';
import { RecipientDetailsComponent } from './recipient-details/recipient-details.component';
import { DetailsComponent } from './details/details.component'; 
import { DetailsrecipientComponent } from './detailsrecipient/detailsrecipient.component';

const routes: Routes = [
  {
     path:'manufacture',component:ManufactureComponent
   },
  {
    path:'patient',component:PatientComponent
   },
   
   {path:'manufacture-details',component:ManufactureDetailsComponent},
  { path: 'manufacture-details/:id', component: DetailsComponent },
   
   {path:'recipient-details',component:RecipientDetailsComponent},
  {path: 'recipient-details/:id',component:DetailsrecipientComponent},
 
   {
    path:'',redirectTo:'/manufacture', pathMatch:'full'
   },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
