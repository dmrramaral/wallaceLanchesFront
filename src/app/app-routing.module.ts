import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './public/cadastro/cadastro.component';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { CardapioComponent } from './public/cardapio/cardapio.component';

const routes: Routes = [
  {path: '', component: PublicComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'cardapio', component: CardapioComponent},
  {path: 'admin', loadChildren: () => import('./administrador/administrador-routing/administrador-routing-routing.module').then(m => m.AdministradorRoutingRoutingModule)},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
