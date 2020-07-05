import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsitesService {

  private websiteService = new BehaviorSubject<any>("");
  currentWebData = this.websiteService.asObservable();

  constructor() { }

  dynamicWebData(webdata: any) {
    this.websiteService.next(webdata);
  }
}
