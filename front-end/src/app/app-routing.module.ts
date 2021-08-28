import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth-layout.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { CoreLayoutComponent } from './core/core-layout.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',

    children: [
      {
        path:'register',
        component: RegisterComponent
      },
      {
        path:'login',
        component: LoginComponent
      },
    ]
  },
  {
    path: 'main',
    component: CoreLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/core/core.module').then(m => m.CoreModule)
      }
    ]
  },

  { path: '**', redirectTo: '/main', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
