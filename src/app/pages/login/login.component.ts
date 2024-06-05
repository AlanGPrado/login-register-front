import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';


interface Post {
  id: number,
  title: string,
  body: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  img: string = "https://png2.cleanpng.com/sh/cc3d85d09d2b7d5a431ef4b6917a93db/L0KzQYq3VsEzN5l9gZH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TgRzaZ94iNN7ZX7miX7zjBdqdl57fdV9b4Kwd8PokPhqa6QyedVsb4XxhH76lf1uaaNAReVBZz3zfri0ifNwdl5ritduLXTyh7BzjBFlNWQ2UaoALUXnQIK6VcBlOpZnfac9LkO6QoqCWMUyOWY7SKUBMEKzRYKCUcUveJ9s/kisspng-computer-icons-transparency-login-vector-graphics-account-summary-svg-png-icon-free-download-31985-5d01350d2ebe54.3729985115603602051915.png"
  backendUrl = 'http://localhost:3000';
  posts: Post[] = [];
  email = '';
  password = '';
  errorMsg = '';

  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.http.get<Post[]>(this.backendUrl)
      .subscribe(post => console.log(post))
  }

  submit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post(`${this.backendUrl}/login`, loginData)
      .subscribe(
        (response: any) => {
          if (response.success) {
            localStorage.setItem('token', response.token);
            this.sharedService.setUserData(response.userData);
            console.log("User is:", response.userData);

            this.router.navigate(['/home']);
          } else {
            alert('Login failed:' + response.message);
          }
        },
        error => {
          alert('An error ocurred: ' + error.message)
        }
      );
  }
}
