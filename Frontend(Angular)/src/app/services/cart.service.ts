import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  /*private cartService = new BehaviorSubject<any>([]);
  currentCartObj = this.cartService.asObservable();

  constructor() { }

  changeCartData(cart_obj: any) {
    this.cartService.next(cart_obj);
  }*/
  user_cred = localStorage.getItem('USER_CRED');
  baseUrl:string = 'http://localhost:3000/cart';
  constructor(private http: HttpClient) { }

  postCart(new_cart):Observable<any> {
    this.getCreds();
    console.log(new_cart);
    return this.http.put<any>(`${this.baseUrl}`+"/"+`${this.user_cred}`,new_cart,httpOptions);
  }
  getCart():Observable<any> {
    this.getCreds();
    return this.http.get<any>(`${this.baseUrl}`+"/"+`${this.user_cred}`);
  }

  getCreds() {
    this.user_cred = localStorage.getItem('USER_CRED');
  }

}
