import { FilterService } from './../../services/filter.service';
import { Filter } from './../../Model/filterModel';
import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { WebsitesService } from 'src/app/services/websites.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  _currentValues: any;

  constructor(private filterService: FilterService, private dts:DataTransferService, private ws:WebsitesService) { }

  ngOnInit(): void {
  }

  radio_options: number;
  someRange: any;
  minValue: number = 0;
  maxValue: number = 100000;
  options: Options = {
    floor: 0,
    ceil: 100000,
    step: 1000,
    translate: (value: number, label: LabelType): string => {
      if (sessionStorage.getItem('SESSION_DATA_ARRAY') === null) {
        // NO DATA FOUND
      }
      else {
        var stored_data = JSON.parse(sessionStorage.getItem("SESSION_DATA_ARRAY"));
        var data = JSON.stringify(stored_data.merge);
      }

      switch (label) {
        case LabelType.Low:
          var filter_proto: Filter = {
            data: data,
            filter_id: 1,
            filter_options: {
              label: label,
              val: value
            }
          };

          if (this.options.floor != this.minValue) {
            //console.log(filter_proto);
            this.filterService.getFilterData(filter_proto).subscribe(new_data => {
              this.newDescription(new_data);
            });
          }

          return '<b style="font-size:10px;">Min price:</b> ₹' + value;
        case LabelType.High:
          var filter_proto: Filter = {
            data: data,
            filter_id: 1,
            filter_options: {
              label: label,
              val: value
            }
          };
          if (this.options.ceil != this.maxValue) {
            //console.log(filter_proto);
            this.filterService.getFilterData(filter_proto).subscribe(new_data => {
              this.newDescription(new_data);
            });
          }
          return '<b style="font-size:10px;">Max price:</b> ₹' + value;
        default:
          return '₹' + value;
      }
    }
  };



  newDescription(newdesc:string) {
    console.log("Sending to the service from parent component");

    var descArray = JSON.parse(newdesc);
    console.log(descArray.length);
    var dataArray;
    var mergedArray = [];

    var onlineArray = [];
    var retailArray = [];


    //FILTERING ONLINE AND RETAIL PRODUCTS
    descArray.forEach(data_obj => {
      //data_obj["cart"] = false;
      if (data_obj.store_type == "retail") {
        retailArray.push(data_obj);
      }
      else{
        onlineArray.push(data_obj);
      }
      mergedArray.push(data_obj);
    });


    dataArray =
      {
        online: onlineArray,
        retail: retailArray,
        merge: mergedArray,
      };

    var webData = {
      amazon: [],
      flipkart: [],
      paytm: [],
      sangeethaMobiles: []
    };

    for(var i=0;i<mergedArray.length;i++) {
      var website = mergedArray[i].website;
      switch (website) {
        case 'amazon' :
          webData.amazon.push(mergedArray[i]);
          break;
        case 'flipkart' :
          webData.flipkart.push(mergedArray[i]);
          break;
        case 'paytm' :
          webData.paytm.push(mergedArray[i]);
          break;
        case 'sangeetha_mobiles' :
          webData.sangeethaMobiles.push(mergedArray[i]);
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


  getOriginal(filter_case: number) {

    switch(filter_case) {

      case 1:
        this.minValue = 0;
        this.maxValue = 100000;
        if (sessionStorage.getItem('SESSION_DATA_ARRAY') === null) {
          // NO DATA FOUND
        }
        else {
          var stored_data = JSON.parse(sessionStorage.getItem("SESSION_DATA_ARRAY"));
          this.dts.changeDescription(stored_data);
        }
        break;

      case 2:
        this.radio_options = null;
        if (sessionStorage.getItem('SESSION_DATA_ARRAY') === null) {
          // NO DATA FOUND
        }
        else {
          var stored_data = JSON.parse(sessionStorage.getItem("SESSION_DATA_ARRAY"));
          this.dts.changeDescription(stored_data);
        }
        break;

      default:
        break;
    }
  }


  onRadioChange() {
    console.log(this.radio_options);
    if (sessionStorage.getItem('SESSION_DATA_ARRAY') === null) {
      // NO DATA FOUND
    }
    else {
      var stored_data = JSON.parse(sessionStorage.getItem("SESSION_DATA_ARRAY"));
      var data = JSON.stringify(stored_data.merge);
    }

    var filter_proto: Filter = {
      data: data,
      filter_id: 2,
      filter_options: {
        val: this.radio_options
      }
    };

    this.filterService.getFilterData(filter_proto).subscribe(new_data => {
      this.newDescription(new_data);
    });
  }


}
