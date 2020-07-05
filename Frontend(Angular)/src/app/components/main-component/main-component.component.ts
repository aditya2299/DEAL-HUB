import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { ViewTransferService } from './../../services/view-transfer.service';
import { in_out } from './../routing-animations/nav-animations';
import { fader } from './../routing-animations/route-animations';
import { FetcherService } from './../../services/fetcher.service';
import { Query } from '../../Model/queryModel';
import { Sort } from './../../Model/sortModel';
import { DataTransferService } from './../../services/data-transfer.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { WebsitesService } from 'src/app/services/websites.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css'],
  animations: [
    fader, //FADING ANIMATION
    in_out, //IN_OUT ANIMATION
  ]
})
export class MainComponentComponent implements OnInit {

  changed_route = "/";
  current_route: string;
  previous_route: string;
  user_input: string;
  user_query: string;
  description: string;
  online_badge: number;
  retail_badge: number;
  merged_badge: number;
  opened = false;
  toggle_component = true;
  mergedArray = [];
  public showContainer: boolean;
  public mobile_view: boolean;
  public login_bool: boolean;

  constructor(private fetcherService: FetcherService, private dts:DataTransferService, private ws:WebsitesService, private vts:ViewTransferService, private router: Router, private prs: PreviousRouteService, private breakpointObserver: BreakpointObserver, private spinner: NgxSpinnerService, private loginService: LoginService) {
  }

  ngOnInit(): void {

    this.login_bool = this.loginService.isAlreadyLogin();

    // DEVICES LESS THAN 1000PX WIDTH
    this.breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showContainer = true;
        } else {
          this.showContainer = false;
        }
        console.log(this.showContainer);
      });


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


    // Retrieve data on reload
    if (sessionStorage.getItem("SESSION_DATA_ARRAY") === null) {
      var newdesc = '{"online":[],"retail":[],"merge":[]}';
    }
    else {
      var newdesc = sessionStorage.getItem("SESSION_DATA_ARRAY");
    }
    this.newDescription(newdesc, false);


    // Retrieve merge status on reload
    var mergedbool;
    if (sessionStorage.getItem('MERGED_STATUS') === null) {
      mergedbool = false;
    }
    else {
      mergedbool = JSON.parse(sessionStorage.getItem('MERGED_STATUS'));
    }
    this.setMergeStatus(mergedbool);


    // Retrieve view status on reload
    var vid;
    if (sessionStorage.getItem('VIEW') === null){
      vid = 1;
    }
    else {
      vid = JSON.parse(sessionStorage.getItem('VIEW'));
    }
    this.vts.changeView(vid);

  }




  mergedbool :boolean;

  setMergeStatus(mergedbool: boolean) {
    this.mergedbool = mergedbool;
    console.log(this.mergedbool);
  }

  merged() {
    this.mergedbool = !this.mergedbool;
    sessionStorage.removeItem('MERGED_STATUS');
    sessionStorage.setItem('MERGED_STATUS', JSON.stringify(this.mergedbool));
    if (this.mergedbool) {
      this.router.navigate(['/main/mergedresults']);
    }
    else {
      this.router.navigate(['/main/onlinestores']);
    }
  }


  //ROUTING ANIMATION
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  search(event: any){
    //SEARCHED EVENT TRIGGERED ON ENTER KEY-PRESS
    if (event.keyCode == 13 || event.type == "click"){
      this.spinner.show('search');
      this.user_query = this.user_input;

      //DUMMY-DATA
      const query: Query = {
        title: this.user_query,
        description: ""
      };

      //POST-REQUEST
      this.fetcherService.addQuery(query).subscribe(query_res => {
        this.spinner.hide('search');
        console.log(query_res);
        this.newDescription(query_res.description, true);
      });
    }
  }


  newDescription(newdesc:string, method:boolean) {
    console.log("Sending to the service from parent component");

    var descArray = JSON.parse(newdesc);
    console.log(descArray);
    var dataArray;
    this.mergedArray = [];

    //CHECK WEATHER THE DATA CAME FROM SESSION-STORAGE OR GET-REQUEST
    if (method) {
      var onlineArray = [];
      var retailArray = [];


      //FILTERING ONLINE AND RETAIL PRODUCTS
      descArray.forEach(data_obj => {
        data_obj["cart"] = false;
        if (data_obj.store_type == "retail") {
          retailArray.push(data_obj);
        }
        else{
          onlineArray.push(data_obj);
        }
        this.mergedArray.push(data_obj);
      });

      dataArray =
      {
        online: onlineArray,
        retail: retailArray,
        merge: this.mergedArray,
      };


      sessionStorage.removeItem('SESSION_DATA_ARRAY');
      sessionStorage.setItem('SESSION_DATA_ARRAY', JSON.stringify(dataArray));
    }
    else {
      dataArray = descArray;
      this.mergedArray = dataArray.merge;
    }


    this.online_badge = dataArray.online.length;
    this.retail_badge = dataArray.retail.length;
    this.merged_badge = this.online_badge + this.retail_badge;

    var webData = {
      amazon: [],
      flipkart: [],
      paytm: [],
      sangeethaMobiles: [],
      croma: []
    };

    for(var i=0;i<this.mergedArray.length;i++) {
      var website = this.mergedArray[i].website;
      switch (website) {
        case 'amazon' :
          webData.amazon.push(this.mergedArray[i]);
          break;
        case 'flipkart' :
          webData.flipkart.push(this.mergedArray[i]);
          break;
        case 'paytm' :
          webData.paytm.push(this.mergedArray[i]);
          break;
        case 'sangeetha_mobiles' :
          webData.sangeethaMobiles.push(this.mergedArray[i]);
          break;
        case 'croma' :
          webData.croma.push(this.mergedArray[i]);
          break;
        default:
          break;
      }
    }

    //SENDING DATA-ARRAY TO DATA-TRANSFER-SERVICE
    this.dts.changeDescription(dataArray);

    //SENDING WEBDATA TO WEBSITE-SERVICE
    this.ws.dynamicWebData(webData);

  }

  changeView(vid:number) {
    sessionStorage.removeItem('VIEW');
    sessionStorage.setItem('VIEW',JSON.stringify(vid));
    this.vts.changeView(vid);
  }

  changeSort(sort_id:number) {
    if (sessionStorage.getItem("SESSION_DATA_ARRAY") === null) {
      // Do Nothing
      console.log('NO DATA FOUND');
    }
    else {
      var stored_data = JSON.parse(sessionStorage.getItem("SESSION_DATA_ARRAY"));
      var data = JSON.stringify(stored_data.merge);
      const sort_proto: Sort = {
        data : data,
        sort_id: sort_id
      };
      this.fetcherService.postSort(sort_proto).subscribe(new_data => {
        this.newDescription(new_data, true);
      });
    }
  }

  goToCart() {
    this.router.navigate(['/main/cart']);
  }

  get cart_display() : boolean {
    if (this.router.url == '/main/cart') {
      return false;
    }
    return true;
  }
}
