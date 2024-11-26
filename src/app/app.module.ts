import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { MasterComponent } from './components/master/master.component';

import {HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddcontactComponent } from './components/contact/addcontact/addcontact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditContactComponent } from './components/contact/edit-contact/edit-contact.component';
import { DeleteContactComponent } from './components/contact/delete-contact/delete-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    MasterComponent,
    AddcontactComponent,
    EditContactComponent,
    DeleteContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
