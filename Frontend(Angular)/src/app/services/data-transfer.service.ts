import { Query } from './../Model/queryModel';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private descriptionService = new BehaviorSubject<any>("");
  currentDescription = this.descriptionService.asObservable();

  constructor() { }

  changeDescription(description: any) {
    this.descriptionService.next(description);
  }
}
