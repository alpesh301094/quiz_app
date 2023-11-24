import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // authService.isAuthenticated()
  isAuthenticated: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
