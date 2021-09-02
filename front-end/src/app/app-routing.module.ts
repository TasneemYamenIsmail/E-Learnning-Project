import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth';

import { ActivateComponent } from './auth/components/activate/activate.component';
import { CoreLayoutComponent } from './core';



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
          import('./auth').then(m => m.AuthModule)  // new way for lazy routing module
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
          import('./core').then(m => m.CoreModule)  // new way for lazy routing module
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
