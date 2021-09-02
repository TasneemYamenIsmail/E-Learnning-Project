import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivateComponent } from './components/activate/activate.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    ActivateComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    AuthLayoutComponent,
    ActivateComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthModule { }
