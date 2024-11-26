import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../../service/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { contact } from '../../../interface/contact';
declare var $:any;

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent {


  @Input() getContact: any;
  @Output() public HideEditForm: EventEmitter<boolean> = new EventEmitter<boolean>();


  contactForm = this.fb.group({
    id: 0,
    firstName: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder,
    private contactService: ContactService,
    private toastr: ToastrService,
    private router: Router){

  }

  get firstName() {
    return this.contactForm.controls['firstName'];
  }

  get lastName() {
    return this.contactForm.controls['lastName'];
  }

  get email() {
    return this.contactForm.controls['email'];  
  }



  ngOnInit(){
    console.log(this.getContact);
    this.contactForm.patchValue({
      firstName: this.getContact.firstName,
      lastName: this.getContact.lastName,
      email: this.getContact.email,
      id: this.getContact.id
    });

    $('#firstName').focus();
  }

  saveData(){
    const postData = { ... this.contactForm.value};
    var obj = postData as contact;

    this.contactService.AddContact(obj, "Update").subscribe( {
      next: response => {
        this.toastr.success("Contact has been updated successfully",'',{positionClass: 'toast-bottom-right'});
        this.contactForm.reset();
        this.HideEditForm.emit(false);
        
      },
      error: error => {
        Swal.fire('Error occured while updating the existing contact!');
      }
    });
  }

  onSubmit() {
    if(this.contactForm.invalid) {
      this.contactForm.setErrors({ ...this.contactForm.errors, 'submiterror': true });
      Swal.fire("Please fill all required details!", "", "error");
      return;
    }
    else {
      this.saveData();
    }
  }

  onCancel(){
    this.HideEditForm.emit(false);
  }


}
