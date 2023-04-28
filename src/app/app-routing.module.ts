import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  {path: '', component: PublicComponent}
 /*  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
   */
 /*  { path: 'login', loadChildren: () => import('.public/login/login.module').then(m => m.LoginModule)} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
