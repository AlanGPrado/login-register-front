import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { JwtModule } from "@auth0/angular-jwt";
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BurguerComponent } from './components/burguer/burguer.component';
import { MenuComponent } from './components/menu/menu.component';
import { AgregarProductoComponent } from './pages/productos/agregar-producto/agregar-producto.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { EditarProductoComponent } from './pages/productos/editar-producto/editar-producto.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogWindowComponent } from './components/dialog-window/dialog-window.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    BurguerComponent,
    MenuComponent,
    AgregarProductoComponent,
    EditUserComponent,
    EditarProductoComponent,
    DialogWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MdbCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatSnackBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
