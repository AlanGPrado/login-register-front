import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private sharedService: SharedService) { }
  user$ = this.sharedService.currentUserData;

  open = false;

  items = ['Inicio', 'Agregar', 'Editar', ' Cuenta', 'Salir'];

  toggleOpen() {
    this.open = !this.open;
  }

  logout() {
    this.authService.logout();
  }
}
