import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { contact } from '../../../interface/contact';
import { ContactService } from '../../../service/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrl: './addcontact.component.css'
})
export class AddcontactComponent {

  @Output() public HideAddForm: EventEmitter<boolean> = new EventEmitter<boolean>();


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

  ngOnInit(){
    $('#firstName').focus();
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

  saveData(){
    const postData = { ... this.contactForm.value};
    var obj = postData as contact;

    this.contactService.AddContact(obj, "Add").subscribe( {
      next: response => {
        this.toastr.success("Contact has been added successfully",'',{positionClass: 'toast-bottom-right'});
        this.contactForm.reset();
        this.HideAddForm.emit(false);
        
      },
      error: error => {
        Swal.fire('Error occured while adding the new contact!');
      }
    });
  }

  onSubmit(){
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
    this.HideAddForm.emit(false);
  }

}
