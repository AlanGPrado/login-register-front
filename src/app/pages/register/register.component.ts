import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fullName: string = '';
  mobileNumber: string = '';
  email: string = '';
  password: string = '';
  img2: string = "https://icons.veryicon.com/png/o/miscellaneous/o2o-middle-school-project/plus-104.png";
  private backendUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const registrationData = {
      fullName: this.fullName,
      mobileNumber: this.mobileNumber,
      email: this.email,
      password: this.password
    };

    this.http.post(`${this.backendUrl}/register`, registrationData).subscribe(
      response => {
        console.log('Registration succesful!', response);
        this.router.navigate(['/']);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}
