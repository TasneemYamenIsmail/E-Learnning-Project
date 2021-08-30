import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth-layout.component';
import { ActivateComponent } from './auth/components/activate/activate.component';
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
        loadChildren: '../app/auth/auth.module#AuthModule'    // old way for lazy routing module
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
          import('../app/core/core.module').then(m => m.CoreModule)  // new way for lazy routing module
      }
    ]
  },

  {
    path:'activate-user/:id',
    component: ActivateComponent
  },
  { path: '**', redirectTo: '/main', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
