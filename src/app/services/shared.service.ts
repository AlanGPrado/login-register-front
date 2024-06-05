import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userDataSubject = new BehaviorSubject<any>(this.getUserDataFromLocalStorage());
  currentUserData = this.userDataSubject.asObservable();

  setUserData(data: any) {
    this.userDataSubject.next(data);
    this.setUserDataToLocalStorage(data);
  }

  private getUserDataFromLocalStorage() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  private setUserDataToLocalStorage(data: any) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  constructor() { }
}
