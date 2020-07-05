import { Injectable } from '@angular/core';
//import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {

  private routeService = new BehaviorSubject<any>("/");
  rouiteList = this.routeService.asObservable();

  constructor() { }

  changeRoute(prev_route: any) {
    this.routeService.next(prev_route);
  }
}
