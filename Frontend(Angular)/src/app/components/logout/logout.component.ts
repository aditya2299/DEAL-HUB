import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreviousRouteService } from 'src/app/services/previous-route.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  basic: boolean = true;
  previous_route: string;

  constructor(private router: Router, private prs: PreviousRouteService, private toastr: ToastrService) {
    this.prs.rouiteList.subscribe(prev => {
      this.previous_route = prev;
    });
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.toastr.success('Logged Out Successfully','Success');
    localStorage.removeItem('USER_CRED');
    this.goBack();
  }

  goBack() {
    this.basic = false;
    this.router.navigate([this.previous_route]);
  }

}
