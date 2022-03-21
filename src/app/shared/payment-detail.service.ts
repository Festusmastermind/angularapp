import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PaymentDetail } from './payment-detail.model';



@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {


  //declaring variables to be used..
  private readonly baseURL = 'http://localhost:44093/api/PaymentDetail';
  formData: PaymentDetail = new PaymentDetail(); //creating an instance of the PaymentDetailTb Model...for data insertion..
  //list : PaymentDetail[]; //initialize to list variable to empty array..

  //list: PaymentDetail[] = [];  //this is working fine with the second refreshList method below..


  list: any = [];
  constructor(private http: HttpClient) { } //inject HttpClient to make http request to the server(external domain anywhere in the world)


 //functions that carries out specific operations to be reusable throughout the application 
  postPaymentDetail() 
  {
    return this.http.post(this.baseURL, this.formData);
  }
  putPaymentDetail() 
  {
    return this.http.put(`${this.baseURL}/${this.formData.paymentDetailId}`, this.formData);
  }
  deletePaymentDetail(id: number) 
  {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() 
  {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as PaymentDetail[]);
  }

//   refreshList()
//   {
// 	  this.http.get("http://localhost:44093/api/PaymentDetail").subscribe(data => {
// 		  this.list = data;
// 	  });
//   }


}



