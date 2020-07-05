import { Component, OnInit, NgZone } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { SocialLoginService, Provider } from 'ngx-social-login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  user_data: any;
  login_modal: boolean = true;
  signin_modal: boolean = false;
  social_bool: boolean = false;
  previous_route: string;

  constructor(private ngZone: NgZone, private formBuilder: FormBuilder, private loginService: LoginService,  private router: Router, private prs: PreviousRouteService, private _service: SocialLoginService, private toastr: ToastrService) {
    this.prs.rouiteList.subscribe(prev => {
      this.previous_route = prev;
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [ Validators.required,Validators.minLength(7),Validators.pattern('^[a-zA-Z0-9@]+$')] ],
      password: ['', [ Validators.required,Validators.minLength(7),Validators.pattern('^[a-zA-Z0-9@^-\s]+$')] ],
    });
    this.registerForm = this.formBuilder.group({
      userName: ['', [ Validators.required,Validators.minLength(7),Validators.pattern('^[a-zA-Z0-9@]+$')] ],
      password: ['', [ Validators.required,Validators.minLength(7),Validators.pattern('^[a-zA-Z0-9@^-\s]+$')] ],
    });
  }

  onSignIn() {
    this.login_modal = false;
    this.signin_modal = true;
  }

  onLogin() {

    //LOGIN
    if(!this.social_bool) {
      this.user_data = this.loginForm.value;
    }
    this.loginService.userLogin(this.user_data).subscribe((res) => {
      console.log(res);
      //STORE TOKEN IN LOCAL STORAGE
      localStorage.setItem('USER_CRED', res);
      this.toastr.success('Logged In Successfully!', 'Success');
      this.goBack();
    },
    (err) => {
      console.log("Some Error Occurred");
      this.toastr.error('Invalid Credentials!', 'Error');
      this.goBack();
    }
    );
  }

  onRegister() {
    //REGISTER
    if(!this.social_bool) {
      this.user_data = this.loginForm.value;
    }
    this.loginService.userRegister(this.user_data).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('USER_CRED', res);
        this.toastr.success('Registered & Logged In Successfully!', 'Success');
        this.goBack();
      },
      (err) => {
        console.log("Some Error Occurred");
        this.toastr.warning('User Already Exists!', 'Warning');
        this.goBack();
      }
    );
  }

  loginWithGoogle(): void {
    this.social_bool = true;
    this._service.login(Provider.GOOGLE).subscribe(user => {
      console.log(user);
      this.user_data = {
        'userName': user.email,
        'password': user.id
      };
      if(this.signin_modal) {
        this.onRegister();
      }
      else {
        this.onLogin();
      }
    });
  }

  goBack() {
    this.login_modal = false;
    this.signin_modal = false;
    this.ngZone.run(() => this.router.navigate([this.previous_route]));
  }

}
