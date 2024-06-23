import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AgregarProductoComponent } from './pages/productos/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './pages/productos/editar-producto/editar-producto.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'add-product', component: AgregarProductoComponent, canActivate: [AuthGuard]},
  { path: 'edit-product', component: EditarProductoComponent, canActivate: [AuthGuard]},
  { path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
