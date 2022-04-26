import { CheckoutService } from './services/checkout.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'pricing-template';
  hideExtraFeatures=false;
  paymentHandler: any = null;


  // showAll(){
  //   this.hideExtraFeatures=!this.hideExtraFeatures;
  // }

  constructor(private checkoutService: CheckoutService){

  }

  ngOnInit(): void {
      this.invokeStripe();
  }

  



  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KrpQfLt8njPV0BfX283oqrBm4H2i7fuLZu9jCp6vE0w2FrQQrLjzeedeYC1HyCBJfVL0bxc4DhR5Gdauf9ngoba00YmxAg7Tn',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      },
    });

    const paymentstripe = (stripeToken: any) => {
      this.checkoutService.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);

      });
    };

    paymentHandler.open({
      name: 'Orange Traders',
      description: 'This is the Test!',
      amount: amount * 100,
    });
  }

  invokeStripe(){
    // if there's no element such as stripe-script
    if(!window.document.getElementById('stripe-script')){
      // create an script element
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      // set the src of script element to 
      script.src = "https://checkout.stripe.com/checkout.js"
      script.onload=()=>{
        this.paymentHandler= (<any> window).StripeCheckout.configure({
          key: "pk_test_51KrpQfLt8njPV0BfX283oqrBm4H2i7fuLZu9jCp6vE0w2FrQQrLjzeedeYC1HyCBJfVL0bxc4DhR5Gdauf9ngoba00YmxAg7Tn",
          locale : 'auto',
          token : function (stripeToken :any){
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);

    }
  }

}
