import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  btnLoader: boolean = false;
  errMsg: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]],
    });
  }

  get registerFormControl(){
    return this.registerForm.controls;
  }

  register(){
    this.btnLoader = true;
    this.authService.register(this.registerForm.value).subscribe(res => {
      this.btnLoader = false;
      this.router.navigate(['/login']);
    }, err => {
      this.btnLoader = false;
      console.log(err);
      this.errMsg = err.error.message;
      alert(this.errMsg);
    })
    this.registerForm.reset();
  }
}
