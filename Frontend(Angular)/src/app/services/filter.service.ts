import { Filter } from './../Model/filterModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  baseUrl:string = 'http://localhost:3000/queries';
  constructor(private http: HttpClient) { }


  getFilterData(filterData: Filter) {
    return this.http.post<string>(`${this.baseUrl}`+"/filters", filterData);
  }

}
