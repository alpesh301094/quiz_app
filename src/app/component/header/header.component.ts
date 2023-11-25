import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // authService.isAuthenticated()
  isAuthenticated: boolean = false;
  userData: any;

  constructor(private router: Router, public authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    // this.isAuthenticated = this.authService.isAuthenticated();
    this.userData = this.userService.getUserData();
  }

  logout(){
    this.authService.logout();
    this.userService.clearUserData();
    this.router.navigate(['/login']);
  }
}
