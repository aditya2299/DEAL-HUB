import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewTransferService {

  private viewService = new BehaviorSubject<any>(1);
  currentView = this.viewService.asObservable();

  constructor() { }

  changeView(vid: any) {
    this.viewService.next(vid);
  }

}
