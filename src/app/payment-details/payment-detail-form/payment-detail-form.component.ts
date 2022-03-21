import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  //Dependency Injection...we have to inject the service will be using in this component inside the constructor..
  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //on initialization i.e onstart of this component we are not doing anything..yet..
  }


  onSubmit(form: NgForm) 
  {
    if (this.service.formData.paymentDetailId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }
  
  
  insertRecord(form: NgForm) 
  {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Record Submitted successfully', 'Record Saved');
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
  updateRecord(form: NgForm) 
  {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Record Updated successfully', 'Update Record');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
  
  //this resets the form  when the method is invoked...
  resetForm(form: NgForm) 
  {
	  //resets the form to empty form
    form.form.reset();
    //enable it to take another new set of records by invoking a new instance of the model..
    this.service.formData = new PaymentDetail();
  }

}
