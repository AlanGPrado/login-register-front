import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

interface Edit {
  id_user: number,
  fullname: string,
  mobilenumber: string,
  email: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user$ = this.sharedService.currentUserData;
  backendUrl = 'http://localhost:3000/';
  fullname: string = '';
  mobilenumber: string = '';
  email: string = '';
  password: string = '';
  userData: Edit = {
    id_user: 0,
    fullname: '',
    mobilenumber: '',
    email: ''
  };
  constructor(private http: HttpClient, private sharedService: SharedService, private authService: AuthService) { }

  ngOnInit() {
    this.http.get(`${this.backendUrl}planEntrega/`)
      .subscribe(
        (res: any) => {
          if (res.success) {
            console.log(res.data);
          } else {
            console.log('Error ocurred')
          }
        },
        (error: any) => {
          console.error('HTTP request error:', error);
        }
      );

    this.http.get(`${this.backendUrl}puntoEntrega/`)
      .subscribe(
        (res: any) => {
          if (res.success) {
            console.log(res.data);
          } else {
            console.log('Error ocurred');
          }
        },
        (error: any) => {
          console.error('HTTP request error:', error);
        }
      );

    this.sharedService.currentUserData.subscribe(data => {
      this.userData = data;
    })
  }

  logout() {
    this.authService.logout();
  }
}
