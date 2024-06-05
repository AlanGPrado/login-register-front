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
  img: string = "https://png2.cleanpng.com/sh/cc3d85d09d2b7d5a431ef4b6917a93db/L0KzQYq3VsEzN5l9gZH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TgRzaZ94iNN7ZX7miX7zjBdqdl57fdV9b4Kwd8PokPhqa6QyedVsb4XxhH76lf1uaaNAReVBZz3zfri0ifNwdl5ritduLXTyh7BzjBFlNWQ2UaoALUXnQIK6VcBlOpZnfac9LkO6QoqCWMUyOWY7SKUBMEKzRYKCUcUveJ9s/kisspng-computer-icons-transparency-login-vector-graphics-account-summary-svg-png-icon-free-download-31985-5d01350d2ebe54.3729985115603602051915.png";
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
