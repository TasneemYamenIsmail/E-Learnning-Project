import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth-layout.component';
import { CoreLayoutComponent } from './core/core-layout.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/auth/auth.module').then(m => m.AuthModule)
      }
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
