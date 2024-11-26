import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { contact } from '../../interface/contact';
import { ContactService } from '../../service/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contacts: contact[] = [];

  showAddForm = false;
  showEditForm = false;
  showDeleteForm = false;

  editContact: any; 
  deleteContact: any;

  @Output() getContact : EventEmitter<contact> = new EventEmitter<contact>();

  pagination = {
    "pageNumber": 1,
    "itemsPerPage": 5
  }

  pagesize = 3;
  current_Page = 1;
  totalContacts = 0;

  constructor(private fb: FormBuilder, 
    private toastr: ToastrService,
    private contactService: ContactService) {
  }

  showAddContactForm(){
    this.showAddForm = true;
  }

  ngOnInit() {
    this.GetContacts();
  }
  
  GetContacts(){
    this.contactService.GetContacts(this.pagination).subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.result);
        this.contacts = response.result.contacts;
        this.totalContacts = response.result.totalContacts;
      },
      error: (error) => {
        Swal.fire('Error occured while retrieving the contacts.');
      }
    });
  }

  onFilterChange(page: any){
    console.log(page);
    this.pagination.pageNumber = page;
    this.GetContacts();
    
  }

  updatePagination(){
    this.GetContacts();
  }

  HideAddContactForm(event: any){
    this.showAddForm = event;
    this.GetContacts();
  }

  HideEditContactForm(event: any){
    this.showEditForm = event;
    this.GetContacts();
  }

  HideDeleteContactForm(event: any){
    this.showDeleteForm = event;
    this.GetContacts();
  }

  onEdit(contact: any){
    this.showEditForm = true;
    this.editContact = contact;
  }

  onDelete(contact: any){
    this.showDeleteForm = true;
    this.deleteContact = contact;
  }


}
