import { Component,Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../../../service/contact.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrl: './delete-contact.component.css'
})
export class DeleteContactComponent {
  @Input() getContact: any;

  @Output() public HideDeleteForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService
    ){

  }

  onDelete(id: any){
    this.contactService.DeleteContact(id).subscribe( {
      next: response => {
        this.toastr.success("Contact has been deleted successfully",'',{positionClass: 'toast-bottom-right'});
        this.HideDeleteForm.emit(false);
      },
      error: error => {
        Swal.fire('Error occured while deleting the existing contact!');
      }
    });
  }

  onCancel()
  {
    this.HideDeleteForm.emit(false);

  }

}
