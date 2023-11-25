import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  btnLoader: boolean = false;
  errMsg: string = "";

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private userService: UserService) { 
    // ,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit(): void {
  }

  get loginFormControl(){
    return this.loginForm.controls;
  }

  login(){
    this.btnLoader = true;
    this.authService.login(this.loginForm.value).subscribe(res => {
      const resData = res.data
      this.btnLoader = false;
      // console.log(resData);
      this.authService.setToken(resData._token);
      this.userService.setUserData({
        name: resData.name, 
        email: resData.email, 
        profilePic: resData.profilePic
      })
      
      this.router.navigate(['/quiz']);
    }, err => {
      this.btnLoader = false;
      this.errMsg = err.error.message;
      alert(this.errMsg);
    })
    this.loginForm.reset();
  }
}
