import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';

interface Edit {
  id_user: number,
  fullname: string,
  mobilenumber: string,
  email: string,
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
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
  isAnyFieldFilled: boolean = false;

  constructor(private http: HttpClient, private sharedService: SharedService, private authService: AuthService) { }

  editUser() {
    this.sharedService.currentUserData.subscribe(data => {
      this.userData = data;
    });

    const userData = {
      id_user: this.userData.id_user,
      fullname: this.fullname,
      mobilenumber: this.mobilenumber,
      email: this.email,
      password: this.password,
    };

    let updateFields = [{
      ...userData
    }].filter(Boolean);

    console.log(userData, "response data.");

    this.http.put(`${this.backendUrl}edit`, updateFields[0])
      .subscribe(
        (res: any) => {
          if (res.success) {
            console.log(res.data);
            window.location.reload();
            this.sharedService.setUserData(updateFields[0]);
          } else {
            console.log('Error ocurred');
          }
        },
        (error: any) => {
          console.error('HTTP request error:', error);
        }
      );
  }

  deleteUser() {
    this.http.delete(`${this.backendUrl}delete/${this.userData.id_user}`)
      .subscribe(
        (res: any) => {
          if (res.success) {
            console.log(res.data);
            this.logout();
          } else {
            console.log('Error ocurred');
          }
        },
        (error: any) => {
          console.error('HTTP request error:', error);
        }
      );
  }

  logout() {
    this.authService.logout();
  }

  checkIfAnyFieldFilled(): void {
    this.isAnyFieldFilled = !!this.fullname || !!this.mobilenumber || !!this.email || !!this.password;
  }
}
