import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient :HttpClient) { }

  // post request to the server

  makePayment(stripeToken:any):Observable<any>{

    const URL = 'http://localhost:5000/checkout';
    return this.httpClient.post<any>(URL, {token:stripeToken});
  }

  openPaymentMethod(){
    const url ="http://localhost:4242/create-checkout-session";
    return this.httpClient.post<any>(url,{},);
  }
  
}
