import { Component, OnInit } from '@angular/core';
import { DataTransferService } from './../../services/data-transfer.service';
import { ViewTransferService } from 'src/app/services/view-transfer.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-retail-component',
  templateUrl: './retail-component.component.html',
  styleUrls: ['./retail-component.component.css']
})
export class RetailComponentComponent implements OnInit {

  mobile_view: boolean;
  description: string;
  show: boolean;
  view_status: boolean;
  dataArray = {
    online: [],
    retail: []
  };
  retailArray = [];
  websiteArray = {
    sangeetha_mobiles: {
      url :"https://www.sangeethamobiles.com/",
      src :"https://www.aexp-static.com/ecpglobal/ecatalogue/en-in/rewards/membership-rewards/getcatalogimage.mtw?productid=13140481&catalogid=142081&languageid=en_in&imagetype=primary&imagever=618141&hash=8b864d7e46ddf85d4ade5308c39ae140",
    },
    croma: {
      url :"https://www.croma.com/",
      src :"http://www.iamwire.com/wp-content/uploads/2012/04/Croma.jpg"
    }
  };
  constructor(private dts:DataTransferService, private vts:ViewTransferService, private breakpointObserver: BreakpointObserver, private loginService: LoginService, private cartService: CartService) { }

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
        this.retailArray = this.dataArray.retail;
        if(this.retailArray.length) {
          this.show = true;
          //Display the online results
          console.log("Retail Products: ",this.retailArray.length);
        }
        else{
          this.show = false;
          console.log("Sorry no results to display from RETAIL component");
        }
      }
    });

    this.vts.currentView.subscribe(vid => {
      if (vid == 1) {
        this.view_status = true;
      }
      else {
        this.view_status = false;
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
