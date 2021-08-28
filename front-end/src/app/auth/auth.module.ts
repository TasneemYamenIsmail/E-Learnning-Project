import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports:[
    AuthLayoutComponent
  ]
})
export class AuthModule { }
