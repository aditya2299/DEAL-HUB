import { WebsitesService } from './../../../services/websites.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-paytm',
  templateUrl: './paytm.component.html',
  styleUrls: ['./paytm.component.css']
})
export class PaytmComponent implements OnInit {

  constructor(private ws: WebsitesService, private breakpointObserver: BreakpointObserver, private loginService: LoginService, private cartService: CartService) { }

  mobile_view: boolean;
  show: boolean;
  public paytmArray = [];

  ngOnInit(): void {

     // DEVICES LESS THAN 500PX WIDTH
     this.breakpointObserver
     .observe(['(min-width: 500px)'])
     .subscribe((state: BreakpointState) => {
       if (state.matches) {
         this.mobile_view = true;
       } else {
         this.mobile_view = false;
       }
       console.log(this.mobile_view);
     });

    this.ws.currentWebData.subscribe(webData => {
      if (webData) {
        if (webData.paytm.length > 0){
          this.paytmArray= webData.paytm;
          this.show = true;
          console.log(this.paytmArray.length);
        }
        else {
          this.show = false;
        }
      }
    });
  }

  changeCartStatus(product) {
    product.cart = !product.cart;
    if(product.cart) {
      if (this.loginService.isAlreadyLogin()) {
        //CART SERVICE CALL
        this.cartService.getCart().subscribe((content) => {
          var cart_list = content;
          cart_list.push(product);
          var nc = {
            "new_cart": JSON.stringify(cart_list)
          };
          this.cartService.postCart(nc).subscribe((res) => {
            console.log(res);
          });
        });
      }
      else {
        if (localStorage.getItem('CART') === null){
          var temp = [];
          temp.push(product);
        }
        else {
          temp = JSON.parse(localStorage.getItem('CART'));
          temp.push(product);
        }

        localStorage.removeItem('CART');
        localStorage.setItem('CART', JSON.stringify(temp));
      }
    }
  }

}
