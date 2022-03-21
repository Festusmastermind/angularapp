import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  //selectedRecord: any;
  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshList();
   
  }
  onDelete(id: number) 
  {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deletePaymentDetail(id)
        .subscribe(res => {
          this.toastr.error('Record Deleted successfully', 'Delete Record');
          this.service.refreshList();
        },
        err => { console.log(err); })
    }
  }
  getRecords(){
    return console.log(this.service.list);
  }
  
  //this fill bind the data to the form template..
  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  

}
