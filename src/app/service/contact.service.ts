import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { contact } from '../interface/contact';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  GetContacts(objPage: any):Observable<any>{
    return this.http.get<any>(`${environment.base_url}Contact/GetAllContactPage?pageNumber=${objPage.pageNumber}&itemsPerPage=${objPage.itemsPerPage}`);
  }

  AddContact(contactDetails: contact, type: any){

    if(type == 'Add') {
      contactDetails.id = 0;
      return this.http.post(`${environment.base_url}Contact/Contact`, contactDetails);
    }
    else {
      return this.http.put(`${environment.base_url}Contact/UpdateContact?id=${contactDetails.id}`, contactDetails);
    }
  }

  GetContactById(id: any):Observable<any>{
    return this.http.get<any>(`${environment.base_url}Contact/ContactById?id=${id}`);
  }

  DeleteContact(id: any):Observable<any>{
    return this.http.delete(`${environment.base_url}Contact/DeleteContact?id=${id}`);
  }

}
