import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { ContactComponent } from './components/contact/contact.component';
import { AddcontactComponent } from './components/contact/addcontact/addcontact.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'contact', pathMatch: 'full'
  },
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: 'contact',
        component: ContactComponent

      }
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
