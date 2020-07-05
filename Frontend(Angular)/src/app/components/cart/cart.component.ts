import { element } from 'protractor';
import { Router, NavigationEnd } from "@angular/router";
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { LoginService } from 'src/app/services/login.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private dts:DataTransferService, private router: Router, private prs: PreviousRouteService, private breakpointObserver: BreakpointObserver, private loginService: LoginService, private spinner: NgxSpinnerService) {
    this.prs.rouiteList.subscribe(prev => {
      this.previous_route = prev;
      //console.log(this.previous_route);
    });
  }

  mobile_view: boolean;
  previous_route: string;
  cart: any = [];
  cartbool: boolean = false;
  dataArray = {
    online: [],
    retail: [],
    merge: []
  };
  mergedArray = [];
  websiteArray = {
    amazon: {
      url :"https://www.amazon.in/",
      src :"https://i.insider.com/539f3ffbecad044276726c01?width=1100&format=jpeg&auto=webp",
    },
    flipkart: {
      url :"https://www.flipkart.com/",
      src :"data:image/png;base64,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",
    },
    paytm: {
      url :"https://paytmmall.com/",
      src :"https://img.etimg.com/thumb/width-640,height-480,imgsize-19837,resizemode-1,msid-60726247/.jpg",
    },
    sangeetha_mobiles: {
      url :"https://www.sangeethamobiles.com/",
      src :"https://www.aexp-static.com/ecpglobal/ecatalogue/en-in/rewards/membership-rewards/getcatalogimage.mtw?productid=13140481&catalogid=142081&languageid=en_in&imagetype=primary&imagever=618141&hash=8b864d7e46ddf85d4ade5308c39ae140",
    },
  };

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

    this.dts.currentDescription.subscribe(dataArray => {
      if (dataArray) {
        this.dataArray = dataArray;
        this.mergedArray = this.dataArray.merge;
      }
    });

    this.onLoad();

  }

  onLoad() {
    if (this.loginService.isAlreadyLogin()){
      this.spinner.show('cart');
      this.cartService.getCart().subscribe((content) => {
        this.cart = content;
        this.cartStatus();
        this.spinner.hide('cart');
      });
    }
    else {
      if(!(localStorage.getItem('CART') === null)) {
        this.cart = JSON.parse(localStorage.getItem('CART'));
      }
      this.cartStatus();
    }
  }


  cartStatus() {
    if (this.cart.length == 0) {
      this.cartbool = false;
    }
    else {
      this.cartbool = true;
      this.cart.forEach(element => {
        if (!element.hasOwnProperty('cart_count')) {
          element.cart_count = 1;
        }
      });
    }
  }


  remove(product) {
    this.mergedArray.forEach(element => {
      if (product.title == element.title && product.id == element.id) {
        element.cart = false;
        delete element.cart_count;
      }
    });
    const index: number = this.cart.indexOf(product);
    this.cart.splice(index, 1);

    if(this.loginService.isAlreadyLogin()) {
      var nc = {
        "new_cart": JSON.stringify(this.cart)
      };
      this.cartService.postCart(nc).subscribe((res) => {
        this.cartStatus();
      });
    }
    else {
      localStorage.setItem('CART', JSON.stringify(this.cart));
      this.cartStatus();
    }
  }


  emptyCart() {
    this.mergedArray.forEach(product => {
      product.cart = false;
      delete product.cart_count;
    });
    this.cart.length = 0;

    if(this.loginService.isAlreadyLogin()) {
      var nc = {
        "new_cart": JSON.stringify([])
      };
      this.cartService.postCart(nc).subscribe((res) => {
        this.cartStatus();
      });
    }
    else {
      localStorage.setItem('CART', JSON.stringify(this.cart));
      this.cartStatus();
    }
  }


  changeProductCount(product: any, inc_dec: boolean) {
    if (inc_dec) {
      //Increment count of the product
      product.cart_count += 1;
    }
    else {
      //Decrement count of the product
      if (product.cart_count != 1) {
        product.cart_count -= 1;
      }
    }
    //localStorage.setItem('CART', JSON.stringify(this.cart));
    if(this.loginService.isAlreadyLogin()) {
      var nc = {
        "new_cart": JSON.stringify(this.cart)
      };
      this.cartService.postCart(nc).subscribe((res) => {
        //this.cartStatus();
      });
    }
    else {
      localStorage.setItem('CART', JSON.stringify(this.cart));
      //this.cartStatus();
    }
  }


  subPrice(product_price: number, product_cartCount: number) {
    return product_price*product_cartCount;
  }


  totalPrice() {
    var sum = 0;
    for(var j=0;j<this.cart.length;j++) {
      sum += this.cart[j].numeric_price*this.cart[j].cart_count;
    }
    return sum;
  }


  back() {
    this.router.navigate([this.previous_route]);
  }

}
