import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { Produto } from '../model/produto';

const routes: Routes = [
  { path: '', loadChildren: () => import('./public.module').then(m => m.PublicModule) },
  { path: '/login', component: LoginComponent },
  { path: '/cadastro', component: CadastroComponent },
  { path: '/cardapio', component: CardapioComponent, children: [
    { path: '/sanduiche', component: Produto }
  ] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
