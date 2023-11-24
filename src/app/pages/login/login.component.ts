import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  btnLoader: boolean = false;
  errMsg: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
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
      this.btnLoader = false;
      // console.log(res._token);
      this.authService.setToken(res._token);
      this.router.navigate(['/quiz']);
    }, err => {
      this.btnLoader = false;
      this.errMsg = err.error.message;
      alert(this.errMsg);
    })
    this.loginForm.reset();
  }
}
