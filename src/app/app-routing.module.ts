import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
 /*  { path: 'login', loadChildren: () => import('.public/login/login.module').then(m => m.LoginModule)} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
