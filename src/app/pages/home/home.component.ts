import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user$ = this.sharedService.currentUserData;

  constructor(private sharedService: SharedService, private authService: AuthService) {}

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
