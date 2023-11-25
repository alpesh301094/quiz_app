import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any;
  private userkey = 'userData';

  constructor() { 
    this.userData = localStorage.getItem(this.userkey);
  }

  setUserData(data: any): void {
    localStorage.setItem(this.userkey, JSON.stringify(data));
    this.userData = data;
  }

  getUserData(): any {
    return JSON.parse(this.userData);
  }

  clearUserData(): void {
    this.userData = localStorage.removeItem(this.userkey);
    this.userData = null;
  }
}
